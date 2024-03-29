import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

//prod
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

//dev
// const firebaseConfig = {
//   apiKey: 'AIzaSyAKML5f5uLvidhMIF-cI096JHofpOECs14',
//   authDomain: 'react--xlo-dev.firebaseapp.com',
//   projectId: 'react--xlo-dev',
//   storageBucket: 'react--xlo-dev.appspot.com',
//   messagingSenderId: '408138765253',
//   appId: '1:408138765253:web:3d07e2365cd8dcd5aab1ac',
// }

export const providers = {
  'google.com': new GoogleAuthProvider(),
  'facebook.com': new FacebookAuthProvider(),
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth()
