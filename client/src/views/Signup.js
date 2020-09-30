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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

    axios
      .post(`http://localhost:3002/dashboard`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        toggleLogin();
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email or Password!");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validate();
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
