
makeStateProxy.STATE_OPS = [
  'merge',
  'anull',
  'splice',
  'push',
  'empty'
]

function makeStateProxy(store, submodule = null) {
  if (submodule) {
    return new Proxy({}, {
      get: (_, prop) => {
        if (STATE_OPS.includes(prop)) {
          return (payload) => {
            store.commit(`${submodule}/${prop}`, payload, {root: true})
          }
        } else {
          return makeStateProxy(store, `${prop}/${submodule}`)
        }
      }
    })
  }
  return new Proxy({}, {
    get: (_, prop) => {
      if (STATE_OPS.includes(prop)) {
        return (...args) => {
          store.commit(prop, ...args)
        }
      } else {
        return makeStateProxy(store, prop)
      }
    }
  }
}

export default (ctx, inject) => {
  inject('state', makeStateProxy(ctx.store))
}
