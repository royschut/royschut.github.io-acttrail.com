import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CoolDialog from "../../general/CoolDialog";
import {
  endRequest,
  selectIsDialogActive,
  selectDialogRequest,
  selectDialogPayload,
  selectDialogTitle,
} from "../../../redux/booker/dialogSlice";
import { TextField, Box, Avatar, Typography } from "@material-ui/core";
import {
  newArtist,
  deleteArtist,
  selectArtistList,
} from "../../../redux/booker/artistsSlice";
import { newBooking, deleteBooking } from "../../../redux/booker/bookingsSlice";
import {
  selectEventList,
  newEvent,
  deleteEvent,
} from "../../../redux/booker/eventsSlice";
import CoolGrid from "../../general/CoolGrid/CoolGrid";

export default function ArtistDialog(props) {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);

  const [value, setValue] = useState();

  const isOpen = useSelector(selectIsDialogActive);
  const curRequest = useSelector(selectDialogRequest);
  const title = useSelector(selectDialogTitle);
  const dialogPayload = useSelector(selectDialogPayload);

  useEffect(() => {
    if (!isOpen) setValue("");
  }, [isOpen]);

  const onSubmit = (val) => {
    if (val) setValue(val);

    switch (curRequest) {
      case "newArtist":
        dispatch(newArtist({ name: value, team_id: dialogPayload.team_id }));
        break;
      case "newEvent":
        dispatch(newEvent({ name: value, team_id: dialogPayload.team_id }));
        break;
      case "newBookingForArtist":
        dispatch(
          newBooking({ artist_id: dialogPayload.artist_id, event_id: val })
        );
        break;
      case "newBookingForEvent":
        dispatch(
          newBooking({ event_id: dialogPayload.event_id, artist_id: val })
        );
        break;
      case "deleteArtist":
        dispatch(deleteArtist({ id: dialogPayload.id }));
        break;
      case "deleteEvent":
        dispatch(deleteEvent({ id: dialogPayload.id }));
        break;
      case "deleteBooking":
        dispatch(deleteBooking({ id: dialogPayload.id }));
        break;
      default:
        break;
    }
    dispatch(endRequest());
  };
  let submitText = "";
  if (curRequest.indexOf("new") === 0) submitText = "Create";
  if (curRequest.indexOf("delete") === 0) submitText = "Delete";
  if (curRequest.indexOf("newBooking") === 0) submitText = "";

  return (
    <CoolDialog
      title={title}
      submitText={submitText}
      open={isOpen}
      onClose={() => dispatch(endRequest())}
      onSubmit={() => onSubmit()}
    >
      {(curRequest === "newArtist" || curRequest === "newEvent") && (
        <TextField
          autoFocus
          label="Name"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      )}

      {(curRequest === "newBookingForArtist" ||
        curRequest === "newBookingForEvent") && (
        <CoolGrid
          multiline
          list={curRequest === "newBookingForArtist" ? events : artists}
          selectedID={value}
          itemClicked={(id) => onSubmit(id)}
          direction={"row"}
        />
      )}
      {curRequest === "deleteArtist" && (
        <Box display="flex">
          <Avatar
            src={"img/" + artists[dialogPayload.id].assetsrc}
            alt={artists[dialogPayload.id].name}
          >
            {artists[dialogPayload.id].name}
          </Avatar>
          <Typography variant="h6" style={{ paddingLeft: 20 }}>
            {artists[dialogPayload.id] ? artists[dialogPayload.id].name : ""}
          </Typography>
        </Box>
      )}
    </CoolDialog>
  );
}
