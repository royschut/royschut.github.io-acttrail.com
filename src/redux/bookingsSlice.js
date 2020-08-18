import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../data/Constants";

//ASYNC
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (team_id) => {
    const res = await axios.get(URL.R_BOOKINGS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const newBooking = createAsyncThunk(
  "bookings/newBooking",
  async (payload) => {
    const res = await axios.get(
      URL.C_BOOKING + payload.artist_id + "&event_id=" + payload.event_id
    );
    console.log("and?", res);
    if (res.data) return { ...payload, id: res.data };
  }
);
export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
    allIds: [],
    status: "",
    error: "",
  },
  reducers: {
    newBooking: (state, action) => {
      console.log(action.payload);
      // state.list.push({ ...action.payload });
    },
  },
  extraReducers: {
    [fetchBookings.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchBookings.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = [];
      action.payload.forEach((booking, i) => {
        arr[booking.id] = booking;
        state.allIds.push(booking.id);
      });
      state.list = arr;
    },
    [fetchBookings.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [newBooking.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("succes?", action.payload);
      state.list.push({ ...action.payload });
    },
  },
});
export default bookingsSlice.reducer;

//ACTIONS
// export const { newBooking } = bookingsSlice.actions;

//SELECTORS
export const selectBookingList = (state) => state.bookings.list;
export const selectBookingById = (state, id) =>
  state.bookings.list.find((booking) => booking.id === id);
