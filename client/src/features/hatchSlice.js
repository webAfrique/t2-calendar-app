import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hatchObjects: [],
};

const hatchesSlice = createSlice({
  name: "hatches",
  initialState,
  reducers: {
    setHatchObjects: (state, action) => {
      state.hatchObjects = action.payload;
    },

    widthSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.width = value;
        }
      });
    },
    heightSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.height = value;
        }
      });
    },

    titleSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.title = value;
        }
      });
    },
    textSet: (state, action) => {
      const { value, hatchNumber } = action.payload;
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch.text = value;
        }
      });
    },
    //styles for text and title are set in the same actions
    alignmentSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].textAlign = value;
        }
      });
    },
    fontFamilySet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontFamily = value;
        }
      });
    },
    colorSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].color = value;
        }
      });
    },
    fontSizeSet: (state, action) => {
      const { value, hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontSize = value;
        }
      });
    },
    textDecorationSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].textDecoration =
            hatch[field].textDecoration === "underline" ? "none" : "underline";
        }
      });
    },
    boldSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontWeight =
            hatch[field].fontWeight === "bold" ? "normal" : "bold";
        }
      });
    },
    italicSet: (state, action) => {
      const { hatchNumber, activeField } = action.payload;
      const field = activeField === "title" ? "titleStyles" : "textStyles";
      state.hatchObjects.forEach((hatch) => {
        if (hatch.number === hatchNumber) {
          hatch[field].fontStyle =
            hatch[field].fontStyle === "italic" ? "normal" : "italic";
        }
      });
    },
  },
});

export default hatchesSlice.reducer;
//export actions as named export
export const {
  setHatchObjects,
  titleSet,
  textSet,
  widthSet,
  heightSet,
  alignmentSet,
  fontFamilySet,
  colorSet,
  fontSizeSet,
  textDecorationSet,
  boldSet,
  italicSet,
} = hatchesSlice.actions;
