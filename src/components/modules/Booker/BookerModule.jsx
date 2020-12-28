import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import {
  Box,
  Icon,
  IconButton,
  makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
  Slide,
} from "@material-ui/core";

import { PAGEDATA_BOOKER, PAGEDATA_ARTIST } from "../../../data/Constants";

import { setCurArtistID } from "../../../redux/booker/artistsSlice";
import { setCurEventID } from "../../../redux/booker/eventsSlice";
import { setCurBookingID } from "../../../redux/booker/bookingsSlice";

import NavBar from "../../general/nav/NavBar";
import Dashboard from "./Pages/Dashboard";
import CheckLists from "./Pages/CheckLists";
import Travel from "./Pages/Travel";
import Papers from "./Pages/Papers";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Media from "./Pages/Media";
import BookerDialog from "./BookerDialog";
import Artists from "./Pages/Artists";
import Events from "./Pages/Events";
import { logout } from "../../../redux/userSlice";

const useStyles = makeStyles((theme) => {
  return {
    main: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: theme.palette.softBackground,
    },
    nav: {
      height: "100vh",
      width: 220,
    },
    navMini: {
      height: "100vh",
      width: 65,
    },
    navLow: {
      position: "fixed",
      height: 85,
      width: "100vw",
      bottom: 0,
      backgroundColor: theme.palette.softBackground,
      boxShadow: theme.boxShadowBoth,
      borderTop: theme.thinBorder,
      zIndex: 10,
    },
    page: {
      minHeight: "100vh",
      width: "100%",
      // paddingTop: 11,
      // paddingBottom: 11,
    },
    paper: {
      width: "100%",
      height: "100%",
      borderRadius: "0px 0px 0px 0px",
      backgroundColor: theme.palette.softestBackground,
      padding: 55,
      [theme.breakpoints.down("sm")]: {
        padding: 10,
      },
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
      // boxShadow: theme.boxShadowBoth,
    },
    pageLowNav: {
      minHeight: "100vh",
      width: "100vw",
      marginBottom: 85,
      borderRadius: "0px",
    },
  };
});

export default function BookerModule(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  let location = useLocation();
  const isBooker = props.userVO.role_id === "1";

  const pd = isBooker ? PAGEDATA_BOOKER : PAGEDATA_ARTIST;
  const [curPage, setCurPage] = useState();
  let isMainPage = curPage ? pd.main.some((p) => p.id === curPage) : "";

  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const [menuExpanded, setMenuExpanded] = useState(true);

  //DATA
  useEffect(() => {
    props.onMounted();
  }, [props]);

  useEffect(() => {
    setCurPage(location.pathname.substring(1));

    //Reset selections:
    dispatch(setCurArtistID());
    dispatch(setCurEventID());
    dispatch(setCurBookingID());
  }, [dispatch, location]);

  //VIEW
  const navClass = smallScreen
    ? classes.navLow
    : menuExpanded
    ? classes.nav
    : classes.navMini;

  return (
    <Box className={classes.main}>
      <Box className={navClass}>
        <NavBar
          pageData={pd}
          curPage={curPage}
          userVO={props.userVO}
          smallScreen={smallScreen}
          xsScreen={xsScreen}
          menuExpanded={menuExpanded && !smallScreen}
          logout={() => dispatch(logout())}
        />
      </Box>
      {!smallScreen && (
        <Expander
          menuExpanded={menuExpanded}
          setMenuExpanded={(val) => setMenuExpanded(val)}
        />
      )}
      <Box className={smallScreen ? classes.pageLowNav : classes.page}>
        <Switch>
          <Route path="/profile" component={Profile} />
          {isMainPage && (
            <Slide in={isMainPage} timeout={500} direction="left">
              <Paper className={classes.paper} elevation={smallScreen ? 0 : 1}>
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/events" component={Events} />
                {isBooker && (
                  <>
                    <Route path="/artists" component={Artists} />
                    <Route path="/checklists" component={CheckLists} />
                    <Route path="/papers" component={Papers} />
                    <Route path="/media" component={Media} />{" "}
                  </>
                )}
                <Route path="/travel" component={Travel} />
              </Paper>
            </Slide>
          )}
          <Route path="/settings">
            <Settings switchDarkLightMode={() => props.switchDarkLightMode()} />
          </Route>
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Box>
      <BookerDialog />
    </Box>
  );
}
function Expander(props) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      onMouseOver={(e) => setHover(true)}
      onMouseOut={(e) => setHover(false)}
      style={{
        width: 15,
        height: "100vh",
        zIndex: 11,
        cursor: "pointer",

        boxShadow: hover ? theme.boxShadowWide : "",
        transition: "box-shadow 0.2s ease-in",
      }}
      onClick={(e) => props.setMenuExpanded(!props.menuExpanded)}
    >
      <IconButton
        style={{
          width: 8,
          height: 8,
          color: hover
            ? "rgba(" + theme.palette.textRgb + ",0.8)"
            : "rgba(" + theme.palette.textRgb + ",0.2)",
        }}
      >
        <Icon
          className={
            "fas fa-chevron-" + (props.menuExpanded ? "left" : "right")
          }
          style={{ fontSize: "0.7rem" }}
        />
      </IconButton>
    </Box>
  );
}
