import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useNavigate } from 'react-router'

const AdCard = (props) => {
  const navigate = useNavigate()
  const openAd = () => {
    navigate(`/product/${props.id}`)
  }
  console.log(props.id)
  return (
    <Card>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.descr}</Card.Text>
        <Button onClick={openAd} variant="primary">
          {props.btnText}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default AdCard
