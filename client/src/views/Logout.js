import React from "react";
import Image from "material-ui-image";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.setItem("user", null);
    localStorage.setItem("token", null);
    console.log("Logging out");
    history.push("/dashboard");
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