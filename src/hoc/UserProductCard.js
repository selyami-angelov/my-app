import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
const UserProductCard = ({ children }) => {
  const navigate = useNavigate()

  const handleOnEditClick = () => {
    navigate(`/edit-product/${children.props.id}`)
  }

  return (
    <article>
      {children}
      <article>
        <Button onClick={handleOnEditClick} variant="outline-dark">
          Редактирай
        </Button>
        <Button variant="outline-dark">Dark</Button>
      </article>
    </article>
  )
}

export default UserProductCard
