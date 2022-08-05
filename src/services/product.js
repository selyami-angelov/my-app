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
  orderBy,
  limit,
} from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'

export const createProduct = (data) => {
  const productsRef = doc(collection(db, 'ads'))
  setDoc(productsRef, data)
}

export const getProductDoc = async (productId) => {
  const docRef = doc(db, 'ads', productId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, data: docSnap.data() }
  } else {
    console.log('No such document!')
  }
}

export const getProduct = async (id) => {
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

export const getLastCreatedProducts = async (quantity) => {
  const productsRef = collection(db, 'ads')
  const q = query(productsRef, orderBy('created_date', 'desc'), limit(quantity))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
}

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'ads', id))
}

//query
export const getProductsQuery = async (field, contains) => {
  const productsRef = collection(db, 'ads')
  const q = query(productsRef, where(field, '==', contains))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))
}
