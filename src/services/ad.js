import { doc, setDoc, getDocs } from 'firebase/firestore'
import { db } from '../configs/firebase-config.js'
import { collection } from 'firebase/firestore'

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
