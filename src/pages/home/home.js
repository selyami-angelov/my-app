import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchToolbar from '../../components/ButtonToolbar/ButtonToolbar.js'
import CardContainer from '../../components/CardContainer/CardContainer'
import CatFigure from '../../components/Categories/Categories.js'
import Footer from '../../components/Footer/Footer.js'
import HomeOverview from '../../components/HomeOverview/HomeOverview.js'
import { getAds } from '../../services/ad.js'
import './home.css'

const Home = (props) => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    getAds(setAds)
  }, [])

  console.log(ads)

  return (
    <>
      <SearchToolbar />
      <CatFigure />
      <CardContainer
        cards={
          <Row className="g-4">
            {ads.length &&
              ads.map((doc) => (
                <Col key={doc.id} xs lg="3">
                  <ProductCard
                    id={doc.id}
                    title={doc.title}
                    descr={doc.data.description}
                    img={doc.data.images[0]?.url}
                    btnText={'Преглед'}
                  />
                </Col>
              ))}
          </Row>
        }
      ></CardContainer>
      <HomeOverview />
      <Footer />
    </>
  )
}

export default Home
