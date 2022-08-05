import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth, providers } from '../configs/firebase-config'
import { riseAuthError } from './events.js'

export const register = async (email, password, dispatch, navigate) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    riseAuthError(error)
  }
}

export const login = async (email, password, dispatch, navigate) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    riseAuthError(error)
  }
}

export const googleLogin = async (dispatch, navigate) => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    riseAuthError(error)
  }
}

export const facebookLogin = async (
  dispatch,
  navigate,
  setOnPaswordPrompData,
  setOnSignConfirmData
) => {
  const provider = new FacebookAuthProvider()
  provider.setCustomParameters({
    display: 'popup',
  })

  try {
    const result = await signInWithPopup(auth, provider)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    if (error.code === 'auth/account-exists-with-different-credential') {
      const credentials = FacebookAuthProvider.credentialFromError(error)
      const email = error.customData.email

      try {
        const methods = await fetchSignInMethodsForEmail(auth, email)
        if (methods[0] === 'password') {
          setOnPaswordPrompData({
            auth,
            email,
            credentials,
            open: true,
          })
          return
        }

        const provider = providers[methods[0]]
        setOnSignConfirmData({
          auth,
          provider,
          credentials,
          open: true,
        })
      } catch (error) {
        riseAuthError(error)
      }
    } else {
      riseAuthError(error)
    }
  }
}
