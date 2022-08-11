import React from 'react'
import Card from 'react-bootstrap/Card'
import styles from './UserLocationCard.module.css'
import Map from '../GoogleMap/GoogleMap.js'

const UserLocationCard = (props) => {
  const { userName, city, area } = props

  return (
    <>
      <Card>
        <Card.Body className={styles['card-body']}>
          <Card.Title className={styles['title']}>
            <i
              className={`fa-solid fa-location-dot ${styles['location-icon']}`}
            ></i>
            Лоцация
          </Card.Title>
          <div className={styles['card-content']}>
            <article className={styles['location-text-content']}>
              <p>гр. {city}</p>
              <p>Област {area}</p>
            </article>
            <article className={styles['google-map']}>
              <Map city={city} />
            </article>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default UserLocationCard
