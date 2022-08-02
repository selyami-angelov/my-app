import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

const IsOwnProduct = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const userId = children.props?.userId

  return <>{currentUser?.uid !== userId ? children : <></>}</>
}

export default IsOwnProduct
