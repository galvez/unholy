import { resolve } from 'path'

function isObject(val) {
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

function resolvePath(...args) {
  return resolve(__dirname, ...args)
}

export default function() {
  this.addPlugin({
    src: resolvePath('plugin.js'),
    fileName: 'unholy/plugin.js'
  })
}
