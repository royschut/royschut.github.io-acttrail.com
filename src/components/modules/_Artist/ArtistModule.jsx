import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";

import { PAGEDATA_ARTIST } from "../../../data/Constants";

// import { setCurArtistID } from "../../../redux/booker/artistsSlice";
// import { setCurEventID } from "../../../redux/booker/eventsSlice";
// import { setCurBookingID } from "../../../redux/booker/bookingsSlice";

import NavBar from "../../general/nav/NavBar";
import ArtistDialog from "./ArtistDialog";
import Events from "./Pages/Events";
import Profile from "../Booker/Pages/Profile";

export default function ArtistModule(props) {
  const dispatch = useDispatch();
  let location = useLocation();
  const pd = PAGEDATA_ARTIST;
  const [curPage, setCurPage] = useState();

  useEffect(() => {
    props.onMounted();
  }, []);

  useEffect(() => {
    setCurPage(location.pathname.substring(1));

    //Reset selections:
    // dispatch(setCurArtistID());
    // dispatch(setCurEventID());
    // dispatch(setCurBookingID());
  }, [location]);

  //VIEW
  let isMainPage = curPage ? pd.main.some((p) => p.id === curPage) : "";

  return (
    <Box className="Shell" display="flex" flexDirection="row">
      <NavBar
        pageData={pd}
        curPage={curPage}
        userVO={props.userVO}
        className="Artist_NavBar"
        direction="horizontal"
      />
      <Box
        className={"Main Main_horizontalNav" + (isMainPage ? " panel" : "")}
        boxShadow={3}
      >
        <Switch>
          <Route path="/profile" component={Profile} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/events" component={Events} />
          {/* <Route path="/travel" component={Travel} /> */}
          {/* <Route path="/papers" component={Papers} /> */}
          {/* <Route path="/media" component={Media} /> */}
          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Box>
      <ArtistDialog />
    </Box>
  );
}
