import React, { useContext, useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchToolbar from '../../components/SearchToolbar/SearchToolbar.js'
import CardContainer from '../../components/CardContainer/CardContainer'
import CatFigure from '../../components/Categories/Categories.js'
import Footer from '../../components/Footer/Footer.js'
import HomeOverview from '../../components/HomeOverview/HomeOverview.js'
import { getLastCreatedProducts } from '../../services/product.js'
import './home.css'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getLastCreatedProducts(12).then((result) => {
      setProducts(result)
    })
  }, [])

  return (
    <>
      <SearchToolbar />
      <CatFigure />
      <CardContainer
        cards={
          <Row className="g-4">
            {products.length ? (
              products.map((doc) => (
                <Col key={doc.id} xs lg="3">
                  <ProductCard
                    id={doc.id}
                    userId={doc.data.userId}
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
        title="Последно добавени обяви"
      ></CardContainer>
      <HomeOverview />
      <Footer />
    </>
  )
}

export default Home
