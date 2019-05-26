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

export function popArray(target, { payload, callback }, result) {
  if (!isObject(target)) {
    return
  }
  if (payload.length === 1 && typeof payload[0] === 'string' && result) {
    const lastItem = target[payload[0]].pop()
    result[payload[0]] = lastItem
    return result
  } else if (payload.length === 1 && isObject(payload[0])) {
    payload = payload[0]
    const result = {}
    for (const key in payload) {
      console.log('key', key)
      if (key === '__proto__' || key === 'constructor') {
        continue
      }
      if (isObject(payload[key])) {
        result[key] = popArray(payload[key], { payload: payload[key] }, result)
      } else if (Array.isArray(payload[key])) {
        if (!result[key]) {
          result[key] = []
        }
        for (const vkey of payload[key]) {
          result[key].push(popArray(payload[key], { payload: vkey }))
        }
      }
    }
    callback(result)
  } else if (payload.length) {
    const arrResult = payload
      .filter((key) => {
        return typeof key === 'string'
      })
      .map((key) => {
        return target[key].pop()
      })
    callback(arrResult.length > 1 ? arrResult : arrResult[0])
  }
}

export function shiftArray(target, key) {
  if (!isObject(target) || typeof key !== 'string') {
    return
  }
  return target[key].shift()
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
      } else if (Array.isArray(val)) {
        for (const vkey of val) {
          if (typeof vkey === 'string' && Array.isArray(target[key][vkey])) {
            target[key][vkey].splice(0, target[key][vkey].length)
          }
        }
      }
    }
  } else {
    for (const key of source) {
      if (typeof key === 'string' && Array.isArray(target[key])) {
        target[key].splice(0, target[key].length)
      }
    }
  }
}
