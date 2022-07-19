import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getAd } from '../../services/ad.js'
import Carousel from 'react-bootstrap/Carousel'
import SearchToolbar from '../../components/ButtonToolbar/ButtonToolbar.js'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import UserCard from '../../components/UserCard/UserCard.js'

const AdPage = (props) => {
  const [ad, setAd] = useState({})
  const params = useParams()

  const adId = params.adId
  useEffect(() => {
    getAd(adId)
      .then((result) => {
        setAd(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  console.log(ad, 'in ad page')
  return (
    <>
      <SearchToolbar />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="7">
            <Carousel>
              {ad.images?.map((img) => (
                <Carousel.Item>
                  <img className="w-100" src={img.url} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col lg="4">
            <UserCard userName={ad.contact_person} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdPage
