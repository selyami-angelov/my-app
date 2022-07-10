import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import './CardContainer.css'

const CardContainer = (props) => {
  const { cards } = props

  return (
    <section className="card-section">
      <h2 className="card-section-title">Промо обяви</h2>
      <Container>{cards}</Container>
    </section>
  )
}

export default CardContainer
