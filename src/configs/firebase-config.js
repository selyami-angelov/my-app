import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.XLO_FIREBASE_API_KEY,
  authDomain: process.env.XLO_AUTH_DOMAIN,
  projectId: process.env.XLO_PROJECT_ID,
  storageBucket: process.env.XLO_STORAGE_BUCKET,
  messagingSenderId: process.env.XLO_MESSAGING_SENDER_ID,
  appId: process.env.XLO_APP_ID,
  measurementId: process.env.XLO_MEASUREMENT_ID,
}

XLO_MEASUREMENT_ID = G - NGTFVTE8Z6

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
