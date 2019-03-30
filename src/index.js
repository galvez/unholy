const { resolve } = require('path')

function resolvePath(...args) {
  return resolve(__dirname, ...args)
}

function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function unholy() {
  this.addTemplate({
    src: resolvePath('store.js'),
    fileName: 'store.js',
    options: this.options
  })
}

module.exports = unholy
