import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.js'
import {
  createUserDoc,
  getFollowedProducts,
  updateUserDoc,
} from '../services/userData.js'

const useFollowedProducts = () => {
  const { currentUser } = useContext(AuthContext)
  const [products, setProducts] = useState(undefined)

  useEffect(() => {
    getFollowedProducts(currentUser.uid).then((result) => {
      if (result === 'No such document!') {
        createUserDoc(currentUser.uid, { followed: [] })
        return
      }
      setProducts(result.followed)
    })
  }, [])

  useEffect(() => {
    if (products) {
      updateUserDoc(currentUser.uid, { followed: products })
    }
  }, [products])

  return [products, setProducts]
}

export default useFollowedProducts
