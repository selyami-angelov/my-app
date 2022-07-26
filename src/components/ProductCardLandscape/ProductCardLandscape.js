import { useNavigate } from 'react-router'
import styles from './ProductCardLandscape.module.css'
import HeartIcon from '../HeartIcon/HeartIcon.js'

const ProductCardLandscape = (props) => {
  const { url, title, price, currency, city, id } = props
  const navigate = useNavigate()

  const openProduct = (e) => {
    navigate(`/product/${id}`)
  }

  return (
    <article onClick={openProduct} className={styles['landscape-card']}>
      <article className={styles['img-container']}>
        <img src={url} alt="product" />
      </article>
      <article className={styles['product-info']}>
        <article className={styles['card-header']}>
          <h4>{title}</h4>
          <h4>
            {price} {currency}
          </h4>
        </article>
        <article className={styles['card-footer']}>
          <label>гр. {city}</label>
          <HeartIcon />
        </article>
      </article>
    </article>
  )
}

export default ProductCardLandscape
