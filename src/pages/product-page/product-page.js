import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getProduct } from '../../services/product.js'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import UserCard from '../../components/UserCard/UserCard.js'
import UserLocationCard from '../../components/UserLocationCard/UserLocationCard.js'
import styles from './product-page.module.css'
import ProductInfoCard from '../../components/ProductInfoCard/ProductInfoCard.js'
import CarouselCard from '../../components/CarouselCard/CarouselCard.js'
import Footer from '../../components/Footer/Footer.js'
const ProductPage = (props) => {
  const [ad, setAd] = useState({})
  const params = useParams()

  const adId = params.productId
  useEffect(() => {
    getProduct(adId)
      .then((result) => {
        setAd(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(params, 'ad')

  return (
    <>
      <SearchToolbar />
      <br></br>
      <section className={styles['container']}>
        <Container className={styles['container']}>
          <Row className={`justify-content-md-start ${styles['row']}`}>
            <Col xs lg="7">
              <CarouselCard images={ad.images} />
            </Col>
            <Col lg="4" className={styles['user-info-cards']}>
              <UserCard
                phone={ad.phone}
                userName={ad.contact_person}
                userId={ad.userId}
              />
              <UserLocationCard
                userName={ad.contact_person}
                city={ad.city}
                area={ad.region}
              />
            </Col>
          </Row>
          <Row className={`justify-content-md-start ${styles['row']}`}>
            <Col xs lg="7">
              <ProductInfoCard
                title={ad.title}
                description={ad.description}
                delivery={ad.delivery}
                price={ad.price}
                currency={ad.currency}
                category={ad.category_bg}
                subCategory={ad.sub_category_bg}
                productId={params.productId}
                userId={ad.userId}
                createdDate={ad.created_date}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default ProductPage
