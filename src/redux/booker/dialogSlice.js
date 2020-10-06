import { createSlice } from "@reduxjs/toolkit";

//ASYNC

//SLICER
export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    request: "",
    title: "",
    payload: {},
  },
  // const dialogSubmitTexts = ["", "Create", "Create", "Delete", "Delete"];

  reducers: {
    requestNewBooker: (state, action) => {
      state.request = "newBooker";
      state.title = "Invite new Booker";
      state.description =
        "Note: New booker should make an Acttrail account first!";
      state.payload = { team_id: action.payload.team_id };
    },
    answerNewBooker: (state, action) => {
      // console.log(">>", action);
      state.answer = action.payload.message;
      state.title = "Invite new booker";
      if (action.payload.success) {
        state.payload = action.payload.data["invitecode"];
      } else if (action.payload.errorcode === 3) {
        state.payload = action.payload.data;
      } else {
        state.payload = "";
      }
    },
    requestNewArtist: (state, action) => {
      state.request = "newArtist";
      state.title = "New Artist";
      state.payload = { team_id: action.payload.team_id };
    },
    requestNewEvent: (state, action) => {
      state.request = "newEvent";
      state.title = "New Event";
      state.payload = { team_id: action.payload.team_id };
    },
    requestNewBookingForArtist: (state, action) => {
      state.request = "newBookingForArtist";
      state.title = "New Booking";
      state.payload = { artist_id: action.payload.artist_id };
    },
    requestNewBookingForEvent: (state, action) => {
      state.request = "newBookingForEvent";
      state.title = "New Booking";
      state.payload = { event_id: action.payload.event_id };
    },
    requestDeleteArtist: (state, action) => {
      state.request = "deleteArtist";
      state.title = "Delete Artist";
      state.payload = { id: action.payload.id };
    },
    requestDeleteEvent: (state, action) => {
      state.request = "deleteEvent";
      state.title = "Delete Event";
      state.payload = { id: action.payload.id };
    },
    requestDeleteBooking: (state, action) => {
      state.request = "deleteBooking";
      state.title = "Delete Booking";
      state.payload = { id: action.payload.id };
    },
    requestUploadPicArtist: (state, action) => {
      state.request = "uploadPicArtist";
      state.description = "";
    },
    requestUploadPicEvent: (state, action) => {
      state.request = "uploadPicEvent";
      state.title = "Upload event picture";
    },
    endRequest: (state) => {
      state.request = state.title = state.description = state.answer = "";
      state.payload = {};
      console.log("reset");
    },
  },
});

//ACTIONS
export const {
  requestNewBooker,
  answerNewBooker,
  requestNewArtist,
  requestNewEvent,
  requestNewBookingForArtist,
  requestNewBookingForEvent,
  requestDeleteArtist,
  requestDeleteEvent,
  requestDeleteBooking,
  requestUploadPicArtist,
  requestUploadPicEvent,
  endRequest,
  dialogSubmit,
} = dialogSlice.actions;

//SELECTORS
export const selectIsDialogActive = (state) =>
  state.dialog.request || state.dialog.answer ? true : false;
export const selectDialogTitle = (state) => state.dialog.title;
export const selectDialogRequest = (state) => state.dialog.request;
export const selectDialogPayload = (state) => state.dialog.payload;
export const selectDialogDescr = (state) => state.dialog.description;
export const selectDialogAnswer = (state) => state.dialog.answer;
export default dialogSlice.reducer;
