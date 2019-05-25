// createStore
export const createStore = store instanceof Function ? store : () => {
  store.mutations.nuxtStateMerge = function(state, payload) {
    mergeProps(state, payload).call(this)
  }
  store.mutations.nuxtStatePush = function(state, payload) {
    pushArray(state, payload).call(this)
  }
  store.mutations.nuxtStateAnull = function(state, payload) {
    anullProps(state, payload).call(this)
  },
  store.mutations.nuxtStateSplice = function(state, payload) {
    spliceArrays(state, payload).call(this)
  }
  store.mutations.nuxtStateEmpty = function(state, payload) {
    emptyArrays(state, payload).call(this)
  }
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}
