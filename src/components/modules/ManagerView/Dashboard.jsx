import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";
import CheckLists from "./CheckLists";

export default function Dashboard(props) {
  return (
    <React.Fragment>
      <br />
      <Grid container spacing={5}>
        <Grid item md={8} xs={12}>
          <Paper>
            <Typography variant="h6">Bookings</Typography>
            <Typography variant="body1">You have 29 coming bookings</Typography>
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid container spacing={5}>
            <Grid item xl={6} xs={12}>
              <Paper>
                <Typography variant="h6">Checklists</Typography>
                <Typography variant="body1"></Typography>
                <CheckLists preview />
              </Paper>
            </Grid>
            <Grid item xl={6} xs={12}>
              <Paper>
                <Typography variant="h6">Fee</Typography>
                <Typography variant="body1">
                  You've collected 15.100,- this month
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
