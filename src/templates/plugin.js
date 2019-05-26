
const stateOps = [
  'merge',
  'anull',
  'splice',
  'pop',
  'shift',
  'push',
  'empty'
]

const stateOpMap = {
  merge: 'nuxtStateMerge',
  anull: 'nuxtStateAnull',
  splice: 'nuxtStateSplice',
  pop: 'nuxtStatePop',
  shift: 'nuxtStateShift',
  push: 'nuxtStatePush',
  empty: 'nuxtStateEmpty'
}

function makeStateProxy(store, submodule = null) {
  if (submodule) {
    return new Proxy({}, {
      get: (_, prop) => {
        if (prop === 'pop') {
          return (...payload) => {
            console.log('!')
            let result
            const callback = (r) => { result = r }            
            store.commit(`${submodule}/${stateOpMap[prop]}`, { payload, callback })
            return result
          }
        }
        if (stateOps.includes(prop)) {
          return (...payload) => {
            store.commit(`${submodule}/${stateOpMap[prop]}`, payload)
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
        return (...payload) => {
          store.commit(stateOpMap[prop], payload, {root: true})
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
