import React from 'react'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router'
import HeartIcon from '../HeartIcon/HeartIcon.js'
import styles from './ProductCard.module.css'

const ProductCard = (props) => {
  const { img, title, city, created_date, price, currency, id } = props
  const navigate = useNavigate()
  const openProduct = () => {
    navigate(`/product/${id}`)
  }

  return (
    <Card className={styles['product-card']}>
      <article className={styles['product-img-container']}>
        <Card.Img
          onClick={openProduct}
          className={styles['product-img']}
          variant="top"
          src={img}
        />
      </article>
      <Card.Body className={styles['body']}>
        <h4 onClick={openProduct} className={styles['title']}>
          {title}
        </h4>
        <article className={styles['body-footer']}>
          <article className={styles['footer-text-content']}>
            <label className={styles['location']}>
              гр. {city} - {new Date(created_date).toLocaleString()}
            </label>
            <Card.Subtitle>
              {price} {currency}
            </Card.Subtitle>
          </article>
          <HeartIcon />
        </article>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
