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

export function anullProps(target, ...source) {
  if (!isObject(target)) {
    return
  }
  if (source.length === 1 && isObject(source[0])) {
    source = source[0]
    for (const key in source) {
      if (key === '__proto__' || key === 'constructor') {
        continue
      }
      const val = source[key]
      if (isObject(val)) {
        anullProps(target[key], source[key])
      } else if (Array.isArray(val)) {
        for (const vkey of val) {
          Vue.set(target[key], vkey, null)
        }
      }
    }
  } else {
    for (const vkey of source) {
      if (typeof vkey === 'string') {
        Vue.set(target, vkey, null)
      }
    }
  }
}

export function pushArrays(target, source) {
  if (!isObject(target) && !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val)) {
      pushArrays(target[key], source[key])
    } else if (Array.isArray(target[key]) && Array.isArray(val)) {
      target[key].push(...val)
    }
  }
}

export function spliceArrays(target, source) {
  if (!isObject(target) && !isObject(source)) {
    return
  }
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor') {
      continue
    }
    const val = source[key]
    if (isObject(val)) {
      spliceArrays(target[key], source[key])
    } else if (Array.isArray(target[key]) && Array.isArray(val)) {
      target[key].splice.apply(target[key], val)
    }
  }
}


export function emptyArrays(target, ...source) {
  if (!isObject(target)) {
    return
  }
  if (source.length === 1 && isObject(source[0])) {
    source = source[0]
    for (const key in source) {
      if (key === '__proto__' || key === 'constructor') {
        continue
      }
      const val = source[key]
      if (isObject(val)) {
        emptyArrays(target[key], source[key])
      } else if (Array.isArray(target[key]) && Array.isArray(val)) {
        target[key].splice(0, target[key].length)
      }
    }
  } else {
    for (const vkey of source) {
      if (typeof vkey === 'string' && Array.isArray(target[key])) {
        target[key].splice(0, target[key].length)
      }
    }
  }
}
