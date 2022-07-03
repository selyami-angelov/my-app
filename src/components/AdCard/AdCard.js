import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import MyButton from '../Button/MyButton'
import dogImg from '../../images/dog-img.png'


const AdCard = (props) => {

  return (
    <Card >
      <Card.Img variant="top" src={dogImg} />
      <Card.Body>
        <Card.Title>Ad Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <MyButton variant="primary" buttonText={'Go somewhere'}></MyButton>
      </Card.Body>
    </Card>
  );
}

export default AdCard;