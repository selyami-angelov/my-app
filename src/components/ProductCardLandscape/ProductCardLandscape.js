import { useNavigate } from 'react-router'
import styles from './ProductCardLandscape.module.css'
import HeartIcon from '../HeartIcon/HeartIcon.js'
import { Badge } from 'react-bootstrap'

const ProductCardLandscape = (props) => {
  const {
    url,
    title,
    price,
    currency,
    region,
    city,
    id,
    category,
    subCategory,
  } = props
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
          <article>
            <article className={styles['badges-container']}>
              <h6>
                <Badge bg="secondary">{category}</Badge>
              </h6>
              <h6>
                <Badge bg="secondary">{subCategory}</Badge>
              </h6>
            </article>
            <article className={styles['location']}>
              <i className="fa-solid fa-location-dot"></i>{' '}
              <label>
                гр. {city}, Област {region}
              </label>
            </article>
          </article>
          <HeartIcon productId={id} />
        </article>
      </article>
    </article>
  )
}

export default ProductCardLandscape
