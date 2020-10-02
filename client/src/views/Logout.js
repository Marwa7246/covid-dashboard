import React from "react";
import Image from "material-ui-image";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useHistory } from "react-router-dom";

export default function Logout() {

  const history = useHistory();

    // localStorage.setItem("user", null);
    // localStorage.setItem("userEmail", null);
    localStorage.removeItem('userEmail')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    console.log("Logging out");
    history.push("/dashboard");
    // localStorage.setItem("token", null);
const handleLogout = () => {

  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <card>
            <div>
              <Image
                src="https://media.rainpos.com/2706/covid_infographic.jpg"
                onClick={handleLogout}
              />
            </div>
          </card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
