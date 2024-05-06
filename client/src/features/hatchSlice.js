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
  },
});

export default hatchesSlice.reducer;
//export actions as named export
export const { setHatchObjects, titleSet, textSet, widthSet, heightSet } =
  hatchesSlice.actions;
