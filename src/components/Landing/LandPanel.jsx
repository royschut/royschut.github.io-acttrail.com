import {
  Box,
  Button,
  Divider,
  Fade,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import LandingArt from "./LandingArt";

const useStyles = makeStyles((theme) => {
  const primaryLeads = true;
  const colorOne = primaryLeads
    ? theme.palette.primary
    : theme.palette.secondary;
  const colorTwo = !primaryLeads
    ? theme.palette.primary
    : theme.palette.secondary;

  return {
    header: {
      width: "100vw",
      height: "65vh",
      position: "relative",
      borderRadius: 0,
      backgroundColor: colorOne.main,
      color: colorTwo.contrastText,
    },
    logo: {
      cursor: "pointer",
      color: "white",
    },
    landingArt: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    headerContent: {
      position: "absolute",
      width: "100vw",
      height: "100%",
      padding: 30,
    },
    headerMain: {
      width: "100%",
      height: "100%",
      paddingTop: "8%",
    },
    headerBtn: {
      color: colorTwo.contrastText,
    },
    discoverBtn: {
      marginTop: 60,
      paddingLeft: 80,
      paddingRight: 80,
      fontSize: "1.5em",
      boxShadow: theme.boxShadowBoth,
      backgroundColor: colorTwo.main,
      color: colorOne.dark,
      "&:hover": {
        boxShadow: "2px 1px 1px 4px rgba(0,0,0,0.01)",
        color: "white",
        // backgroundColor: colorOne.light,
      },
    },
  };
});

export default function LandPanel(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.header} elevation={3}>
      <Fade in={props.fadeIn} timeout={props.stepTime}>
        <div>
          <LandingArt className={classes.landingArt} />
        </div>
      </Fade>
      <Box className={classes.headerContent}>
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h4"
            className={classes.logo}
            onClick={(e) => props.resetLanding()}
          >
            Acttrail
          </Typography>
          <Box display="flex" flexDirection="row">
            <Button
              onClick={(e) => props.signUp()}
              className={classes.headerBtn}
            >
              Sign Up
            </Button>
            <Divider orientation="vertical" />
            <Button
              onClick={(e) => props.signIn()}
              className={classes.headerBtn}
            >
              Log In
            </Button>
          </Box>
        </Box>
        <Box
          className={classes.headerMain}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2">Acttrail</Typography>
          <Typography variant="h6">Managing the music scene</Typography>
          <Button
            variant="outlined"
            size="large"
            className={classes.discoverBtn}
            color={"secondary"}
            onClick={(e) => props.discover()}
          >
            Discover
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
