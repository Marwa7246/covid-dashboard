import React, { useState, useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
import TextField from "@material-ui/core/TextField";

import useLogin from "./useLogin";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");

  const { loginShowing, toggleLogin } = useLogin();

  const validate = () => {
    if (!email) {
      setError("Email is required!");
      return;
    }
    if (!password) {
      setError("Password is required!");
      console.log(error);
      return;
    }

    const user = {
      email,
      password,
    };
  };
//////////////////////////////////// 2- after login ---> auto login ---> get requet to auto login
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
        // .then(resp => resp.json())
        .then((res) => {
          setUser(res.data);
          console.log("res after auto login : ", res);
          handleAuthClick();
        });
    }
  };
///////////////////////////3- after auto login, get to user_is_auth
  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`/user_is_authed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // .then(resp => resp.json())
      .then((data) => console.log('final login ', data));
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };
////////////////////////// 1- after submitting the form--post request to login
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/login`, { email, password })
      .then((res) => {
        // res.json();
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token", res.data.jwt);
        handleLogin(res.data.user);
        // toggleLogin();
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email or Password!");
      });
    setEmail("");
    setPassword("");

    // validate();
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get(`/auto_login`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       // .then(resp => resp.json())
  //       .then((res) => {
  //         setUser(res.data);
  //         console.log("res after auto login : ", res);
  //       });
  //   }
  // }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <div>
              <br />
              {error && <p>{error}</p>}
              <form onSubmit={handleSubmit}>
                <CardHeader color="primary" style={{ color: "white" }}>
                  <h4>Enter your credentials</h4>
                </CardHeader>

                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        labelText="Email address"
                        id="email"
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        onChange={handleChangePassword}
                        labelText="Password"
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </div>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
