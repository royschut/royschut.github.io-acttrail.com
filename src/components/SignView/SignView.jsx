import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import SignUp from "./SignUp";
import SignIn from "./SignIn";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="mailto:royschut@gmail.com">
        Actrale
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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

const P_SIGNIN = 0;
const P_SIGNUP = 1;
const P_DEFAULT = P_SIGNIN;

export default function SignView(props) {
  const classes = useStyles();

  const [page, setPage] = useState(P_DEFAULT);

  //temp:
  // useEffect(() => {
  //   props.onSignIn();
  // }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in/Sign up
        </Typography>
        {page === P_SIGNIN && (
          <SignIn
            classes={classes}
            requestSignUp={(e) => setPage(P_SIGNUP)}
            signIn={(email, pass) => props.signIn(email, pass)}
          />
        )}
        {page === P_SIGNUP && (
          <SignUp classes={classes} requestSignIn={(e) => setPage(P_SIGNIN)} />
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
