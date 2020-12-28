import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CoolCard from "../../../general/CoolCard/CoolCard";

import {
  selectEventList,
  selectCurEventID,
  selectCurEvent,
  setCurEventID,
  updateEvent,
  isVenueCurEventLoaded,
  crudVenue,
  selectVenueForCurEvent,
} from "../../../../redux/booker/eventsSlice";
import {
  selectCurBookingID,
  setCurBookingID,
} from "../../../../redux/booker/bookingsSlice";

import {
  selectBookingsWithArtistsForCurEvent,
  selectCurBookingWithArtist,
} from "../../../../redux/store";
import { selectTeamID } from "../../../../redux/userSlice";

import {
  requestDeleteBooking,
  requestDeleteEvent,
  requestNewBookingForEvent,
  requestNewEvent,
  requestUploadPicEvent,
} from "../../../../redux/booker/dialogSlice";
import { Box, Grid } from "@material-ui/core";
import CGContainer from "../../../general/CoolGrid/CGContainer";
import CoolPageHeader from "../../../general/CoolPageHeader/CoolPageHeader";
import Bookings from "./Bookings";
import ExpandPanel from "../../../general/CoolCard/ExpandPanel";
import getFormData from "../../../../data/FormData";
import CoolMiniGrid from "../../../general/CoolGrid/CoolMiniGrid";

export default function Events() {
  const dispatch = useDispatch();

  //   const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);

  const curEventID = useSelector(selectCurEventID);
  const curBookingID = useSelector(selectCurBookingID);

  const curEvent = useSelector(selectCurEvent);
  const curBooking = useSelector(selectCurBookingWithArtist);

  const team_id = useSelector(selectTeamID);

  const venueLoaded = useSelector(isVenueCurEventLoaded);
  const venue = useSelector(selectVenueForCurEvent);

  //Filter bookings for Artist
  let bookings = useSelector(selectBookingsWithArtistsForCurEvent);

  useEffect(() => {
    if (curEventID && !venueLoaded) {
      const crud = curEvent.venue_id ? "r" : "c";
      dispatch(crudVenue({ crud: crud, event_id: curEventID }));
    }
  }, [venueLoaded, curEventID, curEvent.venue_id, dispatch]);

  //Setters (actions)
  const onSetCurEventID = (id) => {
    dispatch(setCurEventID(id));
    dispatch(setCurBookingID());
  };
  const onSetCurBookingID = (id) => dispatch(setCurBookingID(id));
  const onRequestNewEvent = () =>
    dispatch(requestNewEvent({ team_id: team_id }));
  const onRequestNewBooking = () =>
    dispatch(requestNewBookingForEvent({ event_id: curEventID }));
  const onRequestDeleteEvent = (id) => dispatch(requestDeleteEvent({ id: id }));
  const onRequestDeleteBooking = (id) =>
    dispatch(requestDeleteBooking({ id: id }));
  const onRequestUploadPic = () => dispatch(requestUploadPicEvent());

  const onUpdateEvent = (obj) =>
    dispatch(updateEvent({ ...obj, id: curEventID }));

  const onUpdateVenue = (obj) => {
    dispatch(crudVenue({ crud: "u", obj: { ...obj, id: curEventID } }));
  };
  // const onUpdateBooking = (obj) => {
  //   // dispatch(updateArtist({ ...obj, id: curArtistID }));
  // };
  const onUpdateMedia = (obj) => {
    //dispatch();
  };
  return (
    <>
      {curEventID && (
        <CoolMiniGrid
          list={events}
          selectedID={curEventID}
          isSquare
          setSelectedID={(id) => {
            onSetCurEventID(id);
            onSetCurBookingID();
          }}
        />
      )}
      {!curEventID && (
        <Box display="flex" style={{ height: "100%", flexDirection: "column" }}>
          <CGContainer
            title={"Events"}
            multiline={true}
            list={events}
            selectedID={curEventID}
            isSquare
            secondaryKey={"subname"}
            setSelectedID={(id) => {
              onSetCurEventID(id);
              onSetCurBookingID();
            }}
            requestCreate={() => onRequestNewEvent()}
            requestDelete={(id) => onRequestDeleteEvent(id)}
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
            isSquare
            showAll={() => {
              onSetCurEventID();
              onSetCurBookingID();
            }}
            requestUploadPic={() => onRequestUploadPic()}
            setSelectedID={(id) => onSetCurEventID(id)}
            requestCreate={() => onRequestNewEvent()}
            requestDelete={(id) => onRequestDeleteEvent(id)}
            onChange={(title) => onUpdateEvent({ name: title })}
          >
            <CoolCard
              title="Event details"
              headerIcon={"fas fa-calendar"}
              formData={getFormData({
                type: "event",
                obj: curEvent,
                props: ["name", "subname", "date", "notes"],
              })}
              onChange={(obj) => onUpdateEvent(obj)}
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
                    expandable
                    secondaryKey={"info"}
                    setSelectedID={(id) => onSetCurBookingID(id)}
                    requestCreate={() => onRequestNewBooking()}
                    requestDelete={(id) => onRequestDeleteBooking(id)}
                  />
                </ExpandPanel>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box mb={5}>
                  <CoolCard
                    title="Venue"
                    headerIcon={"fas fa-location-arrow"}
                    formData={getFormData({
                      type: "venue",
                      obj: venue,
                      props: ["name", "address", "zipcode", "notes"],
                    })}
                    onChange={(obj) => onUpdateVenue(obj)}
                  />
                </Box>
                <Box mb={5}>
                  <CoolCard
                    title="Media"
                    headerIcon={"fas fa-photo-video"}
                    formData={getFormData({
                      type: "media",
                      obj: curEvent,
                      //todo: should be curMedia of course
                      props: ["media"],
                    })}
                    onChange={(obj) => onUpdateMedia(obj)}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
          {curBookingID && (
            // <Grid item xs={12} style={{ height: "100%" }}>
              <Bookings
                bookings={bookings}
                selectedID={curBookingID}
                assetSrc={curBooking.assetsrc}
                name={`${curBooking.name} @ ${curEvent.name}`}
                setSelectedID={(id) => onSetCurBookingID(id)}
                showAll={() => onSetCurBookingID()}
              />
            // </Grid>
          )}
        </>
      )}
    </>
  );
}
