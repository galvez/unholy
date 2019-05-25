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
      propToReceiveNull: 4,
      arrayInObj: [],
      anotherArrayInObj: []
    },
    arrayInState: {
      toReceiveItems1: [2, 3],
      toReceiveItems2: ['a', 'b'],
      toHaveSplicedItems: [0, 2],
    },
    anotherArrayInState: []
  }
}

describe('unholy tests', () => {
  test('test anullProps()', () => {

    let state = getState()
    let prop, otherProp

    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    anullProps(state, 'prop')
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, ['prop', 'otherProp'])
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()

    state = getState()
    anullProps(state, { obj: ['prop', 'otherProp'] })
    ;({ prop, otherProp } = state)
    expect({ prop, otherProp }).toMatchSnapshot()
  })
})
