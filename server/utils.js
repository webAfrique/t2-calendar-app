import { db } from "./firebase";
import { setInitialState } from "../client/src/features/calendarSlice";
import { getDoc, doc } from "firebase/firestore";

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
