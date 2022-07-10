import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import dogImg from '../../images/dog-img.png'

const AdCard = (props) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.img} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.descr}</Card.Text>
        <Button variant="primary">{props.btnText}</Button>
      </Card.Body>
    </Card>
  )
}

export default AdCard
