import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth, providers } from '../configs/firebase-config'

export const register = async (email, password, dispatch, navigate, setErr) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    const errorMessage = error.message
    if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
      setErr({ errMessage: 'Имейл   адресът вече съществува!', show: true })
    }
    if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
      setErr({ errMessage: 'Невалиден имейл адрес!', show: true })
    }
  }
}

export const login = async (email, password, dispatch, navigate, setErr) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    console.log(error.message, 'err message')
    if (
      error.message === 'Firebase: Error (auth/invalid-email).' ||
      error.message === 'Firebase: Error (auth/user-not-found).'
    ) {
      setErr({ errMessage: 'Невалиден имейл или папрола!', show: true })
    }
    if (error.message === 'Firebase: Error (auth/wrong-password).') {
      setErr({ errMessage: 'Неправилна парола!', show: true })
    }
  }
}

export const googleLogin = async (dispatch, navigate, setErr) => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    dispatch({ type: 'LOGIN', payload: result.user })
    navigate('/')
  } catch (error) {
    setErr(error.message)
  }
}

export const facebookLogin = async (
  dispatch,
  navigate,
  setOnPaswordPrompData,
  setOnSignConfirmData,
  setErr
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
        setErr({ errMessage: error.message, show: true })
      }
    }
  }
}
