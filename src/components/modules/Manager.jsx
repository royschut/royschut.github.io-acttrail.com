import React, { useState, useEffect } from "react";

import { Box, Typography, TextField } from "@material-ui/core";

import { PAGES as P, P_TITLES as TITLES } from "../../data/Constants";
import NavBar from "../general/nav/NavBar";
import ArtistView from "./ManagerView/ArtistView";
import Dashboard from "./ManagerView/Dashboard";
import CheckLists from "./ManagerView/CheckLists";
import EventView from "./ManagerView/EventView";

export default function Manager(props) {
  const [curPage, setCurPage] = useState(P.ARTIST);
  const [curArtist, setCurArtist] = useState();
  const [curEvent, setCurEvent] = useState();
  const [curBooking, setCurBooking] = useState();

  const isNavPage = () => {
    return curPage !== P.PROFILE && curPage !== P.SETTINGS;
  };

  useEffect(() => {
    props.onMounted();
  }, []);

  return (
    <Box className="Manager">
      <NavBar
        curPage={curPage}
        setCurPage={(p) => setCurPage(p)}
        userVO={props.userVO}
      />
      <Box
        className={"main" + (isNavPage(curPage) ? " panel" : "")}
        boxShadow={3}
      >
        <Typography variant="h4" style={{ paddingBottom: 15 }}>
          {TITLES[curPage]}
        </Typography>
        {curPage === P.PROFILE && <h2>My profile</h2>}
        {curPage === P.DASHBOARD && <Dashboard />}
        {curPage === P.ARTIST && (
          <ArtistView
            curArtist={curArtist}
            curBooking={curBooking}
            setCurArtist={(id) => setCurArtist(id)}
            setCurBooking={(id) => setCurBooking(id)}
          />
        )}
        {curPage === P.EVENT && (
          <EventView
            curEvent={curEvent}
            curBooking={curBooking}
            setCurEvent={(id) => setCurEvent(id)}
            setCurBooking={(id) => setCurBooking(id)}
          />
        )}
        {curPage === P.CHECKLIST && <CheckLists />}
        {curPage === P.SETTINGS && <h2>Settings</h2>}
      </Box>
    </Box>
  );
}
