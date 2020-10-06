import { Grid, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadBookingDetails,
  selectCurBooking,
  selectIsCurBookingDetailsLoaded,
  updateBooking,
} from "../../../../redux/booker/bookingsSlice";
import CoolCard from "../../../general/CoolCard/CoolCard";
import CoolPageHeader from "../../../general/CoolPageHeader/CoolPageHeader";

export default function Bookings(props) {
  const dispatch = useDispatch();
  const curBooking = useSelector(selectCurBooking);
  // console.log("BOOKINGL:", curBooking);

  const isCurBookingDetailsLoaded = useSelector(
    selectIsCurBookingDetailsLoaded
  );

  const onUpdateBooking = (obj) => {
    console.log(obj);
    dispatch(updateBooking({ ...obj, id: props.selectedID }));
  };
  useEffect(() => {
    if (props.selectedID && !isCurBookingDetailsLoaded)
      dispatch(loadBookingDetails(props.selectedID));
  }, [props.selectedID, isCurBookingDetailsLoaded]);

  return (
    <Paper elevation={2} style={{ padding: 30, borderRadius: 25 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CoolPageHeader
            list={props.bookings}
            selectedID={props.selectedID}
            assetSrc={props.assetSrc}
            name={props.name}
            showAll={() => props.showAll()}
            setSelectedID={(id) => props.setSelectedID(id)}
            requestCreate={() => props.requestCreate()}
            requestDelete={(id) => props.requestDelete(id)}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CoolCard
            item={curBooking}
            itemKeys={["bookingstatus_id", "day", "fee", "area", "settype"]}
            itemLabels={["Status", "Day", "Fee", "Area", "Set type"]}
            itemProps={[
              { allowedValues: [1, 2, 3, 4] },
              Number,
              Number,
              String,
              String,
            ]}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CoolCard
            item={curBooking}
            itemKeys={["timetable"]}
            itemLabels={["Timetable"]}
            itemProps={[{ multiline: true }]}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CoolCard
            item={curBooking}
            itemKeys={["briefing"]}
            itemLabels={["Briefing"]}
            itemProps={[{ multiline: true }]}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CoolCard
            item={curBooking}
            itemKeys={["notes"]}
            itemLabels={["Notes"]}
            itemProps={[{ multiline: true }]}
            onChange={(obj) => onUpdateBooking(obj)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
