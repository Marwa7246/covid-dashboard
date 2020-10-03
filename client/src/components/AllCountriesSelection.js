import React, { useState, useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";

import StateContext from "../StateContext";
import { getAllCountriesForDropDown } from "../helpers/helpers";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CasesChart from "components/CasesChart.js";
import CardNews from "components/CardNews.js";
import { getMapDataLayer } from "../helpers/helpers";
import CardCountry from "components/CardCountry.js";

const MAX_COUNTRIES_SELECTION = 3;

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

<<<<<<< HEAD
const AllCountriesSelection = ({ onSave }) => {
=======
const AllCountriesSelection = (props) => {
  console.log(props)
  const {onSave, defaultValue} =props
  
>>>>>>> 49a54ca3ee168095fdcf6d4bcff836aa069567fb
  const [error, setError] = useState("");
  const [allFavouriteCountries, setAllFavouriteCountries] = useState([]);
  const state = useContext(StateContext);

  const countryOptions =
    !state.loading && getAllCountriesForDropDown(state.mapData);
  // console.log(countryOptions)

  const classes = useStyles();

  // const countryOptions = [
  //   { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  //   { key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
  //   { key: 'al', value: 'al', flag: 'al', text: 'Albania' },

  // ]

  const handleAllCountriesChange = (e: any, data?: any) => {
    // if (data.value.length <= MAX_COUNTRIES_SELECTION) {
    //   setAllFavouriteCountries(data.value);
    // }
    setAllFavouriteCountries(data.value);
  };

  const validate = function () {
    if (allFavouriteCountries.length === 0) {
      setError("Country list cannot be blank");
      return;
    }
    setError("");
    onSave(allFavouriteCountries);
  };

  // console.log(allFavouriteCountries)

  return (
    <div>

    <GridContainer>

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
              placeholder="Select Countries"
              onChange={handleAllCountriesChange}
              value={allFavouriteCountries}
              defaultValue={defaultValue}
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

<GridContainer>

</GridContainer>
</div>
  );
};
export default AllCountriesSelection;
