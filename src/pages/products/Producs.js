import styles from './Products.module.css'
import { useEffect, useState } from 'react'
import { getProductsQuery } from '../../services/ad.js'
import { Container, Row } from 'react-bootstrap'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import ProductCardLandscape from '../../components/ProductCardLandscape/ProductCardLandscape.js'
import FilterBar from '../../components/FilterBar/FilterBar.js'
import { cats } from '../../configs/cats-config.js'

const Products = (props) => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const params = useParams()
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const [cat, setCat] = useState(
    cats.find((cat) => cat.label === state.category)
  )

  const city = searchParams.get('city')
  const priceFrom = searchParams.get('priceFrom')
  const priceTo = searchParams.get('priceTo')
  const deliveryCondition = searchParams.get('deliveryCondition')

  useEffect(() => {
    getProductsQuery('sub_category', params.subcategory)
      .then((result) => {
        setAllProducts(result)
        setProducts(result)
      })
      .catch((err) => {
        console.log('err')
      })
  }, [params.subcategory])

  useEffect(() => {
    let filterResult = [...allProducts]

    if (city) {
      const result = filterResult.filter(
        (product) => product.data.city.toLowerCase() === city
      )
      filterResult = [...result]
    }

    if (priceFrom && priceTo) {
      const result = filterResult.filter(
        (product) =>
          product.data.price >= priceFrom && product.data.price <= priceTo
      )
      filterResult = [...result]
    } else if (priceFrom) {
      const result = filterResult.filter(
        (product) => product.data.price >= priceFrom
      )
      filterResult = [...result]
    } else if (priceTo) {
      const result = filterResult.filter(
        (product) => product.data.price <= priceTo
      )
      filterResult = [...result]
    }

    if (deliveryCondition && deliveryCondition !== 'Виж всички') {
      const result = filterResult.filter(
        (product) => product.data.delivery === deliveryCondition
      )
      filterResult = [...result]
    }

    setProducts(filterResult)
  }, [searchParams])

  return (
    <>
      <FilterBar cat={cat} currentSubCat={state.subCategory} />
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
