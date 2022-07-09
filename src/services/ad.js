import { doc, setDoc } from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

export const createAd = async (data) => {
  //const adsRef = doc(db, 'adds')
  //const result = await setDoc(adsRef, data)

  const newCityRef = doc(collection(db, 'adds'))

  // later...
  await setDoc(newCityRef, data)
}
