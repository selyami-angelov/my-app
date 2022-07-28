export const filterProducts = (allProducts, avalibleFilters) => {
  const results = []
  allProducts.forEach((product) => {
    let flag = true
    avalibleFilters.forEach((fr) => {
      const key = Object.keys(fr)[0]
      const value = fr[key]

      if (key === 'priceFrom') {
        !(+product.data.price >= value) && (flag = false)
      }
      if (key === 'priceTo') {
        !(product.data.price <= value) && (flag = false)
      }
      if (key === 'deliveryCondition' && value !== 'all') {
        String(product.data.delivery).toLowerCase() !== value.toLowerCase() &&
          (flag = false)
      }
      if (key === 'subCategory' && value !== 'all') {
        String(product.data.sub_category).toLowerCase() !==
          value.toLowerCase() && (flag = false)
      }
      if (key === 'city' && value !== 'all') {
        String(product.data.city).toLowerCase() !== value.toLowerCase() &&
          (flag = false)
      }

      if (!flag) {
        return
      }
    })

    if (flag) {
      results.push(product)
    }
  })

  return results
}
