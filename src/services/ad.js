import { collection, doc, getDocs, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'

export const createAd = (data) => {
  const addsRef = doc(collection(db, 'ads'))
  setDoc(addsRef, data)
}

export const getAds = async (setAds) => {
  const querySnapshot = await getDocs(collection(db, 'ads'))

  const ads = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }))

  setAds(ads)
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
