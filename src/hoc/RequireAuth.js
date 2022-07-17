import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

export const RequireAuth = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  return currentUser ? children : <Navigate to={'/login'} />
}
