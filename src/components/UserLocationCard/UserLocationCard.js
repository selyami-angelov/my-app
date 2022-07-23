import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './UserLocationCard.module.css'
import Map from '../GoogleMap/GoogleMap.js'

const UserLocationCard = (props) => {
  const { userName, city, area } = props
  const [clicks, setClicks] = useState([])
  const [zoom, setZoom] = useState(3) // initial zoom
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  })

  const render = (status) => {
    return <h1>{status}</h1>
  }

  //AIzaSyBppBs4IjjHZCp_qXxokEe3PrlrJ8fq1wk
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>
            <i
              className={`fa-solid fa-location-dot ${styles['location-icon']}`}
            ></i>
            Лоцация
          </Card.Title>
          <div className={styles['card-content']}>
            <article className={styles['location-text-content']}>
              <Card.Subtitle>гр. {city}</Card.Subtitle>
              <p>Област</p>
              <p>{area}</p>
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
