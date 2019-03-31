import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const log = console // on server-side, consola will catch all console.log
const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']
let store = {}

void (function updateModules() {
  <% storeModules.some(s => {
    if(s.src.indexOf('index.') === 0) { %>
  store = normalizeRoot(require('@/<%= dir.store %>/<%= s.src %>'), '<%= dir.store %>/<%= s.src %>')
  <% return true }}) %>

  // If store is an exported method = classic mode (deprecated)
  <% if (isDev) { %>
  if (typeof store === 'function') {
    return log.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }<% } %>

  // Enforce store modules
  store.modules = store.modules || {}

  <% storeModules.forEach(s => {
    if(s.src.indexOf('index.') !== 0) { %>
  resolveStoreModules(require('@/<%= dir.store %>/<%= s.src %>'), '<%= s.src %>')<% }}) %>

  // If the environment supports hot reloading...
  <% if (isDev) { %>
  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([<% storeModules.forEach(s => { %>
      '@/<%= dir.store %>/<%= s.src %>',<% }) %>
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.<%= globals.nuxt %>.$store.hotUpdate(store)
    })
  }<% } %>
})()

const operations = {
  merge: function(state, payload) {
    mergeProps(state, payload)
  },
  push: function(state, payload) {
    pushArray(state, payload)
  },
  anull: function(state, payload) {
    anullProps(state, payload)
  },
  splice: function(state, payload) {
    spliceArrays(state, payload)
  },
  empty: function(state, payload) {
    emptyArrays(state, payload)
  }
}

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function resolveStoreModules(moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(<%= extensions %>)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `<%= dir.store %>/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const storeModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(storeModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeRoot(moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeState(moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    log.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule(moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    log.warn(`'state' should be a method that returns an object in ${filePath}`)
    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function getStoreModule(storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty(storeModule, moduleData, property) {
  if (!moduleData) return

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}

function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function mergeProps(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      mergeObject(target[key], source[key])
    } else {
      Vue.set(target, key, val)
    }
  }
}

function anullProps(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      mergeObject(target[key], source[key])
    } else if (Array.isArray(val)) {
      for (const vkey in val) {
        Vue.set(target, vkey, null)
      }
    } else {
      Vue.set(target, key, null)
    }
  }
}

function pushItems(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      mergeObject(target[key], source[key])
    } else if (Array.isArray(val) && Array.isArray(target[key])) {
      target[key].push(val)
    }
  }
}

function spliceArrays(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      spliceArrays(target[key], source[key])
    } else if (Array.isArray(val) && Array.isArray(target[key])) {
      target[key].splice(...val)
    }
  }
}

function emptyArrays(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      mergeObject(target[key], source[key])
    } else if (Array.isArray(val)) {
      for (const vkey in val) {
        target[vkey].splice(0, target[vkey].length)
      }
    }
  }
}
