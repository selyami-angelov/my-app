import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import { getUserDoc } from '../services/userData.js'

const useFollowedProducts = () => {
  const { currentUser } = useContext(AuthContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (currentUser) {
      getUserDoc(currentUser?.uid).then((result) => {
        if (result !== 'No such document!') {
          setProducts(result.followed)
        }
      })
    }
  }, [])

  return products
}

export default useFollowedProducts
