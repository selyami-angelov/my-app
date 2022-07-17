import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/AuthContext.js'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { signInWithPopup, linkWithCredential } from 'firebase/auth'

const SignOnConfirmProp = (props) => {
  const { auth, credentials, open, provider } = props
  const [show, setShow] = useState(false)
  const close = () => setShow(false)

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const trigerSignWithPopup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        linkWithCredential(result.user, credentials)
        close()
        dispatch({ type: 'LOGIN', payload: result.user })
        navigate('/')
      })
      .catch((err) => {
        console.log(err, 'in errr')
      })
  }

  useEffect(() => {
    setShow(open)
  }, [props])

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={trigerSignWithPopup}>
            Continue
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SignOnConfirmProp
