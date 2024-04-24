import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



const firebaseConfig = {
  apiKey: "AIzaSyD73a-DkpJ0UR0j5i08JmP02PpLRLI9M6U",
  authDomain: "buymore-be174.firebaseapp.com",
  projectId: "buymore-be174",
  storageBucket: "buymore-be174.appspot.com",
  messagingSenderId: "273095879354",
  appId: "1:273095879354:web:4e6289c84dbc4ab9bdf083"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)