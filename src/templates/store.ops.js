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
      mergeProps(target[key], source[key])
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
      anullProps(target[key], source[key])
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
      pushItems(target[key], source[key])
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
      emptyArrays(target[key], source[key])
    } else if (Array.isArray(val)) {
      for (const vkey in val) {
        target[vkey].splice(0, target[vkey].length)
      }
    }
  }
}
