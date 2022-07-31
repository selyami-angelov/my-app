import styles from './HeartIcon.module.css'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import useFollowedProducts from '../../hook/useFollowedProducts.js'
import { useEffect, useState } from 'react'

const HeartIcon = (props) => {
  const [followedProducts, setFollowedProducts] = useFollowedProducts()
  const [iconType, setIconType] = useState({
    className: 'fa-regular fa-heart',
    color: '',
  })

  const clickHeartIcon = (e) => {
    e.stopPropagation()
    if (followedProducts.includes(props.productId)) {
      const newProducts = followedProducts.filter(
        (id) => id !== props.productId
      )
      setFollowedProducts(newProducts)
    } else {
      setFollowedProducts((prev) => [...prev, props.productId])
    }
  }

  useEffect(() => {
    if (followedProducts?.includes(props.productId)) {
      setIconType({ className: 'fa-solid fa-heart', color: 'black' })
    } else {
      setIconType({ className: 'fa-regular fa-heart', color: '' })
    }
  }, [followedProducts])

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Наблюдавай</Tooltip>}>
      <article onClick={clickHeartIcon} className={styles['heart-icon']}>
        <i style={{ color: iconType.color }} className={iconType.className}></i>
      </article>
    </OverlayTrigger>
  )
}

export default HeartIcon
