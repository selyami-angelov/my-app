import styles from './HeartIcon.module.css'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { useContext, useEffect, useState } from 'react'
import { getUserDoc, updateUserDoc } from '../../services/user.js'
import { AuthContext } from '../../context/AuthContext.js'
import { useNavigate } from 'react-router'
import IsOwnProduct from '../../hoc/IsOwnProduct.js'

const HeartIcon = (props) => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [followed, setFollowed] = useState([])
  const [iconType, setIconType] = useState({
    className: 'fa-regular fa-heart',
    color: '',
  })

  const clickHeartIcon = (e) => {
    e.stopPropagation()
    if (currentUser) {
      getUserDoc(currentUser?.uid).then((result) => {
        if (result.followed?.includes(props?.productId)) {
          setIconType({ className: 'fa-regular fa-heart', color: '' })
          updateUserDoc(currentUser?.uid, {
            followed: result.followed.filter((id) => id !== props?.productId),
          })
          setFollowed(result.followed.filter((id) => id !== props?.productId))
        } else {
          setIconType({ className: 'fa-solid fa-heart', color: '#002f34' })
          updateUserDoc(currentUser?.uid, {
            followed: [...result.followed, props?.productId],
          })
          setFollowed([...result.followed, props?.productId])
        }

        const follow = new Event('follow')
        window.dispatchEvent(follow)
      })
    }
  }

  useEffect(() => {
    if (currentUser) {
      getUserDoc(currentUser?.uid).then((result) => {
        if (result === 'No such document!') {
          setFollowed([])
        } else {
          setFollowed(result.followed)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (followed?.includes(props.productId)) {
      setIconType({ className: 'fa-solid fa-heart', color: '#002f34' })
    } else {
      setIconType({ className: 'fa-regular fa-heart', color: '' })
    }
  }, [followed])

  return (
    <IsOwnProduct>
      <OverlayTrigger
        userId={props.userId}
        placement="top"
        overlay={<Tooltip>Наблюдавай</Tooltip>}
      >
        <article
          onClick={currentUser ? clickHeartIcon : () => navigate('/login')}
          className={styles['heart-icon']}
        >
          <i
            style={{ color: iconType.color, ...props.style }}
            className={iconType.className}
          ></i>
        </article>
      </OverlayTrigger>
    </IsOwnProduct>
  )
}

export default HeartIcon
