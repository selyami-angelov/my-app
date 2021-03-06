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
import { Card, Container } from 'react-bootstrap'
import styles from './login-register.module.css'
import Nav from 'react-bootstrap/Nav'
import Alert from 'react-bootstrap/Alert'
import Footer from '../../components/Footer/Footer.js'

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' })
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
          setErr({ errMessage: '?????????? ?????????????? ???????? ????????????????????!', show: true })
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
          setErr({ errMessage: '?????????????????? ?????????? ?????? ??????????????!', show: true })
        }
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setErr({ errMessage: '???????????????????? ????????????!', show: true })
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
      <main className={styles['main']}>
        <Card className={styles['card']}>
          <Nav
            className={styles['nav']}
            justify
            variant="tabs"
            defaultActiveKey="link-1"
          >
            <Nav.Item>
              <Nav.Link
                className={styles['nav-item']}
                onClick={() => setIsLogin(true)}
                eventKey="link-1"
                href="#"
              >
                ????????
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={styles['nav-item']}
                onClick={() => setIsLogin(false)}
                eventKey="link-2"
              >
                ??????????????????????
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className={`d-grid gap-2 ${styles['social-buttons-container']}`}>
            <Button
              onClick={fbLogin}
              className={styles['social-button']}
              variant="outline-dark"
              size="lg"
            >
              <i
                className={`fa-brands fa-facebook-square ${styles.facebook}`}
              ></i>
              <label>???????? ?? Facebook</label>
            </Button>
            <Button
              onClick={googleLogin}
              className={styles['social-button']}
              variant="outline-dark"
              size="lg"
            >
              <i className={`fa-brands fa-google ${styles.google}`}></i>
              <label>???????? ?? Google</label>
            </Button>
          </div>
          <div className={styles['or-label']}>
            <span>??????</span>
          </div>
          <Form className={styles['form']}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>??????????</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                value={form.email}
                type="email"
                placeholder="??????????"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>???????????? ????????????</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                value={form.password}
                type="password"
                placeholder="????????????"
              />
            </Form.Group>
            {!isLogin && (
              <Form.Label>
                ???????? ?????????????????? ???? ???????????? ???? ?????????????????????? ?????????????? ???????????? ??????????????
                ???? ???????????????????? ???? ??????????????????????.
              </Form.Label>
            )}
          </Form>
          <div className={`d-grid gap-2 ${styles['log-button']}`}>
            <Button
              onClick={isLogin ? login : register}
              variant="dark"
              size="lg"
            >
              {isLogin ? '????????' : '??????????????????????'}
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
        </Card>
      </main>
      <Footer />
      {err.show && (
        <Alert className={styles['err-strip']} variant="danger">
          {err.errMessage}
        </Alert>
      )}
    </>
  )
}

export default LoginPage
