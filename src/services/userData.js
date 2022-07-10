import { collection, getDocs } from 'firebase/firestore'
import { db } from '../configs/firebase-config'

const userColectionRef = collection(db, 'users')

export const getUsers = async () => {
  const data = await getDocs(userColectionRef)

  console.log(data.docs.map((doc) => ({ ...doc.data() })))
}
