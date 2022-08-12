import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import { getUserDoc } from '../services/user.js'

const useFollowedProducts = () => {
  const { currentUser } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [triggerReq, setTriggerReq] = useState(false)

  useEffect(() => {
    if (currentUser) {
      getUserDoc(currentUser?.uid).then((result) => {
        if (result !== 'No such document!') {
          setProducts(result.followed)
        }
      })
    }
  }, [triggerReq])

  const handleFollowClick = () => {
    setTimeout(() => {
      setTriggerReq((prev) => !prev)
    }, 100)
  }
  useEffect(() => {
    window.addEventListener('follow', handleFollowClick)
    return () => {
      window.removeEventListener('follow', handleFollowClick)
    }
  }, [])

  return products
}

export default useFollowedProducts
