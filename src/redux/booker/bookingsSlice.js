import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL_BOOKER as URL } from "../../data/Constants";

//ASYNC
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (team_id) => {
    const res = await axios.get(URL.R_BOOKINGS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const fetchBookingsForArtist = createAsyncThunk(
  "events/fetchBookingsForArtist",
  async (artist_id) => {
    const res = await axios.get(URL.R_BOOKINGS_FORARTIST + artist_id);
    if (res.data.success) return res.data.data;
  }
);
export const newBooking = createAsyncThunk(
  "bookings/newBooking",
  async (payload) => {
    const res = await axios.get(
      URL.C_BOOKING + payload.artist_id + "&event_id=" + payload.event_id
    );
    if (res.data.success) return { ...payload, id: res.data.data };
  }
);
export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (payload) => {
    const res = await axios.get(URL.D_BOOKING + payload.booking_id);
    // console.log("delete succes?", res);
    if (res.data.success) return { ...payload };
  }
);
export const loadBookingDetails = createAsyncThunk(
  "bookings/loadBookingDetails",
  async (payload) => {
    const res = await axios.get(URL.R_BOOKING + payload);
    // console.log("Bookign details?", res, payload);
    if (res.data.success) return res.data.data[0];
  }
);
export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (payload) => {
    const res = await axios.post(URL.U_BOOKING, JSON.stringify(payload));
    // console.log("update, esult: ", payload, res);
    if (res.data.success) return { ...payload };
  }
);
export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    allIds: [],
    status: "",
    error: "",
    curID: undefined,
  },
  reducers: {
    setCurBookingID: (state, action) => {
      state.curID = action.payload;
    },
  },
  extraReducers: {
    [fetchBookings.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBookings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        let arr = [];
        action.payload.forEach((booking, i) => {
          arr[booking.id] = booking;
          state.allIds.push(booking.id);
        });
        state.list = arr;
      }
    },
    [fetchBookings.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchBookingsForArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = [];
      action.payload.forEach((booking, i) => {
        arr[booking.id] = booking;
        state.allIds.push(booking.id);
      });
      state.list = arr;
    },
    [newBooking.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // console.log("succes?", action.payload);
      state.list.push({ ...action.payload });
    },
    [loadBookingDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "succeeded";
        let arr = state.list.slice();
        // console.log("succes", action.payload);
        arr[action.payload.id] = {
          ...state.list[action.payload.id],
          ...action.payload,
          isDetailsLoaded: true, //todo:check
        };
        state.list = arr;
      }
    },
    [updateBooking.fulfilled]: (state, action) => {
      let arr = state.list.slice();
      arr[action.payload.id] = {
        ...arr[action.payload.id],
        ...action.payload,
      };
      state.list = arr;
      // console.log("succes!");
    },
  },
});
export default bookingsSlice.reducer;

//ACTIONS
export const { setCurBookingID } = bookingsSlice.actions;

//SELECTORS
export const selectBookingList = (state) => state.bookings.list;
export const selectCurBookingID = (state) => state.bookings.curID;
export const selectCurBooking = (state) =>
  state.bookings.list[state.bookings.curID];
export const selectIsCurBookingDetailsLoaded = (state) =>
  state.bookings.list[state.bookings.curID].isDetailsLoaded;
