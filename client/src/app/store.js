import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../features/calendarSlice";

const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  },
});

export default store;
