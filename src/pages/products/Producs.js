import styles from './Products.module.css'
import { useEffect, useState } from 'react'
import { getProductsQuery } from '../../services/ad.js'
import { Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import SearchToolbar from '../../components/ButtonToolbar/ButtonToolbar.js'
import Footer from '../../components/Footer/Footer.js'
import ProductCardLandscape from '../../components/ProductCardLandscape/ProductCardLandscape.js'

const Products = (props) => {
  const [products, setProducts] = useState([])
  const params = useParams()

  useEffect(() => {
    getProductsQuery('sub_category', params.subcategory)
      .then((result) => {
        setProducts(result)
      })
      .catch((err) => {
        console.log('err')
      })
  }, [])

  console.log(products)

  return (
    <>
      <>
        <SearchToolbar />
        <br></br>
        <section className={styles['container']}>
          <Container className={styles['container']}>
            {products.map((product) => (
              <ProductCardLandscape
                url={product.data.images[0].url}
                title={product.data.title}
                price={product.data.price}
                currency={product.data.currency}
                location={product.data.location}
              />
            ))}
          </Container>
        </section>
      </>
    </>
  )
}

export default Products
