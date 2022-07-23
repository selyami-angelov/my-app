import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import styles from './ProductInfoCard.module.css'
const ProductInfoCard = (props) => {
  const { title, description, delivery, price, category, currency } = props

  return (
    <Card>
      <Card.Body className={styles['card-body']}>
        <Card.Title>{title}</Card.Title>
        <h4>
          {price} {currency}
        </h4>
        <h6>
          <Badge bg="secondary">
            Категория: {category?.split('/')[0].trim()}
          </Badge>{' '}
          <Badge bg="secondary">Доставката се поема от: {delivery}</Badge>
        </h6>
        <Card.Subtitle>ОПИСАНИЕ</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductInfoCard
