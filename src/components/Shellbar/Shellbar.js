import React, { useContext, useEffect } from 'react'
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

const ShellBar = (props) => {
  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)
  const { currentUser } = useContext(AuthContext)
  const [followed, setFollowed] = useFollowedProducts()
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

  useEffect(() => {
    console.log(followed, 'followed')
  }, [followed])

  return (
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
            <Nav.Link className={styles['followed-products']}>
              <i className={`fa-regular fa-heart ${styles['heart-icon']}`}></i>
              <Badge className={styles['badge']} bg="primary">
                {followed?.length}
              </Badge>
            </Nav.Link>
            <Nav.Link href="/user-products">Моите обяви</Nav.Link>
            <Button
              onClick={() => navigate('/create-ad')}
              variant="outline-light"
            >
              Добави обява
            </Button>
            {currentUser && (
              <Button onClick={logOut} variant="outline-light">
                Изход
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ShellBar
