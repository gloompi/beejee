import { Map } from 'immutable'

export const arrToImmObj = (arr, DataRec = Map, id = 'id') => (
  arr.reduce((acc, elem) => (
    acc.set(elem[id], new DataRec(elem))
  ), new Map({}))
)

export const ObjToImmArr = obj => (
  obj.valueSeq().toArray()
)

export const arrToObj = arr => (
  arr.reduce((acc, elem) => {
    acc[elem.id] = elem
    return acc
  }, {})
)

export const ObjToArr = obj => (
  Object.keys(obj).map(id => obj[id])
)

export const range = i => (i?range(i-1).concat(i):[])
