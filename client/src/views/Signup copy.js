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

import useSignup from "../hooks/useSignup";

export default function Signup(props) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [form, setForm] = useState("");

  //let confirm_password;

  const { signupShowing, toggleSignup } = useSignup();

  const validate = () => {
    if (!first_name) {
      setError("First Name is required!");
      return;
    }
    if (!last_name) {
      setError("Last Name is required!");
      return;
    }
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
      first_name,
      last_name,
      email,
      password,
      mobile,
    };
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
        // .then(resp => resp.json())
        .then((res) => {
          setUser(res.data);
          console.log("res after auto login : ", res);
          handleAuthClick();
        });
    }
  };

  const handleAuthClick = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`/user_is_authed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // .then(resp => resp.json())
      .then((data) => console.log(data));
  };

  const handleFormSwitch = (input) => {
    setForm(input);
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    axios
      .post(`/api/users`, { first_name, last_name, email, password, mobile })
      .then((res) => {
        // res.json();
        console.log(res);
        console.log("res.data is", res.data);
        localStorage.setItem("token", res.data.jwt);
        handleLogin(res.data.user);
        // toggleLogin();
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email or Password!");
      });

    //validate();

    setFirstName("");
    setLastName("");
    setMobile("");
    setEmail("");
    setPassword("");

    //validate();
  };

  useEffect(() => {
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
        });
    }
  }, []);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
  };

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
              <form onSubmit={handleSubmitSignup}>
                <CardHeader color="primary" style={{ color: "white" }}>
                  <h4>Register</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        labelText="First Name"
                        id="first-name"
                        placeholder="First Name"
                        value={first_name}
                        onChange={handleChangeFirstName}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        onSubmit={() => console.log("from submit")}
                        labelText="Last Name"
                        id="last-name"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={handleChangeLastName}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        labelText="Email address"
                        placeholder="Email address"
                        id="email"
                        value={email}
                        onChange={handleChangeEmail}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        labelText="Mobile Number"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={handleChangeMobile}
                        id="mobile"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        type="password"
                        labelText="Password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={handleChangePassword}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        labelText="Confirm Password"
                        placeholder="Confirm Password"
                        id="confirm-password"
                        value={confirm_password}
                        onChange={handleChangePassword}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem> */}
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button variant="contained" color="primary" type="submit">
                    Sign-Up
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
