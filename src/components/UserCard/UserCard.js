import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './UserCard.module.css'

const UserCard = (props) => {
  const { userName } = props
  return (
    <Card>
      <Card.Header>Потребител</Card.Header>
      <Card.Body>
        <div className={styles['use-title']}>
          <i class="fa-solid fa-circle-user"></i>
          <div>
            <Card.Title>{userName}</Card.Title>
            <p>
              В XLO то <span>март 2017 г.</span>
            </p>
          </div>
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
