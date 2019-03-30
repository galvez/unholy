import { resolve } from 'path'

function resolvePath(...args) {
  return resolve(__dirname, ...args)
}

export default function() {
  this.addPlugin({
    src: resolvePath('plugin.js'),
    fileName: 'nuex/plugin.js'
  })
}
