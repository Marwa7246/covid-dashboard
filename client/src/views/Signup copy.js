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
import Alert from "@material-ui/lab/Alert";

import axios from "axios";

export default function Signup(props) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

  const history = useHistory();

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
      setFirstName("");
      setLastName("");
      setMobile("");
      setEmail("");
      setPassword("");
      return;
    }
    const user = { first_name, last_name, email, password, mobile };
    axios
      .post(`/api/users`, { user })
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
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
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader color="primary" style={{ color: "white" }}>
                <h4>Signup</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <TextField
                      labelText="First Name"
                      id="first-name"
                      placeholder="First Name"
                      value={first_name}
                      onChange={handleFirstNameChange}
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
                      onChange={handleLastNameChange}
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
                      onChange={handleEmailChange}
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
                      onChange={handleMobileChange}
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
                      onChange={handlePasswordChange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button variant="contained" color="primary" type="submit">
                  Register
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
