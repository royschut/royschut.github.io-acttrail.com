import { Box, Button, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      width: "100vw",
      height: "30vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
  };
});

export default function Footer(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.footer} component="footer" elevation={10}>
      <Button color="primary" onClick={(e) => props.home()}>
        Home
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => props.signUp()}
      >
        Sign up
      </Button>
    </Paper>
  );
}
