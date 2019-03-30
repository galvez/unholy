const { resolve } = require('path')

function resolvePath(...args) {
  return resolve(__dirname, ...args)
}

module.exports = function() {
  this.addPlugin({
    src: resolvePath('plugin.js'),
    fileName: 'unholy/plugin.js'
  })
}
