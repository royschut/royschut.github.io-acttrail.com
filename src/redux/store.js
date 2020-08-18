import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import artistReducer from "./artistsSlice";
import eventReducer from "./eventsSlice";
import bookingReducer from "./bookingsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    artists: artistReducer,
    events: eventReducer,
    bookings: bookingReducer,
  },
});
