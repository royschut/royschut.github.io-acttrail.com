import {
  Box,
  Fade,
  Icon,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    showcase1: {
      width: "100%",
      height: "35vh",
      color: theme.palette.primary.main,
    },
    showcaseItems: {
      height: "100%",
    },
    showcaseItem: {
      marginRight: 60,
    },
    showcaseIcon: {
      fontSize: "70px",
      textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
      marginRight: 20,
      marginBottom: 20,
      minWidth: 100,
      color: theme.palette.primary.main,
    },
    arrowDown: {
      width: 0,
      height: 0,
      cursor: "pointer",
      borderLeft: "40px solid transparent",
      borderRight: "40px solid transparent",
      borderTop: "30px solid " + theme.palette.primary.dark,
      marginBottom: 50,
      "&:hover": {
        borderTop: "30px solid " + theme.palette.primary.main,
      },
    },
  };
});

export default function LandSub(props) {
  const classes = useStyles();
  return (
    <Fade in={props.fadeIn} timeout={props.stepTime}>
      <Box display="flex" flexDirection="column" className={classes.showcase1}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          className={classes.showcaseItems}
        >
          <Box
            display="flex"
            flexDirection="column"
            className={classes.showcaseItem}
          >
            <Box display="flex" flexDirection="row">
              <Icon
                className={"fas fa-headphones " + classes.showcaseIcon}
                color={"primary"}
                size="large"
              />
              <Typography variant="h3">Artists</Typography>
            </Box>
            <Typography variant="body1">Manage artists</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.showcaseItem}
          >
            <Box display="flex" flexDirection="row">
              <Icon
                className={"fas fa-calendar-check " + classes.showcaseIcon}
                color={"primary"}
                size="large"
              />
              <Typography variant="h3">Events</Typography>
            </Box>
            <Typography variant="body1">Manage events and bookings</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.showcaseItem}
          >
            <Box display="flex" flexDirection="row">
              <Icon
                className={"fas fa-plane-departure " + classes.showcaseIcon}
                color={"primary"}
                size="large"
              />
              <Typography variant="h3">Travel</Typography>
            </Box>
            <Typography variant="body1">Organize travel schedules</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.nextstepDiv}
        >
          <div
            className={classes.arrowDown}
            onClick={(e) => props.nextStep()}
          ></div>
        </Box>
      </Box>
    </Fade>
  );
}
