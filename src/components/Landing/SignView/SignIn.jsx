import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

import { local } from "../../../data/Constants";

export default function SignIn(props) {
  const [email, setEmail] = useState("demo");
  const [pass, setPass] = useState("demodemo123321");

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && pass) {
      props.signIn({ email: email, pass: pass });
    } else {
      //todo: validate
    }
  };
  return (
    <React.Fragment>
      <form
        className={props.classes.form}
        noValidate
        onSubmit={(e) => onSubmit(e)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={(e) => props.requestSignUp()}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
      {local && (
        <Box style={{ padding: 50 }}>
          <h5>Debug</h5>
          <Button
            onClick={(e) =>
              props.signIn({ email: "demo", pass: "demodemo123321" })
            }
          >
            Demo user: Booker
          </Button>
          <Button
            onClick={(e) =>
              props.signIn({ email: "demo2", pass: "demodemo123321" })
            }
          >
            Demo user: Artist
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}
