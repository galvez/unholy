import Vue from 'vue'
import Vuex from 'vuex'

const commit = Vuex.Store.prototype.commit

Vuex.Store.prototype.commit = function(...args) {
  if (isObject(args[0])) {
    commit.call(this, 'merge', args[0], { root: true })
  } else {
    commit.call(this, ...args)
  }
}

export function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function merge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      merge(target[key], source[key])
    } else {
      Vue.set(target, key, val)
    }
  }
}

export default ({ store }) => {
  store.registerModule('unholy', {
    mutations: {
      merge(state, updatedState) {
        if (isObject(updatedState)) {
          merge(state, updatedState)
        }
      }
    }
  })
}
