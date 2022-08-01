import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { auth, providers } from '../../configs/firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext.js'
import PasswordPromp from '../../components/PasswordPromp/PasswordPromp.js'
import SignOnConfirmProp from '../../components/SignOnConfirmProp/SignOnConfirmProp.js'
import { Container } from 'react-bootstrap'
import styles from './login-register.module.css'
import Nav from 'react-bootstrap/Nav'
import Alert from 'react-bootstrap/Alert'

const LoginPage = () => {
  const [form, setForm] = useState({ username: '', email: '' })
  const [onSignConfirmData, setOnSignConfirmData] = useState({
    auth: '',
    provider: '',
    credentials: '',
    open: false,
  })
  const [onPaswordPrompData, setOnPaswordPrompData] = useState({
    auth: '',
    email: '',
    provider: '',
    credentials: '',
    open: false,
  })
  const [isLogin, setIsLogin] = useState(true)
  const [err, setErr] = useState({ errMessage: '', show: false })

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const register = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        //SAVE TO LOCALE STORAGE
        dispatch({ type: 'LOGIN', payload: user })
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        //TODO:
        if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
          setErr({ errMessage: 'Имейл адресът вече съществува!', show: true })
        }
      })
  }

  const login = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        dispatch({ type: 'LOGIN', payload: userCredential.user })
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message)
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          setErr({ errMessage: 'Невалиден имейл или папрола!', show: true })
        }
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setErr({ errMessage: 'Неправилна парола!', show: true })
        }
      })
  }

  const fbLogin = (e) => {
    e.preventDefault()
    const provider = new FacebookAuthProvider()
    provider.setCustomParameters({
      display: 'popup',
    })

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        dispatch({ type: 'LOGIN', payload: user })
        navigate('/')
      })
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const credentials = FacebookAuthProvider.credentialFromError(error)
          const email = error.customData.email
          fetchSignInMethodsForEmail(auth, email).then((methods) => {
            if (methods[0] === 'password') {
              //TODO:
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
          })
        }
      })
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        dispatch({ type: 'LOGIN', payload: user })
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (err.show) {
      setTimeout(() => {
        setErr({ errMessage: '', show: false })
      }, 5000)
    }
  }, [err])

  return (
    <>
      <Container>
        <Nav
          className={styles['nav']}
          justify
          variant="tabs"
          defaultActiveKey="link-1"
        >
          <Nav.Item>
            <Nav.Link
              onClick={() => setIsLogin(true)}
              eventKey="link-1"
              href="#"
            >
              Вход
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => setIsLogin(false)} eventKey="link-2">
              Регистрация
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="d-grid gap-2">
          <Button
            onClick={fbLogin}
            className={styles['social-button']}
            variant="outline-dark"
            size="lg"
          >
            <i
              className={`fa-brands fa-facebook-square ${styles.facebook}`}
            ></i>
            <label>Вход с Facebook</label>
          </Button>
          <Button
            onClick={googleLogin}
            className={styles['social-button']}
            variant="outline-dark"
            size="lg"
          >
            <i className={`fa-brands fa-google ${styles.google}`}></i>
            <label>Вход с Google</label>
          </Button>
        </div>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Имейл</Form.Label>
            <Form.Control
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              value={form.email}
              type="email"
              placeholder="Имейл"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Въведи парола</Form.Label>
            <Form.Control
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
              value={form.password}
              type="password"
              placeholder="Парола"
            />
          </Form.Group>
          {!isLogin && (
            <Form.Label>
              Чрез натискане на бутона за Регистрация приемам Общите условия за
              използване на платформата.
            </Form.Label>
          )}
        </Form>
        <div className="d-grid gap-2">
          <Button onClick={isLogin ? login : register} variant="dark" size="lg">
            {isLogin ? 'Вход' : 'Регистрация'}
          </Button>
        </div>
        <SignOnConfirmProp
          open={onSignConfirmData.open}
          auth={onSignConfirmData.auth}
          provider={onSignConfirmData.provider}
          credentials={onSignConfirmData.credentials}
        />
        <PasswordPromp
          email={onPaswordPrompData.email}
          open={onPaswordPrompData.open}
          auth={onPaswordPrompData.auth}
          credentials={onPaswordPrompData.credentials}
        />
      </Container>
      {err.show && (
        <Alert className={styles['err-strip']} variant="danger">
          {err.errMessage}
        </Alert>
      )}
    </>
  )
}

export default LoginPage
