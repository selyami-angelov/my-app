import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { deleteProduct, getAd } from '../services/ad.js'
import { deleteImages } from '../services/uploadImg.js'
const UserProductCard = ({ children }) => {
  const navigate = useNavigate()

  const handleOnEditClick = () => {
    navigate(`/edit-product/${children.props.id}`)
  }

  const handleRemove = () => {
    getAd(children.props.id).then((result) => {
      const productImages = result.images.map((img) => img.name)
      productImages.some((img) => img) && deleteImages(productImages)
      deleteProduct(children.props.id)
      navigate('/')
    })
  }

  return (
    <article>
      {children}
      <article>
        <Button onClick={handleOnEditClick} variant="outline-dark">
          Редактирай
        </Button>
        <Button onClick={handleRemove} variant="outline-dark">
          Премахни обявата
        </Button>
      </article>
    </article>
  )
}

export default UserProductCard
