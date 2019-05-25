**unholy** is a Vuex extension for Nuxt.js that injects a `$state` helper for performing state operations on the Vuex store. Currently the following operations are supported:

## **merge**

```js
this.$state.merge({
  propInState: {
    toBeUpdated: 2
  }
})
````

## **anull**

```js
// Set top-level props to null
this.$state.anull(['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull'])

// Set obj props to null
this.$state.anull({
  obj: ['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull']
})
````

## **push**

```js
this.$state.merge({
  arrayInState: {
    toReceiveItems: [2, 3] // push(2, 3)
  }
})
```

## **splice**

```js
this.$state.splice({
  arrayInState: {
    toHaveSplicedItems: [0, 2] // splice args
  }
})
```

## **empty**

```js
this.$state.empty('arrayInStateToHaveItemsEmptied')

this.$state.empty([
  'arrayInStateToHaveItemsEmptied', 
  'anotherArrayInStateToHaveItemsEmptied'
 ])

this.$state.empty({
  obj: ['arrayInObjToHaveItemsEmptied', 'arrayInObjToHaveItemsEmptied']
})
```

# Installation

```sh
yarn add @nuxt/state
```

# Setup

Add to the `modules` section of your `nuxt.config.js`:

```js
export default {
  modules: ['@nuxt/state']
}
```

# Credits

- Jonas Galvez ([@galvez](https://github.com/galvez))
- Pooya Parsa ([@pi0](https://github.com/pi0))
