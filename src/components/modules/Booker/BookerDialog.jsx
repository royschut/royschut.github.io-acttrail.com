import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CoolDialog from "../../general/CoolDialog";
import {
  endRequest,
  selectIsDialogActive,
  selectDialogRequest,
  selectDialogPayload,
  selectDialogTitle,
  selectDialogDescr,
  answerNewBooker,
  selectDialogAnswer,
} from "../../../redux/booker/dialogSlice";
import { TextField, Box, Avatar, Typography } from "@material-ui/core";
import {
  newArtist,
  deleteArtist,
  selectArtistList,
  uploadPic as uploadPicArtist,
  selectCurArtistID,
} from "../../../redux/booker/artistsSlice";
import { newBooking, deleteBooking } from "../../../redux/booker/bookingsSlice";
import {
  selectEventList,
  newEvent,
  deleteEvent,
  uploadPic as uploadPicEvent,
  selectCurEventID,
} from "../../../redux/booker/eventsSlice";
import CoolGrid from "../../general/CoolGrid/CoolGrid";
import Uploader from "../../general/Uploader/Uploader";
import { UploadURL } from "../../../data/Constants";
import { newBooker, selectNewBookerAnswer } from "../../../redux/userSlice";

export default function BookerDialog(props) {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);
  const curArtistID = useSelector(selectCurArtistID);
  const curEventID = useSelector(selectCurEventID);

  const [value, setValue] = useState();

  const isOpen = useSelector(selectIsDialogActive);
  const curRequest = useSelector(selectDialogRequest);
  const curAnswer = useSelector(selectDialogAnswer);
  const title = useSelector(selectDialogTitle);
  const descr = useSelector(selectDialogDescr);
  const dialogPayload = useSelector(selectDialogPayload);

  const newBookerAnswer = useSelector(selectNewBookerAnswer);

  useEffect(() => {
    if (!isOpen) setValue("");
  }, [isOpen]);

  useEffect(() => {
    if (newBookerAnswer && !isOpen) {
      dispatch(answerNewBooker(newBookerAnswer));
    }
  }, [newBookerAnswer]);

  const onSubmit = (val) => {
    if (val) setValue(val);

    switch (curRequest) {
      case "newBooker":
        dispatch(newBooker({ email: value, team_id: dialogPayload.team_id }));
        break;
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
      case "uploadPicArtist":
        if (!value.get("img")) return "no img";
        value.append("id", curArtistID);
        dispatch(uploadPicArtist(value));
        break;
      case "uploadPicEvent":
        if (!value.get("img")) return "no img";
        value.append("id", curEventID);
        dispatch(uploadPicEvent(value));
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
  if (curRequest.indexOf("upload") === 0) submitText = "Submit";
  if (curAnswer) submitText = "Okay";

  return (
    <CoolDialog
      title={title}
      submitText={submitText}
      open={isOpen}
      onClose={() => dispatch(endRequest())}
      onSubmit={() => onSubmit()}
    >
      {(curRequest === "newBooker" ||
        curRequest === "newArtist" ||
        curRequest === "newEvent") && (
        <TextField
          autoFocus
          label={curRequest === "newBooker" ? "E-mail" : "Name"}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      )}
      {curAnswer && (
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" style={{ marginTop: 20 }}>
            {curAnswer}
          </Typography>
          {dialogPayload && (
            <Typography variant="h4">{dialogPayload}</Typography>
          )}
        </Box>
      )}
      {descr && (
        <Typography
          variant="body2"
          style={{ marginTop: 20, fontStyle: "italic" }}
        >
          {descr}
        </Typography>
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
            src={UploadURL + artists[dialogPayload.id].assetsrc}
            alt={artists[dialogPayload.id].name}
          >
            {artists[dialogPayload.id].name}
          </Avatar>
          <Typography variant="h6" style={{ paddingLeft: 20 }}>
            {artists[dialogPayload.id] ? artists[dialogPayload.id].name : ""}
          </Typography>
        </Box>
      )}
      {(curRequest === "uploadPicArtist" || curRequest == "uploadPicEvent") && (
        <Uploader onChange={(img) => setValue(img)} />
      )}
    </CoolDialog>
  );
}
