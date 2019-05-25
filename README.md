# **@nuxt/state** 

Injects a `$state` helper for performing state mutations on the Vuex store. 

<details>
<summary>$state.merge</summary>
this.$state.merge({
  propInState: {
    toBeUpdated: 2
  }
})
</details>


<details>
<summary>$state.anull</summary>
// Set top-level props to null
this.$state.anull(['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull'])

// Set obj props to null
this.$state.anull({
  obj: ['propToReceiveNull', 'propToReceiveNull', 'propToReceiveNull']
})
</details>

<details>
<summary>$state.push</summary>
this.$state.merge({
  arrayInState: {
    toReceiveItems: [2, 3] // push(2, 3)
  }
})
</details>

<details>
<summary>$state.splice</summary>
this.$state.splice({
  arrayInState: {
    toHaveSplicedItems: [0, 2] // splice args
  }
})
</details>

<details>
<summary>
**$state.empty**: remove all items from arrays
</summary>


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
