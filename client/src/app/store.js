import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../features/calendarSlice";
import hatchesSlice from "../features/hatchSlice";

const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    hatches: hatchesSlice,
  },
});

export default store;
