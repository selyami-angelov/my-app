import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import styles from './useErrorStrip.module.css'

const useErrorStrip = () => {
  const [err, setErr] = useState({})
  const handleError = (err) => {
    const errorMessage = err.detail.message
    console.log(err.detail.message, 'err')
    switch (errorMessage) {
      case 'Firebase: Error (auth/email-already-in-use).':
        setErr({ errMessage: 'Имейл адресът вече съществува!', show: true })
        break
      case 'Firebase: Error (auth/invalid-email).':
      case 'Firebase: Error (auth/user-not-found).':
        setErr({ errMessage: 'Невалиден имейл или папрола!', show: true })
        break
      case 'Firebase: Error (auth/wrong-password).':
        setErr({ errMessage: 'Неправилна парола!', show: true })
        break
      default:
        setErr({ errMessage: errorMessage, show: true })
        break
    }
  }
  useEffect(() => {
    window.addEventListener('error', handleError)
    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    if (err.show) {
      setTimeout(() => {
        setErr({ errMessage: '', show: false })
      }, 5000)
    }
  }, [err])

  return err.show ? (
    <Alert className={styles['err-strip']} variant="danger">
      {err.errMessage}
    </Alert>
  ) : (
    <></>
  )
}

export default useErrorStrip
