import { db } from "./firebase";
import { setInitialState } from "../client/src/features/calendarSlice";
import {
  getDoc,
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Get default settings for calendar menu from Firestore
export const getDefault = async (dispatch) => {
  const docRef = doc(db, "calendars", "defaultSettings");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const defaultSettings = docSnap.data();
    dispatch(setInitialState(defaultSettings));
    console.log("Document data:", defaultSettings);
  } else {
    console.log("No such document!");
  }
};

//save the first calendar settings to the database (create a document) and update the document if it already exists
export const saveSettings = async (calendarSettings, uid, calendarID) => {
  const docRef = doc(db, "calendars", calendarID);
  const payload = calendarSettings;

  await setDoc(docRef, { ...payload, userID: uid });
};

//get all user the calendars from the database
export const getExistingCalendars = async (uid) => {
  const collectionRef = collection(db, "calendars");
  const q = query(collectionRef, where("userID", "==", uid));
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return results;
};

//get specific user calendar from the database
export const getSpecificCalendars = async (calendarID) => {
  const collectionRef = collection(db, "calendars");
  const q = query(collectionRef, where("id", "==", calendarID));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    console.log("resultSpecific", doc.data());
    return doc.data();
  } else {
    console.log("No document found with id:", calendarID);
    return null;
  }
};
