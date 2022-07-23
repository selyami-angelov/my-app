import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getAd } from '../../services/ad.js'
import SearchToolbar from '../../components/ButtonToolbar/ButtonToolbar.js'
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
    getAd(adId)
      .then((result) => {
        setAd(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(ad, 'ad')

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
              <UserCard userName={ad.contact_person} />
              <UserLocationCard
                userName={ad.contact_person}
                city={ad.location}
                area={ad.area}
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
                category={ad.category}
                currency={ad.currency}
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
