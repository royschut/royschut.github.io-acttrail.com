import React, { useState, useEffect } from "react";

import { Typography, TextField } from "@material-ui/core";

import { tempVenue, tempAssets, tempTimetable } from "../../../data/Constants";
import CoolCard from "../../general/CoolCard/CoolCard";
import ManagePage from "./ManagePage";
import { formatFilteredBookings } from "../../../utils/Formatters";
import { useDispatch, useSelector } from "react-redux";
import { selectArtistList } from "../../../redux/artistsSlice";
import { selectEventList, newEvent } from "../../../redux/eventsSlice";
import { selectBookingList, newBooking } from "../../../redux/bookingsSlice";
import { nanoid } from "@reduxjs/toolkit";
import CoolDialog from "../../general/CoolDialog/CoolDialog";
import CoolGrid from "../../general/CoolGrid/CoolGrid";

const DIALOG_EVENT = 1;
const DIALOG_BOOKING = 2;
const DIALOG_DELETE_EVENT = 3;
const DIALOG_DELETE_BOOKING = 4;

export default function EventView(props) {
  const dispatch = useDispatch();
  const userVO = useSelector((state) => state.user.userVO);
  const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);
  let bookings = useSelector(selectBookingList);

  const curVO = props.curEvent ? events[props.curEvent] : {};
  const subVO = props.curBooking ? bookings[props.curBooking] : {};

  //filter bookings for event
  bookings = formatFilteredBookings(bookings, props.curEvent, artists);

  //DIALOG
  const [dialog, setDialog] = useState();
  const [dialogValue, setDialogValue] = useState("");

  useEffect(() => {
    setDialogValue("");
  }, [dialog]);

  const onSubmit = () => {
    setDialog();
    if (dialog === DIALOG_EVENT)
      dispatch(newEvent({ name: dialogValue, team_id: userVO.team_id }));
    if (dialog === DIALOG_BOOKING)
      dispatch(
        newBooking({
          event_id: props.curEvent,
          artist_id: dialogValue,
        })
      );
  };
  return (
    <>
      <ManagePage
        mainList={events}
        curMainID={props.curEvent}
        mainVO={curVO}
        subList={bookings}
        curSubID={props.curBooking}
        setSelectedID={(id) => {
          props.setCurEvent(id);
          props.setCurBooking();
        }}
        setCurSubID={(id) => props.setCurBooking(id)}
        requestNewMain={() => setDialog(DIALOG_EVENT)}
        requestNewSub={() => setDialog(DIALOG_BOOKING)}
        requestDelete={(id) => setDialog(DIALOG_DELETE_EVENT)}
        mainCardTitle="Bookings"
        headerCard={EventHeaderCard(
          props.curEvent ? events[props.curEvent].name : ""
        )}
        topCard={<CoolCard title="Venue" items={tempVenue} />}
        sideCards={[
          <CoolCard title="Timetable" items={tempTimetable} />,
          <CoolCard title="Media" items={tempAssets} />,
        ]}
        subTitle="Booking Details"
        subPage={
          <ManagePage
            mainList={bookings}
            curMainID={props.curBooking}
            mainVO={subVO}
            setSelectedID={(id) => props.setCurBooking(id)}
            requestNewMain={() => setDialog(DIALOG_BOOKING)}
            topCard={<CoolCard title="Fee" editable items={["tempFee"]} />}
            sideCards={[
              <CoolCard title="Timetable" editable items={["tempTimetable"]} />,
            ]}
          />
        }
      />{" "}
      <CoolDialog
        title={dialog === DIALOG_EVENT ? "New Event" : "New Booking"}
        open={dialog > 0}
        onClose={() => setDialog()}
        onSubmit={() => onSubmit()}
      >
        {dialog === DIALOG_EVENT && (
          <TextField
            autoFocus
            label="Name"
            value={dialogValue}
            onChange={(e) => setDialogValue(e.currentTarget.value)}
          />
        )}
        {dialog === DIALOG_BOOKING && (
          <CoolGrid
            multiline
            list={artists}
            selectedID={dialogValue}
            itemClicked={(id) => setDialogValue(id)}
            direction={"row"}
          />
        )}
      </CoolDialog>
    </>
  );
}
const EventHeaderCard = (name) => {
  return (
    <CoolCard
      title={name}
      editable
      elevation={0}
      items={[{ label: "", value: name }]}
    />
  );
};
