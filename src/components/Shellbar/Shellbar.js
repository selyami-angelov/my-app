import React, { useContext, useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../configs/firebase-config'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext.js'
import styles from './Shellbar.module.css'
import useFollowedProducts from '../../hook/useFollowedProducts.js'

const ShellBar = () => {
  const navigate = useNavigate()
  const [y, setY] = useState(0)
  const [showNav, setShowNav] = useState(true)
  const { dispatch } = useContext(AuthContext)
  const { currentUser } = useContext(AuthContext)
  const followed = useFollowedProducts()

  const controlVisivility = (e) => {
    const window = e.currentTarget
    if (y > window.scrollY) {
      //scroll up
      setShowNav(true)
    } else if (y < window.scrollY) {
      //scroll down
      setShowNav(false)
    }
    setY(window.scrollY)
  }

  useEffect(() => {
    setY(window.scrollY)

    window.addEventListener('scroll', (e) => controlVisivility(e))
  }, [y])

  useEffect(() => {
    window.addEventListener('scroll', (e) => controlVisivility(e))
    return () => {
      window.removeEventListener('scroll', (e) => controlVisivility(e))
    }
  }, [])

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div
      style={!showNav ? { opacity: 0 } : { opacity: 1 }}
      className={styles[`nav`]}
    >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className={styles['logo']} to="/">
              <h3>xlO</h3>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className={`justify-content-end flex-grow-1 ${styles['nav-bar']}`}
            >
              <Nav.Link
                href="/followed"
                className={styles['followed-products']}
              >
                <i
                  className={`fa-regular fa-heart ${styles['heart-icon']}`}
                ></i>
                <Badge className={styles['badge']} bg="primary">
                  {followed?.length}
                </Badge>
              </Nav.Link>
              <Button
                className={styles['variant-link']}
                variant="link"
                onClick={() =>
                  navigate('/user-products', {
                    state: { userId: currentUser.uid },
                  })
                }
              >
                Моите обяви
              </Button>
              <Button
                className={styles['create']}
                onClick={() => navigate('/create-ad')}
              >
                Добави обява
              </Button>
              {currentUser && (
                <Button
                  className={styles['variant-link']}
                  onClick={logOut}
                  variant="link"
                >
                  Изход
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default ShellBar
