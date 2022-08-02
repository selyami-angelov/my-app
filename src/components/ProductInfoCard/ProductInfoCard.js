import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import styles from './ProductInfoCard.module.css'
const ProductInfoCard = (props) => {
  const {
    title,
    description,
    delivery,
    price,
    currency,
    category,
    subCategory,
  } = props

  return (
    <Card>
      <Card.Body className={styles['card-body']}>
        <Card.Title>{title}</Card.Title>
        <h4>
          {price} {currency}
        </h4>
        <article className={styles['badges-container']}>
          <h6>
            <Badge bg="secondary">Доставката се поема от: {delivery}</Badge>
          </h6>
          <h6>
            <Badge bg="secondary">
              {category} / {subCategory}
            </Badge>
          </h6>
        </article>
        <Card.Subtitle>ОПИСАНИЕ</Card.Subtitle>
        <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductInfoCard
