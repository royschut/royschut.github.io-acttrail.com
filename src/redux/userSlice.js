import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import UserVO from "../vo/UserVO";
import { URL } from "../data/Constants";

//ASYNC
export const signInUser = createAsyncThunk("user/signInUser", async (creds) => {
  const res = await axios.post(URL.SIGNIN, creds);
  return res.data.data;
});

//SLICE
export const userSlice = createSlice({
  name: "user",
  initialState: {
    userVO: {},
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
    [signInUser.pending]: (state, action) => {
      state.status = "Signing in";
    },
    [signInUser.fulfilled]: (state, action) => {
      if (!action.payload) {
        state.status = "Sign In: User not found!";
        console.log(state.status);
        return;
      }
      state.status = "Sign In: Succeeded";
      state.userVO = action.payload;
    },
    [signInUser.rejected]: (state, action) => {
      state.status = "Sign In Failed";
      state.error = action.error.message;
      console.log(state.status, state.error);
    },
  },
});
export default userSlice.reducer;

//ACTIONS
export const { setFirstname, setLastname } = userSlice.actions;

//SELECTORS
export const selectUser = (state) => state.user.userVO;
