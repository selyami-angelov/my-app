export const appendAvalibleParams = (path, searchParams) => {
  let newPath = path
  searchParams.get('city') && (newPath += `?city=${searchParams.get('city')}`)
  searchParams.get('priceFrom') &&
    (newPath += `?priceFrom=${searchParams.get('priceFrom')}`)
  searchParams.get('priceTo') &&
    (newPath += `?priceTo=${searchParams.get('priceTo')}`)
  searchParams.get('deliveryCondition') &&
    (newPath += `?deliveryCondition=${searchParams.get('deliveryCondition')}`)

  return newPath
}
