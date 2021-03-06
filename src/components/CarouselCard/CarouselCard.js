import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import styles from './CarouselCard.module.css'
const CarouselCard = (props) => {
  const { images } = props
  return (
    <Card className={styles['carouserl']}>
      <Card.Body>
        <Carousel>
          {images?.map((img) => (
            <Carousel.Item key={img.name}>
              <article className={styles['product-img-container']}>
                <img className={styles['product-img']} src={img.url} />
              </article>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card.Body>
    </Card>
  )
}

export default CarouselCard
