export const appendCurrentQrToUrl = (path, queries) => {
  let newPath = path
  Object.keys(queries).forEach((key) => {
    if (queries[key]) {
      newPath += `?${key}=${queries[key]}`
    }
  })

  return newPath
}
