import { configureStore, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

import userReducer from "./userSlice";

//Booker slices
import artistReducer, {
  selectArtistList,
  selectCurArtistID,
} from "./booker/artistsSlice";
import eventReducer, {
  selectCurEventID,
  selectEventList,
} from "./booker/eventsSlice";
import bookingReducer, {
  selectBookingList,
  selectCurBooking,
} from "./booker/bookingsSlice";
import dialogReducer from "./booker/dialogSlice";
import { months } from "../data/Constants";

export default configureStore({
  reducer: {
    user: userReducer,
    artists: artistReducer,
    events: eventReducer,
    bookings: bookingReducer,
    dialog: dialogReducer,
  },
});

axios.defaults.withCredentials = true; //Have to do it somewhere

//GENERAL SELECTORS
export const selectBookingsWithArtistsForCurEvent = createSelector(
  [selectBookingList, selectArtistList, selectCurEventID],
  (bookings, artists, curEventID) =>
    bookings
      .filter((b) => b.event_id === curEventID)
      .map((b) => {
        const a = artists[b.artist_id];
        //Format 'info'
        let inf = b.fee ? "€ " + b.fee + ",- " : "";
        inf += b.settype ? b.settype + " " : "";
        inf += b.day || b.area ? "(" : "";
        inf += b.day ? "Day " + b.day + " - " : "";
        inf += b.area ? b.area : "";
        inf += b.day || b.area ? ")" : "";
        const nB = { ...b, name: a.name, assetsrc: a.assetsrc, info: inf };
        return nB;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
);
export const selectBookingsWithEventsForCurArtist = createSelector(
  [selectBookingList, selectEventList, selectCurArtistID],
  (bookings, events, curArtistID) =>
    bookings
      .filter((b) => b.artist_id === curArtistID)
      .map((b) => {
        const e = events[b.event_id];
        let d = new Date(e.date);
        d = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        const nB = {
          ...b,
          name: e.name,
          assetsrc: e.assetsrc,
          date: e.date,
          dateFormatted: d,
        };
        return nB;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
);
export const selectCurBookingWithEvent = createSelector(
  [selectCurBooking, selectEventList],
  (b, events) =>
    b
      ? {
          ...b,
          name: events[b.event_id].name,
          assetsrc: events[b.event_id].assetsrc,
        }
      : {}
);
export const selectCurBookingWithArtist = createSelector(
  [selectCurBooking, selectArtistList],
  (b, artists) =>
    b
      ? {
          ...b,
          name: artists[b.artist_id].name,
          assetsrc: artists[b.artist_id].assetsrc,
        }
      : {}
);
export const selectAllBookingsWithEvents = createSelector(
  [selectBookingList, selectEventList],
  (bookings, events) =>
    bookings.map((b) => {
      const e = events[b.event_id];
      return { ...b, name: e.name, assetsrc: e.assetsrc, date: e.date };
    })
);
