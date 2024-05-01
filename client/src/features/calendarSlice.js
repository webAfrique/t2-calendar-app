import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  calendarTitle: "",
  styles: {
    textAlign: "",
    fontFamily: "Roboto",
    color: "black",
    fontSize: 16,
    textDecoration: "none",
    fontWeight: "normal",
    fontStyle: "normal",
  },
  dates: [],
  background: {
    color: "white",
    imageURL: "",
    fileName: "",
  },
};

//create a slice
//first parameter is the slice name,
//second parameter is the initial state,
//third parameter is an object that contains the reducers
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    //action - individual state transitions
    typedTitle: (state, action) => {
      state.calendarTitle = action.payload;
    },
    alignmentSet: (state, action) => {
      state.styles.textAlign = action.payload;
    },
    fontFamilySet: (state, action) => {
      state.styles.fontFamily = action.payload;
    },
    colorSet: (state, action) => {
      state.styles.color = action.payload;
    },
    fontSizeSet: (state, action) => {
      state.styles.fontSize = action.payload;
    },
    textDecorationSet: (state) => {
      state.styles.textDecoration =
        state.styles.textDecoration === "underline" ? "none" : "underline";
    },
    boldSet: (state) => {
      state.styles.fontWeight =
        state.styles.fontWeight === "bold" ? "normal" : "bold";
    },
    italicSet: (state) => {
      state.styles.fontStyle =
        state.styles.fontStyle === "italic" ? "normal" : "italic";
    },
    datesSet: (state, action) => {
      const dates = [];
      const startDate = action.payload.selection.startDate.getDate();
      const endDate = action.payload.selection.endDate.getDate();

      for (let date = startDate; date <= endDate; date++) {
        dates.push(date);
      }
      state.styles.dates = dates;
      console.log("datesSet", state.styles.dates);
    },
    backgroundImageSet: (state, action) => {
      state.background.imageURL = action.payload;
    },
    backgroundImageDelete: (state) => {
      state.background.imageURL = "";
    },
    backgroundFileNameSet: (state, action) => {
      state.background.fileName = action.payload;
    },
    backgroundFileNameDelete: (state) => {
      state.background.fileName = "";
    },
    backgroundColorSet: (state, action) => {
      state.background.color = action.payload;
    },
  },
});

//export reducer as default export
export default calendarSlice.reducer;
//export actions as named export
export const {
  typedTitle,
  alignmentSet,
  fontFamilySet,
  colorSet,
  fontSizeSet,
  textDecorationSet,
  boldSet,
  italicSet,
  datesSet,
  backgroundImageSet,
  backgroundColorSet,
  backgroundFileNameSet,
  backgroundFileNameDelete,
  backgroundImageDelete,
} = calendarSlice.actions;
