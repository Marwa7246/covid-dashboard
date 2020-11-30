import React, { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const AllCountriesSelection = (props) => {
  const { onSave, countryOptions } = props;

  const [error, setError] = useState("");
  const [allFavouriteCountries, setAllFavouriteCountries] = useState([]);

  const classes = useStyles();


  const handleAllCountriesChange = (e: any, data?: any) => {

    setAllFavouriteCountries(data.value);
  };

  const validate = function () {
    if (allFavouriteCountries.length === 0) {
      setError("Country list cannot be blank");
      return;
    }
    setError("");
    onSave(allFavouriteCountries);
    setAllFavouriteCountries([])
  };


  return (
    <div>
      <GridContainer>
        {error && 
        <GridItem xs={12} sm={12} md={12}>
                {error}
        </GridItem>}

        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List of Countries</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <h4>Add countries to your favourite list</h4>
                </GridItem>

                <GridItem xs={12} sm={12} md={12}>
                  <Dropdown
                    placeholder="Enter atleast 3 characters for a quick search"
                    onChange={handleAllCountriesChange}
                    value={allFavouriteCountries}
                    defaultValue=''
                    fluid
                    multiple
                    selectOnNavigation={false}
                    search
                    selection
                    options={countryOptions}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button variant="contained" color="primary" onClick={validate}>
                SELECT
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer></GridContainer>
    </div>
  );
};
export default AllCountriesSelection;
