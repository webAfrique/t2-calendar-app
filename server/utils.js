import { db } from "./firebase";
import { setInitialState } from "../client/src/features/calendarSlice";
import {
  getDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  setDoc,
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

//save the first calendar settings to the database (create a document)
export const saveSettings = async (calendarSettings, uid, calendarID) => {
  const docRef = doc(db, "calendars", calendarID);
  const payload = calendarSettings;

  await setDoc(docRef, { ...payload, userID: uid });
};
