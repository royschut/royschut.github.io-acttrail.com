import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import appTheme from "./style/appTheme";
import "./style/App.css";

import { checkSession, selectUser, signInUser } from "./redux/userSlice";
import { fetchArtist, fetchArtists } from "./redux/booker/artistsSlice";
import { fetchEvents, fetchEventsForArtist } from "./redux/booker/eventsSlice";
import {
  fetchBookings,
  fetchBookingsForArtist,
} from "./redux/booker/bookingsSlice";

import Landing from "./components/Landing/Landing";
import BookerModule from "./components/modules/Booker/BookerModule";
import { Box, Fade, makeStyles, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    app: {
      width: "100vw",
      height: "100%",
      backgroundColor: theme.palette.background.default,
    },
  };
});

export default function App() {
  const userVO = useSelector(selectUser);
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={appTheme({ darkMode: darkMode })}>
        <Box className={classes.app}>
          {!userVO.id && (
            <Landing signIn={(creds) => dispatch(signInUser(creds))} />
          )}
          <Fade in={userVO.id} timeout={1000}>
            <Box>
              {userVO.role_id === "1" && (
                <Fade in={userVO.role_id === "1"}>
                  <BookerModule
                    userVO={userVO}
                    onMounted={() => {
                      dispatch(fetchArtists(userVO.team_id));
                      dispatch(fetchEvents(userVO.team_id));
                      dispatch(fetchBookings(userVO.team_id));
                    }}
                    switchDarkLightMode={() => setDarkMode(!darkMode)}
                  />
                </Fade>
              )}
              {userVO.role_id === "2" && (
                <BookerModule
                  userVO={userVO}
                  onMounted={() => {
                    dispatch(fetchArtist(userVO.id));
                    dispatch(fetchEventsForArtist(userVO.id));
                    dispatch(fetchBookingsForArtist(userVO.id));
                  }}
                />
              )}
            </Box>
          </Fade>
        </Box>
      </ThemeProvider>
    </>
  );
}
