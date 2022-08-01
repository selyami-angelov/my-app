import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'

const userColectionRef = collection(db, 'users')

export const getUsers = async () => {
  const data = await getDocs(userColectionRef)

  console.log(data.docs.map((doc) => ({ ...doc.data() })))
}

export const getUserDoc = async (userId) => {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return 'No such document!'
  }
}

export const createUserDoc = (userId, data) => {
  const ref = doc(db, 'users', userId)
  setDoc(ref, data)
}

export const updateUserDoc = async (userId, data) => {
  const ref = doc(db, 'users', userId)
  await updateDoc(ref, data)
}
