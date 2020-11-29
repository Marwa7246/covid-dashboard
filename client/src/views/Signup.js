import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";

import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import imagine4 from "assets/img/4.png";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${imagine4})`,
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

export default function Signup(props) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // const history = useHistory();
  const classes = useStyles();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!first_name || !last_name || !email || !mobile || !password) {
      setError("All fields required!");

      return;
    }
    const user = { first_name, last_name, email, password, mobile };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}api/users`, { user })
      .then((res) => {
        console.log(res.data.user);
        setMessage("Registration Successful! Please login to proceed...");
      })
      .catch((err) => {
        console.log(err);
        setError("Email Already Exists!");
      });

    setFirstName("");
    setLastName("");
    setMobile("");
    setEmail("");
    setPassword("");
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
              <div>
                {message && (
                  <Alert severity="success">
                    <b>{message && <p>{message}</p>}</b>
                  </Alert>
                )}
              </div>
            </GridItem>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                labelText="First Name"
                id="first-name"
                placeholder="First Name"
                value={first_name}
                onChange={handleFirstNameChange}
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                labelText="Last Name"
                id="last-name"
                placeholder="Last Name"
                value={last_name}
                onChange={handleLastNameChange}
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                labelText="Mobile Number"
                placeholder="Mobile Number"
                value={mobile}
                onChange={handleMobileChange}
                id="mobile"
                formControlProps={{
                  fullWidth: true,
                }}
              />
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
                Sign Up
              </Button>
            </form>
          </div>
        </GridContainer>
      </Grid>
    </Grid>
  );
}
