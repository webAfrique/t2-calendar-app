// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDocs, doc, deleteDoc, collection, query, where, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "t2-calendar-app.firebaseapp.com",
  projectId: "t2-calendar-app",
  storageBucket: "t2-calendar-app.appspot.com",
  messagingSenderId: "614500694476",
  appId: "1:614500694476:web:3d0fb575f181b1f0fc4569"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get access to the project authentication
export const auth = getAuth(app);
// Get access to the project database
export const db = getFirestore(app)

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const user = response.user
      await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name,
          authProvider: 'local',
          email
      })
  } catch (error) {
      console.log(error)
      alert(error.message)
  }
}

export const loginWithEmailAndPassword = async(email, password) => {
  try {
      await signInWithEmailAndPassword(auth, email, password)

  } catch (error) {
      console.log(error)
      alert(error.message)
  }

}

