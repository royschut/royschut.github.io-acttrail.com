import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL_BOOKER as URL } from "../../data/Constants";

//ASYNC
export const fetchArtists = createAsyncThunk(
  "artists/fetchArtists",
  async (team_id) => {
    const res = await axios.get(URL.R_ARTISTS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const fetchArtist = createAsyncThunk(
  "artists/fetchArtist",
  async (team_id) => {
    const res = await axios.get(URL.R_ARTIST + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const newArtist = createAsyncThunk(
  "artists/newArtist",
  async (payload) => {
    //todo: should be POST
    const res = await axios.get(
      URL.C_ARTIST + payload.name + "&team_id=" + payload.team_id
    );
    if (res.data.success) return { ...payload, id: res.data.data };
  }
);
export const updateArtist = createAsyncThunk(
  "artists/updateArtist",
  async (payload) => {
    const res = await axios.post(URL.U_ARTIST, JSON.stringify(payload));
    // console.log("update", res);
    if (res.data.success) return { ...payload };
  }
);
export const deleteArtist = createAsyncThunk(
  "artists/deleteArtist",
  async (payload) => {
    const res = await axios.post(URL.D_ARTIST, JSON.stringify(payload));
    if (res.data.success) return { ...payload };
  }
);
export const createArtistFee = createAsyncThunk(
  "artists/createArtistFee",
  async (payload) => {
    const res = await axios.post(
      URL.C_ARTISTFEE + payload.artist_id,
      JSON.stringify(payload)
    );
    if (res.data.success) return { ...payload, id: res.data.data };
  }
);
export const getArtistFee = createAsyncThunk(
  "artists/getArtistFee",
  async (payload) => {
    const res = await axios.get(URL.R_ARTISTFEE + payload.artist_id);
    if (res.data.success) return res.data.data;
  }
);
export const updateArtistFee = createAsyncThunk(
  "artists/updateArtistFee",
  async (payload) => {
    const res = await axios.post(URL.U_ARTISTFEE, JSON.stringify(payload));
    if (res.data.success) return { ...payload };
  }
);
export const uploadPic = createAsyncThunk(
  "artists/uploadPicEvent",
  async (formData) => {
    const res = await axios.post(URL.UPLOADPIC_ARTIST, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) return res.data.data;
  }
);
//SLICER
export const artistsSlice = createSlice({
  name: "artists",
  initialState: {
    list: [],
    status: "",
    error: "",
    curID: undefined,
  },
  reducers: {
    setCurArtistID: (state, action) => {
      state.curID = action.payload;
    },
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
    [fetchArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = [];
      action.payload.forEach((artist, i) => {
        arr[artist.id] = artist;
      });
      state.list = arr;
      // console.log("got", arr);
    },
    [newArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      let arr = state.list.slice();
      arr[action.payload.id] = { ...action.payload };
      state.list = arr;
    },
    [updateArtist.fulfilled]: (state, action) => {
      let arr = state.list.slice();
      arr[action.payload.id] = {
        ...arr[action.payload.id],
        ...action.payload,
      };
      state.list = arr;
    },
    [deleteArtist.fulfilled]: (state, action) => {
      console.log("delete full", action.payload, state.list);
      delete state.list[action.payload.id];
    },
    [uploadPic.fulfilled]: (state, action) => {
      if (action.payload) {
        const fd = action.meta.arg;
        let arr = state.list.slice();
        arr[fd.get("id")].assetsrc = action.payload.filename;
        state.list = arr;
      }
    },
    //ARTIST FEE
    [getArtistFee.fulfilled]: (state, action) => {
      if (action.payload)
        state.list[action.meta.arg.artist_id].fee = action.payload[0];
    },
    [createArtistFee.fulfilled]: (state, action) => {
      state.list[action.meta.arg.artist_id].fee = action.payload;
    },
    [updateArtistFee.fulfilled]: (state, action) => {
      state.list[action.payload.artist_id].fee = {
        ...state.list[action.payload.artist_id].fee,
        ...action.payload,
      };
    },
  },
});

//ACTIONS
export const { setCurArtistID } = artistsSlice.actions;

//SELECTORS
export const selectArtistList = (state) => state.artists.list;
export const selectCurArtistID = (state) => state.artists.curID;
export const selectCurArtist = (state) =>
  state.artists.list[state.artists.curID];

export default artistsSlice.reducer;
