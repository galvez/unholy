export default {
  propInState: {
    toBeUpdated: 1
  },
  propToReceiveNull: 2,
  otherPropToReceiveNull: 3,
  obj: {
    propToReceiveNull: 4,
    arrayInObj: [],
    anotherArrayInObj: []
  },
  arrayInState: {
    toReceiveItems1: [2, 3], // push(2, 3)
    toReceiveItems2: ['a', 'b'], // push('a', 'b')
    toHaveSplicedItems: [0, 2], // splice(0, 2)
  },
  anotherArrayInState: []
}
