function injectUnholyMutations(store) {
  if (!store.mutations) {
    store.mutations = {}
  }
  if (!store.actions) {
    store.actions = {}
  }
  mergeProps(store.mutations, {
    nuxtStateMerge: (s, p) => mergeProps(s, ...p),
    nuxtStateAnull: (s, p) => anullProps(s, ...p),
    nuxtStatePop: (s, p) => popArray(s, p),
    nuxtStateShift: (s, p) => shiftArray(s, ...p),
    nuxtStatePush: (s, p) => pushArrays(s, ...p),
    nuxtStateSplice: (s, p) => spliceArrays(s, ...p),
    nuxtStateEmpty: (s, p) => emptyArrays(s, ...pd)
  })
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
