import React from "react";

import { useSelector, useDispatch } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import appTheme from "./style/appTheme";
import "./App.css";

import SignView from "./components/SignView/SignView";
import Manager from "./components/modules/Manager";

import { signInUser } from "./redux/userSlice";
import { fetchArtists } from "./redux/artistsSlice";
import { fetchEvents } from "./redux/eventsSlice";
import { fetchBookings } from "./redux/bookingsSlice";

export default function App() {
  const userVO = useSelector((state) => state.user.userVO);
  const dispatch = useDispatch();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={appTheme()}>
        <div className="app">
          {!userVO.id && (
            <SignView signIn={(creds) => dispatch(signInUser(creds))} />
          )}
          {userVO.role_id === "1" && (
            <Manager
              userVO={userVO}
              onMounted={() => {
                dispatch(fetchArtists(userVO.team_id));
                dispatch(fetchEvents(userVO.team_id));
                dispatch(fetchBookings(userVO.team_id));
              }}
            />
          )}
          {userVO.role_id === "2" && <div>Artist app</div>}
        </div>
      </ThemeProvider>
    </>
  );
}
