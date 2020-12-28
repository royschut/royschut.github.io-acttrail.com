import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { Paper } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="mailto:royschut@gmail.com">
        Acttrail
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  signBox: {
    width: "100vw",
    height: "90vh",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 500,
    minWidth: 250,
    margin: 30,
    padding: 30,
    borderRadius: 20,
  },
  title: {
    marginBottom: 10,
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// const VS_LANDING = 1;
const VS_SIGNIN = 2;
const VS_SIGNUP = 3;

export default function SignView(props) {
  const classes = useStyles();
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={classes.signBox}
      >
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          {props.viewState === VS_SIGNIN && (
            <>
              <Typography variant="h5">Log in</Typography>
              <SignIn
                classes={classes}
                requestSignUp={(e) => props.setViewState(VS_SIGNUP)}
                signIn={(email, pass) => props.signIn(email, pass)}
              />
            </>
          )}
          {props.viewState === VS_SIGNUP && (
            <>
              <Typography variant="h5" className={classes.title}>
                Sign up
              </Typography>
              <SignUp
                classes={classes}
                requestSignIn={(e) => props.setViewState(VS_SIGNIN)}
              />
            </>
          )}
        </Paper>
        <Box>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
