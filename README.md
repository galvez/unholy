# unholy

A [Nuxt.js][nuxt] module that injects a `$state` helper for performing **core data 
mutations on the Vuex store**. 

Works with Nuxt.js **2.5 and above**.

[nuxt]: https://github.com/nuxt/nuxt.js

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
this.$state.anull('propToReceiveNull', 'otherPropToReceiveNull', ...)

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
<b><code>$state.splice</code></b>: perform `Array.splice()` on state arrays
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

Usage with store submodules: **`$state.submodule.operation()`**.

# Installation

```sh
yarn add unholy
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
