import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext.js'
import PasswordPromp from '../../components/PasswordPromp/PasswordPromp.js'
import SignOnConfirmProp from '../../components/SignOnConfirmProp/SignOnConfirmProp.js'
import { Card } from 'react-bootstrap'
import styles from './login-register.module.css'
import Nav from 'react-bootstrap/Nav'
import Footer from '../../components/Footer/Footer.js'
import {
  googleLogin,
  login,
  register,
  facebookLogin,
} from '../../services/auth.js'
import useErrorStrip from '../../hook/useErrorStrip.js'

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

  const navigate = useNavigate()
  const errorStrip = useErrorStrip()
  const { dispatch } = useContext(AuthContext)

  const handleRegister = (e) => {
    e.preventDefault()
    register(form.email, form.password, dispatch, navigate)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(form.email, form.password, dispatch, navigate)
  }

  const handleGoogleLogin = () => {
    googleLogin(dispatch, navigate)
  }

  const handleFacebookLogin = (e) => {
    e.preventDefault()
    facebookLogin(
      dispatch,
      navigate,
      setOnPaswordPrompData,
      setOnSignConfirmData
    )
  }

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
                Вход
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={styles['nav-item']}
                onClick={() => setIsLogin(false)}
                eventKey="link-2"
              >
                Регистрация
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className={`d-grid gap-2 ${styles['social-buttons-container']}`}>
            <Button
              onClick={handleFacebookLogin}
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
              onClick={handleGoogleLogin}
              className={styles['social-button']}
              variant="outline-dark"
              size="lg"
            >
              <i className={`fa-brands fa-google ${styles.google}`}></i>
              <label>Вход с Google</label>
            </Button>
          </div>
          <div className={styles['or-label']}>
            <span>или</span>
          </div>
          <Form className={styles['form']}>
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
                Чрез натискане на бутона за Регистрация приемам Общите условия
                за използване на платформата.
              </Form.Label>
            )}
          </Form>
          <div className={`d-grid gap-2 ${styles['log-button']}`}>
            <Button
              onClick={isLogin ? handleLogin : handleRegister}
              variant="dark"
              size="lg"
            >
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
        </Card>
      </main>
      <Footer />
      {errorStrip}
    </>
  )
}

export default LoginPage
