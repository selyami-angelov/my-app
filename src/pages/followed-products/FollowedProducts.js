import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import CardContainer from '../../components/CardContainer/CardContainer.js'
import ProductCard from '../../components/ProductCard/ProductCard.js'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import useFollowedProducts from '../../hook/useFollowedProducts.js'
import { getProductDoc } from '../../services/product.js'
import styles from './FollowedProducts.module.css'

const FollowedProducts = () => {
  const [products, setProducts] = useState([])
  const followed = useFollowedProducts()

  console.log(products)

  useEffect(() => {
    setProducts([])
    followed.forEach((product) => {
      getProductDoc(product).then((result) => {
        setProducts((prev) => [...prev, result])
      })
    })
  }, [followed])

  console.log(products.length)

  return (
    <>
      <SearchToolbar />
      <div className={styles['body']}>
        <CardContainer
          cards={
            <Row className="g-4">
              {products.length ? (
                products.map((doc) => (
                  <Col key={doc.id} xs lg="3">
                    <ProductCard
                      id={doc.id}
                      title={doc.data.title}
                      img={doc.data.images[0]?.url}
                      city={doc.data.city}
                      created_date={doc.data.created_date}
                      price={doc.data.price}
                      currency={doc.data.currency}
                    />
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          }
          title="Любими обяви"
        ></CardContainer>
      </div>
    </>
  )
}

export default FollowedProducts
