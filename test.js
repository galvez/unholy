import Vue from 'vue'
import {
  isObject as _isObject,
  mergeProps as _mergeProps,
  anullProps as _anullProps,
  pushArrays as _pushArrays,
  spliceArrays as _spliceArrays,
  emptyArrays as _emptyArrays
} from './src/templates/store.ops.js'

function injectVue(func) {
  return eval(`(function(Vue) { return ${func.toString()} })`)(Vue)
}

// Inject Vue into code imported from Nuxt template
const isObject = injectVue(_isObject)
const mergeProps = injectVue(_mergeProps)
const anullProps = injectVue(_anullProps)
const pushArrays = injectVue(_pushArrays)
const spliceArrays = injectVue(_spliceArrays)
const emptyArrays = injectVue(_emptyArrays)

function getState() {
  return {
    propInState: {
      toBeUpdated: 1
    },
    prop: 2,
    otherProp: 3,
    obj: {
      prop: 4,
      otherProp: 5,
      arrayInObj: [],
      anotherArrayInObj: [],
      nested: {
        arr: [1, 2, 3]
      }
    },
    obj2: {
      arr1: [6, 7],
      arr2: ['a', 'b'],
      arr3: [1, 2, 3, 4, 5]
    },
    anotherArrayInState: [10]
  }
}

describe('unholy tests', () => {
  // test('test mergeProps()', () => {
  //   let state

  //   state = getState()
  //   mergeProps(state, { newProp: 1 })
  //   expect(state.newProp).toMatchSnapshot()

  //   state = getState()
  //   mergeProps(state, {
  //     newProp: 2,
  //     newObject: {
  //       newProp: 3,
  //       newArray: [4]
  //     }
  //   })
  //   expect(state.newProp).toMatchSnapshot()
  //   expect(state.newObject).toMatchSnapshot()
  // })

  // test('test anullProps()', () => {
  //   let state
  //   let prop
  //   let otherProp
  //   let obj

  //   state = getState()
  //   anullProps(state, 'prop')
  //   ;({ prop, otherProp } = state)
  //   expect({ prop, otherProp }).toMatchSnapshot()

  //   state = getState()
  //   anullProps(state, 'prop', 'otherProp')
  //   ;({ prop, otherProp } = state)
  //   expect({ prop, otherProp }).toMatchSnapshot()

  //   state = getState()
  //   anullProps(state, { obj: ['prop', 'otherProp'] })
  //   ;({ obj } = state)
  //   expect({ obj }).toMatchSnapshot()
  // })

  // test('test pushArrays()', () => {
  //   const state = getState()
  //   pushArrays(state, {
  //     obj: {
  //       arrayInObj: [1, 2],
  //       anotherArrayInObj: [3, 4]
  //     },
  //     obj2: {
  //       arr1: [8, 9],
  //       arr2: ['c', 'd'],
  //     }
  //   })
  //   expect(state).toMatchSnapshot()
  // })

  // test('test spliceArrays()', () => {
  //   const state = getState()
  //   spliceArrays(state, {
  //     obj2: {
  //       arr1: [1, 1, 10],
  //       arr2: [2, 0, 'e', 'f'],
  //     }
  //   })
  //   expect(state).toMatchSnapshot()
  // })

  test('test emptyArrays()', () => {
    let state

    state = getState()
    emptyArrays(state, {
      obj: {
        nested: ['arr']
      },
      obj2: ['arr2']
    })
    expect(state).toMatchSnapshot()

    state = getState()
    emptyArrays(state, 'anotherArrayInState')
    expect(state).toMatchSnapshot()
  })
})
