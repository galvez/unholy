// createStore
export const createStore = store instanceof Function ? store : () => {
  store.mutations.nuxtStateMerge = function(state, payload) {
    mergeProps(state, payload)
  }
  store.mutations.nuxtStatePush = function(state, payload) {
    pushArray(state, payload)
  }
  store.mutations.nuxtStateAnull = function(state, payload) {
    anullProps(state, payload)
  },
  store.mutations.nuxtStateSplice = function(state, payload) {
    spliceArrays(state, payload)
  }
  store.mutations.nuxtStateEmpty = function(state, payload) {
    emptyArrays(state, payload)
  }
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}
