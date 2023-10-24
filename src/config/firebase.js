
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA9BTdHUh_GCCcnIeGlp3bwRhhhCFTyVeg",
  authDomain: "fir-practice-no1.firebaseapp.com",
  projectId: "fir-practice-no1",
  storageBucket: "fir-practice-no1.appspot.com",
  messagingSenderId: "121587420609",
  appId: "1:121587420609:web:f5df4080d4707ce9f1f340",
  measurementId: "G-VNM135NEML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)