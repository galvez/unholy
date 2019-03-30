**unholy** is a Vuex extension for Nuxt.js that modifies `commit()` to allow
simple, recursive state merging, as long as you use a single global state in 
your application.

```js
this.$store.commit({
  propInState: {
  	toBeUpdated: 2
  }
})
```

Calls to `commit()` with a single object parameter will trigger this 
functionality. 

Calls with more arguments will trigger the original functionality.

It is **unsafe** because it extends `Vuex.Store`'s prototype and Nuxt.js's 
default `store.js` template.

In other words, at the time of writing, this module is only **guaranteed** to 
work with **Nuxt 2.5.1** and **Vuex 3.1.0**.

 [See what **nuxt/hackernews** looks like with unholy][unholy-hn].

 [unholy-hn]: https://github.com/galvez/hackernews/commit/38885631742c9321172114693da30e703c85a120

# Installation

```sh
yarn add unholy
```

# Setup

Add to the `modules` section of your `nuxt.config.js`:

```js
export default {
  modules: ['unholy']
}
```

# Credits

- Jonas Galvez ([@galvez](https://github.com/galvez))
- Pooya Parsa ([@pi0](https://github.com/pi0))
