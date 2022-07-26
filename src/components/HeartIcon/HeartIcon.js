import styles from './HeartIcon.module.css'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const HeartIcon = () => {
  const clickHeartIcon = (e) => {
    e.stopPropagation()
  }

  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>Наблюдавай</Tooltip>}>
      <article onClick={clickHeartIcon} className={styles['heart-icon']}>
        <i className="fa-regular fa-heart"></i>
      </article>
    </OverlayTrigger>
  )
}

export default HeartIcon
