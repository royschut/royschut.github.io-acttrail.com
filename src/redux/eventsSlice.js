import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../data/Constants";

//ASYNC
export const fetchEvents = createAsyncThunk(
  "artists/fetchEvents",
  async (team_id) => {
    const res = await axios.get(URL.R_EVENTS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const newEvent = createAsyncThunk(
  "artists/newEvent",
  async (payload) => {
    const res = await axios.get(
      URL.C_EVENT + payload.name + "&team_id=" + payload.team_id
    );
    if (res.data) return { ...payload, id: res.data };
  }
);
export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    allIds: [],
    status: "",
    error: "",
  },
  reducers: {
    newEvent: (state, id, name) => {
      state.list[id] = { id: id, name: name };
      state.allIds.push(id);
    },
  },
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = [];
      action.payload.forEach((event, i) => {
        arr[event.id] = event;
        state.allIds.push(event.id);
      });
      state.list = arr;
    },
    [newEvent.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.list.push({ ...action.payload });
    },
  },
});
export default eventsSlice.reducer;

//ACTIONS
// export const { newEvent } = eventsSlice.actions;

//SELECTORS
export const selectEventList = (state) => state.events.list;
export const selectEventById = (state, id) =>
  state.events.list.find((event) => event.id === id);
