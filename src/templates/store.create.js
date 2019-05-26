function injectUnholyMutations(store) {
  store.mutations.nuxtStateMerge = function (state, payload) {
    mergeProps(state, payload)
  }
  store.mutations.nuxtStateAnull = function (state, payload) {
    anullProps(state, payload)
  }
  store.mutations.nuxtStatePush = function (state, payload) {
    pushArrays(state, payload)
  }
  store.mutations.nuxtStateSplice = function (state, payload) {
    spliceArrays(state, payload)
  }
  store.mutations.nuxtStateEmpty = function (state, payload) {
    emptyArrays(state, payload)
  }
  if (store.modules) {
    Object.keys(store.modules).forEach((module) => {
      injectUnholyMutations(store.modules[module])
    })
  }
}

// createStore
export const createStore = store instanceof Function ? store : () => {
  injectUnholyMutations(store)
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}
