// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Storage
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getFirestore,
  getCountFromServer,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "t2-calendar-app.firebaseapp.com",
  projectId: "t2-calendar-app",
  storageBucket: "t2-calendar-app.appspot.com",
  messagingSenderId: "614500694476",
  appId: "1:614500694476:web:3d0fb575f181b1f0fc4569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); //export storage

//Get access to the project authentication
export const auth = getAuth(app);
// Get access to the project database
export const db = getFirestore(app);
// Get access to the collection

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const getUser = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs[0].data();
  return user;
};

export const getUserCount = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const totalCount = querySnapshot.size; // Use querySnapshot.size to get the count
    return totalCount;
  } catch (error) {
    console.log("Error fetching user count:", error);
    throw error; // Rethrow the error for error handling in the caller function
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};
