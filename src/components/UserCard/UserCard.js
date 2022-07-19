import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './UserCard.module.css'
import { Row } from 'react-bootstrap'

const UserCard = (props) => {
  const { userName } = props
  return (
    <Card>
      <Card.Header>Потребител</Card.Header>
      <Card.Body>
        <div className={styles['use-title']}>
          <i class="fa-solid fa-circle-user"></i>
          <Card.Title>{userName}</Card.Title>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-grid gap-2">
          <Button clasName={styles['call-user']} variant="outline-dark">
            Обади се
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default UserCard
