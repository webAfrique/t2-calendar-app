import { createSlice } from "@reduxjs/toolkit";
import hatch from "./hatchObject";

//this calendar object is used in Firebase, left here for reference
//initial state
// const initialState = {
//   title: "",
//   styles: {
//     textAlign: "center",
//     fontFamily: "Roboto",
//     color: "black",
//     fontSize: 16,
//     textDecoration: "none",
//     fontWeight: "normal",
//     fontStyle: "normal",
//   },
//   dates: [],
//   calendarRange: [
//     {
//       startDate: "",
//       endDate: "",
//       key: "selection",
//     },
//   ],
//   background: {
//     color: "white",
//     imageURL: "",
//     fileName: "",
//     defaultImage: "",
//   },
//   shape: "Square",
// };

//create a slice
//first parameter is the slice name,
//second parameter is the initial state,
//third parameter is an object that contains the reducers

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {},
  reducers: {
    setInitialState(state, action) {
      return action.payload;
    },
    setCalendarID(state, action) {
      state.id = action.payload;
    },
    typedTitle: (state, action) => {
      state.title = action.payload;
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
      const startDate = new Date(action.payload.selection.startDate);
      const endDate = new Date(action.payload.selection.endDate);

      for (let date = startDate.getDate(); date <= endDate.getDate(); date++) {
        const updatedHatch = { ...hatch, number: date };
        dates.push(updatedHatch);
      }
      state.dates = dates;
      state.calendarRange = [
        {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          key: "selection",
        },
      ];
    },
    backgroundImageSet: (state, action) => {
      state.background.imageURL = action.payload;
    },
    backgroundImageDelete: (state) => {
      state.background.imageURL = "";
    },

    backgroundDefaultImageSet: (state, action) => {
      state.background.defaultImage = action.payload; //carousel default img set
    },
    backgroundDefaultImageDelete: (state) => {
      state.background.defaultImage = ""; //carousel default img delete
    },
    backgroundColorSet: (state, action) => {
      state.background.color = action.payload;
    },
    shapeSet: (state, action) => {
      state.shape = action.payload;
    },
    //actions regarding the hatch objects
    hatchWidthSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.width = value;
        }
      });
    },
    hatchHeightSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.height = value;
        }
      });
    },

    hatchTitleSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.title = value;
        }
      });
    },
    hatchTextSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.text = value;
        }
      });
    },

    //styles for hatch text and title are set in the same actions
    hatchAlignmentSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].textAlign = value;
        }
      });
    },
    hatchFontFamilySet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontFamily = value;
        }
      });
    },
    hatchColorSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].color = value;
        }
      });
    },
    hatchFontSizeSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontSize = value;
        }
      });
    },
    hatchTextDecorationSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].textDecoration =
            hatch[field].textDecoration === "underline" ? "none" : "underline";
        }
      });
    },
    hatchBoldSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontWeight =
            hatch[field].fontWeight === "bold" ? "normal" : "bold";
        }
      });
    },
    hatchItalicSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontStyle =
            hatch[field].fontStyle === "italic" ? "normal" : "italic";
        }
      });
    },
    hatchImageSet: (state, action) => {
      const { hatchNumber, url } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.image.url = url;
        }
      });
    },
    hatchImageDelete: (state, action) => {
      const { hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.image.url = "";
        }
      });
    },
    hatchVideoSet: (state, action) => {
      const { hatchNumber, url } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.video.url = url;
        }
      });
    },
    hatchVideoDelete: (state, action) => {
      const { hatchNumber } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.video.url = "";
        }
      });
    },
    updatePositions(state, action) {
      const { hatchNumber, position } = action.payload;
      state.dates.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.positions = position;
        }
      });
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
  backgroundImageDelete,
  backgroundDefaultImageSet, //export carousel default img set
  backgroundDefaultImageDelete, //export carousel default img delete
  shapeSet,
  setInitialState,
  setCalendarID,
  hatchAlignmentSet, //below hatch related actions
  hatchFontFamilySet,
  hatchColorSet,
  hatchFontSizeSet,
  hatchTextDecorationSet,
  hatchBoldSet,
  hatchItalicSet,
  hatchImageSet,
  hatchImageDelete,
  hatchVideoSet,
  hatchVideoDelete,
  hatchWidthSet,
  hatchHeightSet,
  hatchTitleSet,
  hatchTextSet,
  updatePositions,
} = calendarSlice.actions;
