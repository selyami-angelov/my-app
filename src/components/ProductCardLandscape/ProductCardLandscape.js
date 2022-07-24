import styles from './ProductCardLandscape.module.css'

const ProductCardLandscape = (props) => {
  const { url, title, price, currency, location } = props

  console.log(props)

  return (
    <article className={styles['landscape-card']}>
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
          <label>гр. {location}</label>
        </article>
      </article>
    </article>
  )
}

export default ProductCardLandscape
