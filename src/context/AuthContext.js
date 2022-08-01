import { createContext, useEffect, useReducer } from 'react'
import { getUserDoc, createUserDoc } from '../services/userData.js'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem('user') || null),
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.currentUser))
  }, [state.currentUser])

  //create user doc if first login
  useEffect(() => {
    if (state.currentUser) {
      getUserDoc(state.currentUser?.uid).then((result) => {
        if (result === 'No such document!') {
          const userData = {
            userId: state.currentUser.uid,
            name: state.currentUser.displayName || '',
            email: state.currentUser.email,
            createdAt: state.currentUser.metadata.createdAt,
            lastLoginAt: state.currentUser.metadata.lastLoginAt,
            followed: [],
          }

          console.log(userData, 'result in context')
          createUserDoc(state.currentUser.uid, userData)
        }
      })
    }
    console.log(state.currentUser, 'user from context')
  }, [state.currentUser])

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
