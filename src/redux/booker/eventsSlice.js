import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

import { CRUD_URL, URL_BOOKER as URL } from "../../data/Constants";

//ASYNC
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (team_id) => {
    const res = await axios.get(URL.R_EVENTS + team_id);
    if (res.data.success) return res.data.data;
  }
);
export const fetchEventsForArtist = createAsyncThunk(
  "events/fetchEventsForArtist",
  async (artist_id) => {
    const res = await axios.get(URL.R_EVENTS_FORARTIST + artist_id);
    console.log("res", res);
    if (res.data.success) return res.data.data;
  }
);
export const newEvent = createAsyncThunk("events/newEvent", async (payload) => {
  const res = await axios.get(
    URL.C_EVENT + payload.name + "&team_id=" + payload.team_id
  );
  if (res.data) return { ...payload, id: res.data };
});
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async (payload) => {
    // console.log("update", payload);
    const res = await axios.post(URL.U_EVENT, JSON.stringify(payload));
    if (res.data) return { ...payload };
  }
);
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (payload) => {
    const res = await axios.post(URL.D_EVENT, JSON.stringify(payload));
    if (res.data) return { ...payload };
  }
);
export const uploadPic = createAsyncThunk(
  "events/uploadPicEvent",
  async (formData) => {
    const res = await axios.post(URL.UPLOADPIC_EVENT, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) return res.data.data;
  }
);
export const crudVenue = createAsyncThunk(
  "events/crudVenue",
  async (payload) => {
    let res = "";
    const url = CRUD_URL(payload.crud, "venue");
    switch (payload.crud) {
      case "c":
        res = await axios.get(url + "&event_id=" + payload.event_id + "&name=");
        break;
      case "r":
        res = await axios.get(url + "&id=" + payload.event_id);
        break;
      case "u":
        res = await axios.post(url, JSON.stringify(payload.obj));
        break;
      default:
        break;
    }
    if (res.data.success) return res.data.data;
  }
);
export const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    allIds: [],
    status: "",
    error: "",
    curID: undefined,
  },
  reducers: {
    setCurEventID: (state, action) => {
      state.curID = action.payload;
    },
  },
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        let arr = [];
        action.payload.forEach((event, i) => {
          arr[event.id] = event;
          state.allIds.push(event.id);
        });
        state.list = arr;
      }
    },
    [fetchEventsForArtist.fulfilled]: (state, action) => {
      state.status = "succeeded";
      if (action.payload) {
        let arr = [];
        action.payload.forEach((event, i) => {
          arr[event.id] = event;
          state.allIds.push(event.id);
        });
        // console.log(arr);
        state.list = arr;
      }
    },
    [newEvent.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.list.push({ ...action.payload });
    },
    [updateEvent.fulfilled]: (state, action) => {
      let arr = state.list.slice();
      arr[action.payload.id] = {
        ...arr[action.payload.id],
        ...action.payload,
      };
      state.list = arr;
    },
    [deleteEvent.fulfilled]: (state, action) => {
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
    [crudVenue.fulfilled]: (state, action) => {
      state.list[state.curID].isVenueLoaded = true;
      if (action.payload) {
        switch (action.meta.arg.crud) {
          case "c":
            state.list[state.curID].venue_id = action.payload;
            state.list[state.curID].venue = { id: action.payload };
            break;
          case "r":
            state.list[state.curID].venue = {
              ...state.list[state.curID].venue,
              ...action.payload[0],
            };
            break;
          case "u":
            // console.log("pl->", action.meta.arg.obj);
            state.list[state.curID].venue = {
              ...state.list[state.curID].venue,
              ...action.meta.arg.obj,
            };
            break;
          default: break;
        }
      }
    },
  },
});
export default eventsSlice.reducer;

//ACTIONS
export const { setCurEventID } = eventsSlice.actions;

//SELECTORS
export const selectEventList = (state) => state.events.list;
export const selectCurEventID = (state) => state.events.curID;
export const selectCurEvent = (state) => state.events.list[state.events.curID];

export const isVenueCurEventLoaded = createSelector(
  [selectCurEvent],
  (curEvent) => (curEvent ? curEvent.isVenueLoaded : false)
);
export const selectVenueForCurEvent = createSelector(
  [selectCurEvent, isVenueCurEventLoaded],
  (curEvent, isVenueLoaded) =>
    curEvent && isVenueLoaded && curEvent.venue ? curEvent.venue : {}
);
