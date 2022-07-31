import {
  collection,
  doc,
  getDocs,
  setDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'

export const createAd = (data) => {
  const productsRef = doc(collection(db, 'ads'))
  setDoc(productsRef, data)
}

export const getAds = async (setAds) => {
  const querySnapshot = await getDocs(collection(db, 'ads'))

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
  setAds(products)
}

export const getAd = async (id) => {
  const docRef = doc(db, 'ads', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    console.log('No such document!')
  }
}

export const updateProduct = async (id, data) => {
  const docRef = doc(db, 'ads', id)
  await updateDoc(docRef, data)
}

export const getProductsQuery = async (field, contains) => {
  const productsRef = collection(db, 'ads')
  console.log(productsRef)
  const q = query(productsRef, where(field, '==', contains))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
}
