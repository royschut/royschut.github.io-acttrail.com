import React from "react";
import { useSelector, useDispatch } from "react-redux";

import CoolCard from "../../../general/CoolCard/CoolCard";

import {
  selectArtistList,
  selectCurArtistID,
  setCurArtistID,
  selectCurArtist,
  updateArtist,
  createArtistFee,
  updateArtistFee,
} from "../../../../redux/booker/artistsSlice";
import { selectEventList } from "../../../../redux/booker/eventsSlice";
import {
  selectCurBookingID,
  setCurBookingID,
} from "../../../../redux/booker/bookingsSlice";

import {
  selectBookingsWithEventsForCurArtist,
  selectCurBookingWithEvent,
} from "../../../../redux/store";
import { selectTeamID } from "../../../../redux/userSlice";

import {
  requestNewBookingForArtist,
  requestUploadPicArtist,
} from "../../../../redux/booker/dialogSlice";
import { Box, Collapse, Fade, Grid, Zoom } from "@material-ui/core";
import CGContainer from "../../../general/CoolGrid/CGContainer";
import ExpandPanel from "../../../general/CoolCard/ExpandPanel";
import CoolPageHeader from "../../../general/CoolPageHeader";
import Bookings from "./Bookings";
import getFormData from "../../../../data/FormData";
import { formatDate, months } from "../../../../data/Constants";
import CoolMiniGrid from "../../../general/CoolGrid/CoolMiniGrid";

export default function Artists() {
  const dispatch = useDispatch();

  const artists = useSelector(selectArtistList);
  const curArtistID = useSelector(selectCurArtistID);
  const curArtist = useSelector(selectCurArtist);
  const curBookingID = useSelector(selectCurBookingID);
  const curBooking = useSelector(selectCurBookingWithEvent);
  const team_id = useSelector(selectTeamID);

  //Filter bookings for Artist
  let bookings = useSelector(selectBookingsWithEventsForCurArtist);

  // const isCurArtistDetailsLoaded = useSelector(
  //   selectIsCurArtistDetailsLoaded
  // );

  //Setters (actions)
  const onSetCurArtistID = (id) => {
    dispatch(setCurArtistID(id));
    dispatch(setCurBookingID());
  };
  const onSetCurBookingID = (id) => dispatch(setCurBookingID(id));
  const requestNewArtist = () =>
    dispatch(requestNewArtist({ team_id: team_id }));
  const requestNewBooking = () =>
    dispatch(requestNewBookingForArtist({ artist_id: curArtistID }));
  const requestDeleteArtist = (id) => dispatch(requestDeleteArtist({ id: id }));
  const requestDeleteBooking = (id) =>
    dispatch(requestDeleteBooking({ id: id }));
  const onRequestUploadPic = () => dispatch(requestUploadPicArtist());

  const onUpdateArtist = (obj) => {
    dispatch(updateArtist({ ...obj, id: curArtistID }));
  };
  const onUpdateFee = (obj) => {
    if (curArtist.fee)
      dispatch(
        updateArtistFee({
          ...obj,
          artist_id: curArtistID,
          id: curArtist.fee.id,
        })
      );
    else dispatch(createArtistFee({ ...obj, artist_id: curArtistID }));
  };
  const onUpdateMedia = (obj) => {
    //todo
  };

  return (
    <>
      {curArtistID && (
        <CoolMiniGrid
          list={artists}
          selectedID={curArtistID}
          setSelectedID={(id) => {
            onSetCurArtistID(id);
            onSetCurBookingID();
          }}
        />
      )}
      {!curArtistID && (
        <Box display="flex" style={{ height: "100%", flexDirection: "column" }}>
          <CGContainer
            title={"Artists"}
            multiline={true}
            list={artists}
            selectedID={curArtistID}
            secondaryKey={"fullname"}
            setSelectedID={(id) => {
              onSetCurArtistID(id);
              onSetCurBookingID();
            }}
            requestCreate={() => requestNewArtist()}
            requestDelete={(id) => requestDeleteArtist(id)}
          />
        </Box>
      )}
      <Fade in={curArtistID} timeout={700}>
        <Box>
          {curArtistID && (
            <>
              <CoolPageHeader
                list={artists}
                selectedID={curArtistID}
                item={curArtist}
                assetSrc={curArtist.assetsrc}
                name={curArtist.name}
                showAll={() => {
                  onSetCurArtistID();
                  onSetCurBookingID();
                }}
                requestUploadPic={() => onRequestUploadPic()}
                setSelectedID={(id) => onSetCurArtistID(id)}
                requestCreate={() => requestNewArtist()}
                requestDelete={(id) => requestDeleteArtist(id)}
                onChange={(title) => onUpdateArtist({ name: title })}
              >
                <CoolCard
                  title="Persona"
                  headerIcon={"fas fa-user-tag"}
                  formData={getFormData({
                    type: "artist",
                    obj: curArtist,
                    props: ["fullname", "email"],
                  })}
                  onChange={(obj) => onUpdateArtist(obj)}
                />
              </CoolPageHeader>
              {!curBookingID && (
                <Grid container spacing={5}>
                  <Grid item xs={12} md={8}>
                    <ExpandPanel
                      title={"Bookings"}
                      headerIcon={"fas fa-calendar-check"}
                    >
                      <CGContainer
                        multiline={true}
                        list={bookings}
                        secondaryKey={"dateFormatted"}
                        expandable
                        isSquare
                        setSelectedID={(id) => onSetCurBookingID(id)}
                        requestCreate={() => requestNewBooking()}
                        requestDelete={(id) => requestDeleteBooking(id)}
                      />
                    </ExpandPanel>
                  </Grid>
                  <Grid item>
                    <Box mb={5}>
                      <CoolCard
                        title="Media"
                        headerIcon={"fas fa-photo-video"}
                        formData={getFormData({
                          type: "media",
                          obj: curArtist,
                          //todo: should be media of course
                          props: ["media"],
                        })}
                        onChange={(obj) => onUpdateMedia(obj)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              )}
              {curBookingID && (
                <Grid item xs={12} style={{ height: "100%" }}>
                  <Bookings
                    bookings={bookings}
                    selectedID={curBookingID}
                    assetSrc={curBooking.assetsrc}
                    name={`${curArtist.name} @ ${curBooking.name}`}
                    setSelectedID={(id) => onSetCurBookingID(id)}
                    showAll={() => onSetCurBookingID()}
                  />
                </Grid>
              )}
            </>
          )}
        </Box>
      </Fade>
    </>
  );
}
