import React from "react";
import { Typography, Grid, Paper, Box } from "@material-ui/core";
import CheckLists from "./CheckLists";
import { useDispatch, useSelector } from "react-redux";
import { selectEventList } from "../../../../redux/booker/eventsSlice";
import ExpandPanel from "../../../general/CoolCard/ExpandPanel";
import { selectBookingList } from "../../../../redux/booker/bookingsSlice";
import {
  selectAllBookingsWithEvents,
  selectBookingsWithArtistsForCurEvent,
} from "../../../../redux/store";

export default function Dashboard(props) {
  const dispatch = useDispatch();

  //   const artists = useSelector(selectArtistList);
  const events = useSelector(selectEventList);
  let bookings = []; //useSelector(selectAllBookingsWithEvents);

  const futureBookings = bookings.filter((b) => {
    return new Date(b.date) > new Date();
  });
  const cnt = 0;
  const arr = [];
  const latestBookings = bookings
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reverse()
    .map((b) => {
      // if (cnt++ < 5) arr.push(b);
    });

  // console.log(arr.map((i) => i.date));

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <Box>
            <Box mb={5}>
              <ExpandPanel
                title="Bookings"
                featured
                headerIcon={"fas fa-calendar-check"}
              >
                <Typography variant="body1">
                  {"You have " + futureBookings.length + " coming bookings"}
                </Typography>
                <Typography variant="h6">Latest additions;</Typography>
                <Typography variant="body1">
                  {latestBookings.map((b) => b.name)}
                </Typography>
              </ExpandPanel>
            </Box>
            <Box mb={5}>
              <ExpandPanel
                title="Checklists"
                hasBackground
                headerIcon={"fas fa-calendar-check"}
              >
                <CheckLists preview />
              </ExpandPanel>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box>
            <Box mb={5}>
              <ExpandPanel
                title="Artists"
                hasBackground
                headerIcon={"fas fa-headphones"}
              >
                <Typography variant="body1">15 Artists total</Typography>
              </ExpandPanel>
            </Box>
            <Box mb={5}>
              <ExpandPanel
                title="Fee"
                hasBackground
                headerIcon={"fas fa-money-bill"}
              >
                <Typography variant="body1">
                  You've collected 15.100,- this month
                </Typography>
              </ExpandPanel>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
