export function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

export function mergeProps(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      mergeProps(target[key], source[key])
    } else {
      Vue.set(target, key, val)
    }
  }
}

export function anullProps(target, source) {
  if (!isObject(target)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (typeof val === 'string') {
      Vue.set(target, key, null)
    } else if (isObject(val)) {
      anullProps(target[key], source[key])
    } else if (Array.isArray(val)) {
      for (const vkey of val) {
        Vue.set(target, vkey, null)
      }
    }
  }
}

export function pushArrays(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      pushArrays(target[key], source[key])
    } else if (Array.isArray(val) && Array.isArray(target[key])) {
      target[key].push(val)
    }
  }
}

export function spliceArrays(target, source) {
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

export function emptyArrays(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val) && isObject(target[key])) {
      emptyArrays(target[key], source[key])
    } else if (Array.isArray(val)) {
      for (const vkey in val) {
        target[vkey].splice(0, target[vkey].length)
      }
    }
  }
}
