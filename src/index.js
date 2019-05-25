const { readFileSync } = require('fs')
const { resolve, dirname, separator } = require('path')

const fileName = 'store.js'
const vueAppPath = require.resolve('@nuxt/vue-app')
const vueAppDistSuffix = p('/dist/vue-app.js')
const vueAppStoreBase = vueAppPath.slice(0, vueAppPath.length - vueAppDistSuffix)
const createStoreRegex = /\/\/ createStore[\0-\uFFFF]*?}\n/

function p(path) {
  return path.replace(/\//g, separator)
}

function resolvePath(...args) {
  return resolve(__dirname, ...args.map(a => p(a)))
}

function prepareStoreTemplate() {
  const vueAppStore = readFileSync(p(`${vueAppStoreBase}/templates/store.js`))
  const createStore = readFileSync(resolvePath('templates/store.create.js'))
  const storeOps = readFileSync(resolvePath('templates/store.ops.js'))
  const storeTemplate = vueAppStore.replace(createStoreRegex, `\n${createStore}`)
  writeFileSync(resolvePath('templates/store.js'), `${storeTemplate}\n${storeOps}`)
}

module.exports = function () {
  const src = resolvePath('templates/store.js')
  if (!existsSync(src)) {
    prepareStoreTemplate()  
  }
  this.addTemplate({ src, fileName, options: this.options })
}
