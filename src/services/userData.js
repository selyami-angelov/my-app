import { db } from '../configs/firebase-config'
import { getDocs, collection } from 'firebase/firestore'

const userColectionRef = collection(db, 'users')

export const getUsers = async () => {

    const data = await getDocs(userColectionRef)

    console.log(data.docs.map(doc => ({ ...doc.data() })))
}