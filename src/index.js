const { existsSync, readFileSync, writeFileSync } = require('fs')
const { resolve, sep } = require('path')

// Used for tampering with @nuxt/vue-app original store
const vueAppPath = require.resolve('@nuxt/vue-app')
const vueAppDistSuffixLen = p('/dist/vue-app.js').length
const vueAppStoreBase = vueAppPath.slice(0, vueAppPath.length - vueAppDistSuffixLen)
const createStoreRegex = /\/\/ createStore[\0-\uFFFF]+?\}\n/

// Cross-platform path
function p(path) {
  return path.replace(/\//g, sep)
}

// Read file to string
function rf(...args) {
  return readFileSync(...args).toString()
}

// Resolve cross-platform path
function rp(...args) {
  return resolve(__dirname, ...args.map(a => p(a)))
}

function prepareStoreTemplate() {
  const vueAppStore = rf(p(`${vueAppStoreBase}/template/store.js`))
  const createStore = rf(rp('templates/store.create.js'))
  const storeOps = rf(rp('templates/store.ops.js'))
  const storeTemplate = vueAppStore.replace(createStoreRegex, `\n${createStore}`)
  writeFileSync(rp('templates/store.js'), `${storeTemplate}\n${storeOps}`)
}

module.exports = function () {
  const src = rp('templates/store.js')
  if (!existsSync(src)) {
    prepareStoreTemplate()
  }
  const fileName = 'store.js'
  const options = this.options
  this.addTemplate({ src, fileName, options })
}
