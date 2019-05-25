
const stateOps = [
  'merge',
  'anull',
  'splice',
  'push',
  'empty'
]

const stateOpMap = {
  merge: 'nuxtStateMerge',
  anull: 'nuxtStateAnull',
  splice: 'nuxtStateSplice',
  push: 'nuxtStatePush',
  empty: 'nuxtStateEmpty'
}

function makeStateProxy(store, submodule = null) {
  if (submodule) {
    return new Proxy({}, {
      get: (_, prop) => {
        if (stateOps.includes(prop)) {
          return (payload) => {
            store.commit(`${submodule}/${stateOpMap[prop]}`, payload, {root: true})
          }
        } else {
          return makeStateProxy(store, `${prop}/${submodule}`)
        }
      }
    })
  }
  return new Proxy({}, {
    get: (_, prop) => {
      if (stateOps.includes(prop)) {
        return (...args) => {
          store.commit(stateOpMap[prop], ...args)
        }
      } else {
        return makeStateProxy(store, prop)
      }
    }
  })
}

export default (ctx, inject) => {
  inject('state', makeStateProxy(ctx.store))
}
