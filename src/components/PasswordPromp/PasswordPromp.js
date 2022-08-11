import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { signInWithEmailAndPassword, linkWithCredential } from 'firebase/auth'

const PasswordPromp = (props) => {
  const { auth, email, credentials, open } = props
  const [show, setShow] = useState(false)
  const [password, setPassword] = useState('')
  const handleClose = () => setShow(false)

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const prompForPassAndSign = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        linkWithCredential(result.user, credentials)
        dispatch({ type: 'LOGIN', payload: result.user })
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    setShow(open)
  }, [props])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Моля въведете парола</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Парола"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={prompForPassAndSign}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PasswordPromp
