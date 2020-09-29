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

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // Add code to return navigate to the home page
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" style={{ color: "white" }}>
              <h4>Enter your credentials</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Email address"
                    id="email"
                    value={username}
                    onChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {submitted && !username && (
                    <div className="invalid-feedback">Email ID is required</div>
                  )}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                  {submitted && !password && (
                    <div className="invalid-feedback">Password is required</div>
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  alert("clicked");
                }}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
