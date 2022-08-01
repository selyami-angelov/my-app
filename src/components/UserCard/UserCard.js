import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './UserCard.module.css'
import { Nav } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { getUserDoc } from '../../services/userData.js'

const UserCard = (props) => {
  const { userName, userId, phone } = props
  const [userDoc, setUserDoc] = useState({})
  const [shPhone, setPhone] = useState(false)
  const navigate = useNavigate()
  const showPhone = () => {
    setPhone((prev) => !prev)
  }

  useEffect(() => {
    if (userId) {
      getUserDoc(userId).then((result) => {
        setUserDoc(result)
      })
    }
  }, [userId])

  console.log(userDoc, 'user doc')

  return (
    <Card>
      <Card.Body className={styles['card-content']}>
        <Card.Title>Потребител</Card.Title>
        <article className={styles['card-body']}>
          <i className="fa-solid fa-circle-user"></i>
          <article className={styles['user-info']}>
            <Card.Title>{userName}</Card.Title>
            <p>
              В XLO от{' '}
              <span>{new Date(+userDoc.createdAt).toLocaleString()}</span>
            </p>
          </article>
        </article>
        <div className="d-grid gap-2">
          <Button
            onClick={showPhone}
            className={styles['call-user']}
            variant="outline-dark"
          >
            {shPhone ? phone : 'Обади се'}
          </Button>
        </div>
        <Nav.Item>
          <Nav.Link
            className={styles['all-user-products']}
            onClick={() =>
              navigate('/user-products', {
                state: {
                  userId: userId,
                  pageTitle: 'Всички обяви на потребителя',
                },
              })
            }
          >
            Всички обяви на този потребител
          </Nav.Link>
        </Nav.Item>
      </Card.Body>
    </Card>
  )
}

export default UserCard
