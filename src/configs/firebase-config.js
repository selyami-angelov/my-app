import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyB6B5fkTeIWVyKRMvdt-7UGcG2eP7nbhW0',
  authDomain: 'react---xlo.web.app',
  projectId: 'react---xlo',
  storageBucket: 'react---xlo.appspot.com',
  messagingSenderId: '547318856695',
  appId: '1:547318856695:web:e4f777c4393c8c276a0cf2',
  measurementId: 'G-NGTFVTE8Z6',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
