import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFormData from "../../../../data/FormData";
import {
  loadBookingDetails,
  selectCurBooking,
  selectIsCurBookingDetailsLoaded,
  setCurBookingID,
  updateBooking,
} from "../../../../redux/booker/bookingsSlice";
import CoolCard from "../../../general/CoolCard/CoolCard";
import CoolMiniGrid from "../../../general/CoolGrid/CoolMiniGrid";
import CoolPageHeader from "../../../general/CoolPageHeader/CoolPageHeader";

const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid " + theme.palette.secondary.main,
    padding: 30,
    borderRadius: 25,
    // boxShadow: theme.palette.secondary.boxShadow,
    boxShadow: theme.boxShadowBoth,
  },
}));

export default function Bookings(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const curBooking = useSelector(selectCurBooking);

  const isCurBookingDetailsLoaded = useSelector(
    selectIsCurBookingDetailsLoaded
  );

  const onUpdateBooking = (obj) => {
    console.log(obj);
    dispatch(updateBooking({ ...obj, id: props.selectedID }));
  };

  const deselectBooking = () => dispatch(setCurBookingID());

  useEffect(() => {
    if (props.selectedID && !isCurBookingDetailsLoaded)
      dispatch(loadBookingDetails(props.selectedID));
  }, [props.selectedID, isCurBookingDetailsLoaded]);

  return (
    <Paper elevation={2} className={classes.paper}>
      <Grid container spacing={5}>
        {curBooking && (
          <Grid item xs={12}>
            <CoolMiniGrid
              list={props.bookings}
              selectedID={curBooking.id}
              setSelectedID={(id) => props.setSelectedID(id) }
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <CoolPageHeader
            list={props.bookings}
            selectedID={props.selectedID}
            assetSrc={props.assetSrc}
            name={props.name}
            editable={false}
            showAll={() => props.showAll()}
            setSelectedID={(id) => props.setSelectedID(id)}
            // requestUploadPic={() => onRequestUploadPic()}
            requestCreate={() => props.requestCreate()}
            requestDelete={(id) => props.requestDelete(id)}
          >
            <Button onClick={(e) => deselectBooking()}>X</Button>
          </CoolPageHeader>
        </Grid>
        <Grid item xs={12} md={5}>
          <CoolCard
            featured
            secondary
            title={"Booking status"}
            formData={getFormData({
              type: "booking",
              obj: curBooking,
              props: ["bookingstatus_id", "fee", "settype", "day", "area"],
            })}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <CoolCard
            title="Timetable"
            hideKeys
            formData={getFormData({
              type: "booking",
              obj: curBooking,
              props: ["timetable"],
            })}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <CoolCard
            title="Briefing"
            hideKeys
            formData={getFormData({
              type: "booking",
              obj: curBooking,
              props: ["briefing"],
            })}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <CoolCard
            title="Notes"
            hideKeys
            formData={getFormData({
              type: "booking",
              obj: curBooking,
              props: ["notes"],
            })}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
