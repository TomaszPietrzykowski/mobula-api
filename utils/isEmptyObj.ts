const isEmptyObj = (obj: object): boolean => {
  for (const prop in obj) return false
  return true
}

export default isEmptyObj
