// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "t2-calendar-app.firebaseapp.com",
  projectId: "t2-calendar-app",
  storageBucket: "t2-calendar-app.appspot.com",
  messagingSenderId: "614500694476",
  appId: "1:614500694476:web:3d0fb575f181b1f0fc4569"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

