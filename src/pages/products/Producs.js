import styles from './Products.module.css'
import { useEffect, useState } from 'react'
import { getProductsQuery } from '../../services/ad.js'
import { Container } from 'react-bootstrap'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCardLandscape from '../../components/ProductCardLandscape/ProductCardLandscape.js'
import FilterBar from '../../components/FilterBar/FilterBar.js'
import { filterProducts } from './utils.js'
import { capitalCase } from 'change-case'

const Products = () => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams()
  const params = useParams()

  const filterQueries = [
    { city: searchParams.get('city') },
    { priceFrom: searchParams.get('priceFrom') },
    { priceTo: searchParams.get('priceTo') },
    { deliveryCondition: searchParams.get('deliveryCondition') },
    { subCategory: params.subcategory },
  ]

  useEffect(() => {
    let searchField = 'category'
    let contains = params.category
    if (params.category === 'all' && filterQueries[0].city) {
      searchField = 'city'
      contains = capitalCase(filterQueries[0].city)
    }

    getProductsQuery(searchField, contains)
      .then((res) => {
        const avalibleFilters = filterQueries.filter(
          (qr) => Object.values(qr)[0]
        )

        const result = filterProducts(res, avalibleFilters)
        setAllProducts(res)
        setProducts(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [params.category, filterQueries[0].city])

  useEffect(() => {
    const avalibleFilters = filterQueries.filter((qr) => Object.values(qr)[0])
    const result = filterProducts(allProducts, avalibleFilters)

    setProducts(result)
  }, [
    filterQueries[0].city,
    filterQueries[1].priceFrom,
    filterQueries[2].priceTo,
    filterQueries[3].deliveryCondition,
    filterQueries[4].subCategory,
  ])

  products.forEach((product) => {
    console.log(product.data)
  })
  return (
    <>
      <FilterBar />
      <br></br>
      <section className={styles['container']}>
        <Container className={styles['container']}>
          {products.map((product) => (
            <ProductCardLandscape
              id={product.id}
              key={product.data.images[0].url}
              url={product.data.images[0].url}
              title={product.data.title}
              price={product.data.price}
              currency={product.data.currency}
              city={product.data.city}
            />
          ))}
        </Container>
      </section>
    </>
  )
}

export default Products
