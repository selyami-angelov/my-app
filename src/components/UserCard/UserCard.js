import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './UserCard.module.css'

const UserCard = (props) => {
  const { userName, phone } = props
  const [shPhone, setPhone] = useState(false)
  const showPhone = () => {
    setPhone((prev) => !prev)
  }

  return (
    <Card>
      <Card.Header>Потребител</Card.Header>
      <Card.Body>
        <div className={styles['use-title']}>
          <i className="fa-solid fa-circle-user"></i>
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
          <Button
            onClick={showPhone}
            className={styles['call-user']}
            variant="outline-dark"
          >
            {shPhone ? phone : 'Обади се'}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default UserCard
