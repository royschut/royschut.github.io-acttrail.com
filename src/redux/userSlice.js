import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

import { URL_SIGN as URL_S } from "../data/Constants";
import { URL_BOOKER as URL } from "../data/Constants";

//ASYNC
export const signInUser = createAsyncThunk("user/signInUser", async (creds) => {
  const res = await axios.post(URL_S.SIGNIN, creds);
  if (res.data.success) return res.data.data;
});
export const checkSession = createAsyncThunk("user/checkSession", async () => {
  const res = await axios.post(URL_S.CHECKSESSION);
  if (res.data.success) return res.data.data;
});
export const logout = createAsyncThunk("user/logout", async () => {
  const res = await axios.post(URL_S.SIGNOUT);
  if (res.data.success) return res.data.data;
});
export const loadTeamDetails = createAsyncThunk(
  "user/loadTeamDetails",
  async (user_id) => {
    const res = await axios.get(URL.R_TEAM + user_id);
    if (res.data.success) return res.data.data;
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload) => {
    const res = await axios.post(URL.U_USER, JSON.stringify(payload));
    console.log("res", res);

    if (res.data.success) return res.data.data;
  }
);
export const newBooker = createAsyncThunk("user/newBooker", async (payload) => {
  const res = await axios.post(URL.INVITE_BOOKER, JSON.stringify(payload));
  // console.log("res", res);
  // if (res.data.success) return res.data.data;
  return res.data;
});

//SLICE
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userVO: {},
    team: {},
    status: "",
    error: "",
  },
  reducers: {
    setFirstname: (state, action) => {
      state.userVO.firstname = action.payload;
    },
    setLastname: (state, action) => {
      state.userVO.lastname = action.payload;
    },
  },
  extraReducers: {
    [checkSession.fulfilled]: (state, action) => {
      if (action.payload) {
        state.status = "Sign In from session: Succeeded";
        state.userVO = action.payload;
      }
    },
    [signInUser.pending]: (state, action) => {
      state.status = "Signing in";
    },
    [signInUser.fulfilled]: (state, action) => {
      if (!action.payload) {
        state.status = "Sign In: User not found!";
        return;
      }
      state.status = "Sign In: Succeeded";
      state.userVO = action.payload;
    },
    [signInUser.rejected]: (state, action) => {
      state.status = "Sign In Failed";
      state.error = action.error.message;
      console.log(state.status, state.error, action);
    },
    [logout.fulfilled]: (state, action) => {
      if (action.payload === 0) {
        state.status = "Sign Out: Succeeded";
        state.userVO = {};
      }
    },
    [loadTeamDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        let arr = [];
        action.payload.forEach((user) => {
          arr[user.id] = user;
        });
        state.team = arr;
        state.team.isDetailsLoaded = true;
      }
    },
    [updateUser.fulfilled]: (state, action) => {
      if (action.payload) {
        const userVO = { ...state.userVO, ...action.meta.arg };
        state.userVO = userVO;
      }
    },
    [newBooker.fulfilled]: (state, action) => {
      if (action.payload) {
        if (!action.payload.success) {
          state.newBookerAnswer = action.payload;
        } else {
          state.newBookerAnswer = action.payload;
        }
      }
    },
  },
});
export default userSlice.reducer;

//ACTIONS
export const { setFirstname, setLastname } = userSlice.actions;

//SELECTORS
export const selectUser = (state) => state.user.userVO;
export const selectTeamID = (state) => state.user.userVO.team_id;

export const isTeamDetailsLoaded = (state) => state.user.team.isDetailsLoaded;
export const selectTeam = (state) => state.user.team;
export const selectBookers = (state) =>
  state.user.team.isDetailsLoaded
    ? state.user.team.filter((u) => u.role_id === "1")
    : [];

export const selectNewBookerAnswer = (state) => state.user.newBookerAnswer;
