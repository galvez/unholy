# **@nuxt/state** 

## Injects `$state` helper for performing mutations on the Vuex store

<details>
<summary>
<b><code>$state.merge</code></b>: merges object into state, overriding existing values
</summary><br>

```js
this.$state.merge({
  propInState: {
    toBeUpdated: 2
  }
})
```
</details>

<details>
<summary>
<b><code>$state.anull</code></b>: set properties in the state to null
</summary><br>

```js
// Set top-level props to null
this.$state.anull(['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull'])

// Set obj props to null
this.$state.anull({
  obj: ['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull']
})
```
</details>

<details>
<summary>
<b><code>$state.push</code></b>: push values into state arrays
</summary><br>

```js
this.$state.merge({
  arrayInState: {
    toReceiveItems1: [2, 3] // push(2, 3)
    toReceiveItems2: ['a', 'b'] // push('a', 'b')
  }
})
```
</details>

<details>
<summary>
<b><code>$state.splice</code></b>: perform Array.splice() on state arrays
</summary><br>

```js
this.$state.splice({
  arrayInState: {
    toHaveSplicedItems: [0, 2] // splice args
  }
})
```
</details>

<details>
<summary>
<b><code>$state.empty</code></b>: remove all items from arrays
</summary><br>

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
</details>

# Installation

```sh
yarn add @nuxt/state
```

To use with store submodules: **`$state.submodule.operation()`**.

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
