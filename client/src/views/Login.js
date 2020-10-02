import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";

import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/login`, { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", res.data.user.email);
        console.log("login user is", res.data.user, res.data.jwt );
        localStorage.setItem("token", res.data.jwt)
        localStorage.setItem("favourites", JSON.stringify(res.data.favourites))
        console.log("favourites", JSON.stringify(res.data.favourites));

        // props.getFavourites(res.data.user.email)
        //props.handleLogin(res.data.user);
        history.push("/dashboard");
        //console.log(history.location);
      })
      .catch((err) => {
        console.log(err);
        setError("Incorrect Email or Password!");
        localStorage.setItem("user", null);
        localStorage.setItem("token", null);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <h2 style={{ color: "red" }}>{error && <p>{error}</p>}</h2>
          </Card>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader color="primary" style={{ color: "white" }}>
                <h4>Login</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      labelText="Email address"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
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
                      onChange={handlePasswordChange}
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
                  Submit
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
