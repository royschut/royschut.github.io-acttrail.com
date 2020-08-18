import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL } from "../data/Constants";

//ASYNC
export const fetchArtists = createAsyncThunk(
  "artists/fetchArtists",
  async (team_id) => {
    const res = await axios.get(URL.R_ARTISTS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const newArtist = createAsyncThunk(
  "artists/newArtist",
  async (payload) => {
    const res = await axios.get(
      URL.C_ARTIST + payload.name + "&team_id=" + payload.team_id
    );
    if (res.data) return { ...payload, id: res.data };
  }
);

//SLICER
export const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    list: [],
    status: "",
    error: "",
  },
  reducers: {
    // newArtist: (state, action) => {
    //   state.list.push({ id: action.payload.id, name: action.payload.name });
    // },
  },
  extraReducers: {
    [fetchArtists.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchArtists.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = [];
      action.payload.forEach((artist, i) => {
        arr[artist.id] = artist;
      });
      state.list = arr;
    },
    [fetchArtists.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [newArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.list.push({ ...action.payload });
    },
  },
});
export default artistsSlice.reducer;

//ACTIONS
// export const { newArtist } = artistsSlice.actions;

//SELECTORS
export const selectArtistList = (state) => state.artists.list;
export const selectArtistById = (state, id) =>
  state.artists.list.find((artist) => artist.id === id);
