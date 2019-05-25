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
      anotherArrayInObj: []
    },
    arrayInState: {
      toReceiveItems1: [6, 7],
      toReceiveItems2: ['a', 'b'],
      toHaveSplicedItems: [0, 2],
    },
    anotherArrayInState: []
  }
}

describe('unholy tests', () => {
  test('test mergeProps()', () => {
    let state
    let prop
    let otherProp
    let obj

    state = getState()
    mergeProps(state, { newProp: 1 })
    expect(state.newProp).toMatchSnapshot()

    state = getState()
    mergeProps(state, {
      newProp: 2,
      newObject: {
        newProp: 3,
        newArray: [4]
      }
    })
    expect(state.newProp).toMatchSnapshot()
    expect(state.newObject).toMatchSnapshot()
  })

  test('test anullProps()', () => {
    let state
    let prop
    let otherProp
    let obj

    state = getState()
    anullProps(state, 'prop')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, 'prop', 'otherProp')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, { obj: ['prop', 'otherProp'] })
    ;({ obj } = state)
    expect({ obj }).toMatchSnapshot()
  })

  test('test pushArrays()', () => {
    let state
    let prop
    let otherProp
    let obj

    state = getState()
    anullProps(state, 'prop')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, 'prop', 'otherProp')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, { obj: ['prop', 'otherProp'] })
    ;({ obj } = state)
    expect({ obj }).toMatchSnapshot()
  })

  test('test spliceArrays()', () => {
    let state
    let prop
    let otherProp
    let obj

    state = getState()
    anullProps(state, 'prop')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, 'prop', 'otherProp')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, { obj: ['prop', 'otherProp'] })
    ;({ obj } = state)
    expect({ obj }).toMatchSnapshot()
  })

  test('test emptyArrays()', () => {
    let state
    let prop
    let otherProp
    let obj

    state = getState()
    anullProps(state, 'prop')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, 'prop', 'otherProp')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, { obj: ['prop', 'otherProp'] })
    ;({ obj } = state)
    expect({ obj }).toMatchSnapshot()
  })
})
