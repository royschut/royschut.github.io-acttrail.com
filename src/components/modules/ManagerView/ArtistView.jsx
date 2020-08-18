import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { TextField } from "@material-ui/core";

import ManagePage from "./ManagePage";
import CoolCard from "../../general/CoolCard/CoolCard";
import CoolDialog from "../../general/CoolDialog/CoolDialog";
import CoolGrid from "../../general/CoolGrid/CoolGrid";

import { tempPersona, tempFee, tempAssets } from "../../../data/Constants";
import { formatFilteredBookingsForArtists } from "../../../utils/Formatters";

import { selectArtistList } from "../../../redux/artistsSlice";
import { selectEventList } from "../../../redux/eventsSlice";
import { selectBookingList } from "../../../redux/bookingsSlice";

import { newArtist } from "../../../redux/artistsSlice";
import { newBooking } from "../../../redux/bookingsSlice";

const DIALOG_ARTIST = 1;
const DIALOG_BOOKING = 2;
const DIALOG_DELETE_ARTIST = 3;
const DIALOG_DELETE_BOOKING = 4;

export default function ArtistView(props) {
  const dispatch = useDispatch();

  const userVO = useSelector((state) => state.user.userVO);
  const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);
  let bookings = useSelector(selectBookingList);

  const curVO = props.curArtist ? artists[props.curArtist] : {};
  const subVO = props.curBooking ? bookings[props.curBooking] : {};

  //filter bookings for event
  bookings = formatFilteredBookingsForArtists(
    bookings,
    props.curArtist,
    events
  );

  //DIALOG
  const [dialog, setDialog] = useState();
  const [dialogValue, setDialogValue] = useState("");

  useEffect(() => {
    setDialogValue("");
  }, [dialog]);

  const onSubmit = () => {
    setDialog();
    if (dialog === DIALOG_ARTIST)
      dispatch(newArtist({ name: dialogValue, team_id: userVO.team_id }));
    if (dialog === DIALOG_BOOKING)
      dispatch(
        newBooking({
          artist_id: props.curArtist,
          event_id: dialogValue,
        })
      );
  };
  console.log(artists);
  return (
    <>
      <ManagePage
        mainList={artists}
        curMainID={props.curArtist}
        mainVO={curVO}
        subList={bookings}
        curSubID={props.curBooking}
        setSelectedID={(id) => {
          props.setCurArtist(id);
          props.setCurBooking();
        }}
        setCurSubID={(id) => props.setCurBooking(id)}
        requestNewMain={() => setDialog(DIALOG_ARTIST)}
        requestNewSub={() => setDialog(DIALOG_BOOKING)}
        requestDelete={(id) => setDialog(DIALOG_DELETE_ARTIST)}
        headerCard={ArtistHeaderCard(
          props.curArtist ? artists[props.curArtist].name : ""
        )}
        topCard={<CoolCard title="Persona" editable items={tempPersona} />}
        mainCardTitle="Bookings"
        sideCards={[
          <CoolCard title="Fees" editable items={tempFee} />,
          <CoolCard title="Media" editable items={tempAssets} />,
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
      />
      <CoolDialog
        title={dialog === DIALOG_ARTIST ? "New Artist" : "New Booking"}
        open={dialog > 0}
        onClose={() => setDialog()}
        onSubmit={() => onSubmit()}
      >
        {dialog === DIALOG_ARTIST && (
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
            list={events}
            selectedID={dialogValue}
            itemClicked={(id) => setDialogValue(id)}
            direction={"row"}
          />
        )}
      </CoolDialog>
    </>
  );
}
const ArtistHeaderCard = (name) => {
  return (
    <CoolCard
      title={name}
      editable
      elevation={0}
      items={[{ label: "", value: name }]}
    />
  );
};
