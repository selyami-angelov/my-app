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
        <Modal.Body>
          <Button
            style={{ fontWeight: 'bold' }}
            variant="primary"
            onClick={trigerSignWithPopup}
          >
            Продължи
          </Button>
          <label style={{ fontWeight: 'bold', marginLeft: '24px' }}>
            Моля, натиснете "Продължи", за вход!
          </label>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SignOnConfirmProp
