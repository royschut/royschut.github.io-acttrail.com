import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CoolCard from "../../../general/CoolCard/CoolCard";

import { selectArtistList } from "../../../../redux/booker/artistsSlice";
import {
  selectEventList,
  selectCurEventID,
  selectCurEvent,
  setCurEventID,
  updateEvent,
} from "../../../../redux/booker/eventsSlice";
import {
  selectBookingList,
  selectCurBookingID,
  setCurBookingID,
} from "../../../../redux/booker/bookingsSlice";

import {
  selectBookingsForCurEvent,
  selectBookingsWithArtistsForCurEvent,
  selectCurBookingWithArtist,
} from "../../../../redux/store";
import { selectTeamID } from "../../../../redux/userSlice";

import { requestNewBookingForEvent } from "../../../../redux/booker/dialogSlice";
import { Box, Grid, Paper } from "@material-ui/core";
import CGContainer from "../../../general/CoolGrid/CGContainer";
import CoolPageHeader from "../../../general/CoolPageHeader/CoolPageHeader";
import Bookings from "./Bookings";
import ExpandPanel from "../../../general/CoolCard/ExpandPanel";

export default function Events() {
  const dispatch = useDispatch();

  //   const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);

  const curEventID = useSelector(selectCurEventID);
  const curBookingID = useSelector(selectCurBookingID);

  const curEvent = useSelector(selectCurEvent);
  const curBooking = useSelector(selectCurBookingWithArtist);
  const team_id = useSelector(selectTeamID);

  //Filter bookings for Event
  let bookings = useSelector(selectBookingsWithArtistsForCurEvent);

  //Setters (actions)
  const onSetCurEventID = (id) => {
    dispatch(setCurEventID(id));
    dispatch(setCurBookingID());
  };
  const onSetCurBookingID = (id) => dispatch(setCurBookingID(id));
  const requestNewEvent = () => dispatch(requestNewEvent({ team_id: team_id }));
  const requestNewBooking = () =>
    dispatch(requestNewBookingForEvent({ event_id: curEventID }));
  const requestDeleteEvent = (id) => dispatch(requestDeleteEvent({ id: id }));
  const requestDeleteBooking = (id) =>
    dispatch(requestDeleteBooking({ id: id }));

  const onUpdateEvent = (obj) => {
    dispatch(updateEvent({ ...obj, id: curEventID }));
  };

  const onUpdateBooking = (obj) => {
    // dispatch(updateArtist({ ...obj, id: curArtistID }));
  };
  return (
    <>
      {!curEventID && (
        <Box display="flex" style={{ height: "100%", flexDirection: "column" }}>
          <CGContainer
            title={"Events"}
            multiline={true}
            list={events}
            selectedID={curEventID}
            setSelectedID={(id) => {
              onSetCurEventID(id);
              onSetCurBookingID();
            }}
            requestCreate={() => requestNewEvent()}
            requestDelete={(id) => requestDeleteEvent(id)}
          />
        </Box>
      )}
      {curEventID && (
        <>
          <CoolPageHeader
            list={events}
            selectedID={curEventID}
            item={curEvent}
            assetSrc={curEvent.assetsrc}
            name={curEvent.name}
            showAll={() => {
              onSetCurEventID();
              onSetCurBookingID();
            }}
            setSelectedID={(id) => onSetCurEventID(id)}
            requestCreate={() => requestNewEvent()}
            requestDelete={(id) => requestDeleteEvent(id)}
            onChange={(obj) => onUpdateEvent(obj)}
          >
            <CoolCard
              title="Venue"
              editable
              item={curEvent}
              //   itemKeys={["fullname", "email"]}
              //   itemLabels={["Full name", "E-mail"]}
              onChange={(obj) => onUpdateEvent(obj)}
            />
          </CoolPageHeader>

          {!curBookingID && (
            <Grid container spacing={5}>
              <Grid item xs={12} md={8}>
                <ExpandPanel title={"Bookings"} expandable>
                  <CGContainer
                    multiline={true}
                    list={bookings}
                    expandable
                    setSelectedID={(id) => onSetCurBookingID(id)}
                    requestCreate={() => requestNewBooking()}
                    requestDelete={(id) => requestDeleteBooking(id)}
                  />
                </ExpandPanel>
              </Grid>
              <Grid item container xs={12} md={4} spacing={5}>
                <Grid item xs={12}>
                  <CoolCard
                    title="Timetable"
                    editable
                    item={curEvent}
                    itemKeys={["timetable"]}
                    itemLabels={["Timetable"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CoolCard
                    title="Media"
                    editable
                    item={curEvent}
                    itemKeys={["media"]}
                    itemLabels={["Media"]}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          {curBookingID && (
            <Grid item xs={12} style={{ height: "100%" }}>
              <Bookings
                bookings={bookings}
                selectedID={curBookingID}
                assetSrc={curBooking.assetsrc}
                name={curBooking.name}
                setSelectedID={(id) => onSetCurBookingID(id)}
                showAll={() => onSetCurBookingID()}
              />
            </Grid>
          )}
        </>
      )}
    </>
  );
}
