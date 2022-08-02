import React from 'react'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import styles from './ProductInfoCard.module.css'
import HeartIcon from '../HeartIcon/HeartIcon.js'
const ProductInfoCard = (props) => {
  const {
    title,
    description,
    delivery,
    price,
    currency,
    category,
    subCategory,
    productId,
    userId,
    createdDate,
  } = props

  return (
    <Card>
      <Card.Body className={styles['card-body']}>
        <article className={styles['header']}>
          <span>
            Добявена <span>{new Date(createdDate).toLocaleString()}</span>
          </span>
          <HeartIcon
            style={{ fontSize: '24px' }}
            productId={productId}
            userId={userId}
          ></HeartIcon>
        </article>
        <Card.Title className={styles['title']}>{title}</Card.Title>
        <h3 className={styles['price']}>
          {price} {currency}
        </h3>
        <article className={styles['badges-container']}>
          <h5>
            <Badge bg="secondary">Доставката се поема от: {delivery}</Badge>
          </h5>
          <h5>
            <Badge bg="secondary">
              {category} / {subCategory}
            </Badge>
          </h5>
        </article>
        <Card.Subtitle className={styles['description']}>
          ОПИСАНИЕ
        </Card.Subtitle>
        <Card.Text className={styles['text']}>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductInfoCard
