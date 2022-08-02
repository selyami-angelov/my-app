import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext.js'
import { deleteProduct, getAd } from '../services/ad.js'
import { deleteImages } from '../services/uploadImg.js'
import styles from './UserProductCard.module.css'
const UserProductCard = ({ children }) => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

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

  return currentUser?.uid === children.props?.userId ? (
    <article className={styles['container']}>
      {children}
      <article className={styles['buttons']}>
        <Button onClick={handleOnEditClick} variant="outline-dark">
          Редактирай
        </Button>
        <Button
          className={styles['link']}
          onClick={handleRemove}
          variant="link"
        >
          Премахни обявата
        </Button>
      </article>
    </article>
  ) : (
    children
  )
}

export default UserProductCard
