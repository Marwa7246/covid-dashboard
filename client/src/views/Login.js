import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { getFavouritesCountriesForDropDown } from "../helpers/helpers";
import Alert from "@material-ui/lab/Alert";

import imagine3 from "assets/img/3.png";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${imagine3})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [favouritesFinal, setFavouritesFinal] = useState([]);

  const history = useHistory();

  const classes = useStyles();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields required!");
      return;
    }

    axios
      .post(`/login`, { email, password })
      .then((res) => {
        localStorage.setItem("user", res.data.user);
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userFirstName", res.data.user.first_name);
        localStorage.setItem("token", res.data.jwt);
        localStorage.setItem("favourites", JSON.stringify(res.data.favourites));

        handleLogin(res.data.user);
      })
      .catch((err) => {
        setError("Incorrect Email or Password!");
      });
    setEmail("");
    setPassword("");
  };

  const handleLogin = (user) => {
    setUser(user);
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`/auto_login`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          handleAuthClick();
        });
    }
  };

  const handleAuthClick = () => {
    setError("");
    const token = localStorage.getItem("token");
    axios
      .get(`/user_is_authed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email or Password!");
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <GridContainer>
          <div className={classes.paper}>
            <GridItem>
              <div>
                {error && (
                  <Alert severity="error">
                    <b>{error && <p>{error}</p>}</b>
                  </Alert>
                )}
              </div>
            </GridItem>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                //required
                fullWidth
                id="email"
                value={email}
                onChange={handleEmailChange}
                label="Email Address"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                //required
                fullWidth
                label="Password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                id="password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </GridContainer>
      </Grid>
    </Grid>
  );
}
