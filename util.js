export const noop = () => {}

export const insert = (arr, item, index = Infinity) => [
  ...arr.slice(0, index),
  item,
  ...arr.slice(index),
]

export const rejectEquals = (arr, comparator) =>
  arr.filter(item => item !== comparator)

export const uniq = arr => {
  const set = new Set(arr)
  return Array.from(set)
}

export const omit = (obj, prop) => {
  const o = {}
  for (const key in obj) {
    if (key !== prop) {
      o[key] = obj[key]
    }
  }
  return o
}

export const omitWhen = (predFn, obj) => {
  const o = {}
  for (const key in obj) {
    if (!predFn(key)) {
      o[key] = obj[key]
    }
  }
  return o
}

export const merge = (...objects) => {
  const o = {}
  for (const obj of objects) {
    for (const key in obj) {
      if (typeof obj[key] !== 'undefined') {
        o[key] = obj[key]
      }
    }
  }
  return o
}
