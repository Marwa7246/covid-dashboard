import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import InputLabel from "@material-ui/core/InputLabel";

import moment from "moment";

// core components
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
import CardCountry from "components/CardCountry.js";
import {
  getFavouritesCountriesForDropDown,
  addCountryNameKey,
  getMapDataLayer,
} from "../helpers/helpers";
import AllCountriesSelection from "../components/AllCountriesSelection";
import { getHistoricalCountry } from "../hooks/useApplicationData";

import avatar from "assets/img/faces/marc.jpg";
import { isConstructSignatureDeclaration } from "typescript";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

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

const countryOptionsFavourites = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "ca", value: "ca", flag: "ca", text: "Canada" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
];

const periodicTime = [
  { key: 10, text: 10, value: 10 },
  { key: 20, text: 20, value: 20 },
  { key: 30, text: 30, value: 30 },
];

const useStyles = makeStyles(styles);

export default function Settings({
  state,
  saveFavourites,
  getHistoricalCountry,
}) {
  const [country, setCountry] = useState({
    countryName: "",
    period: "",
    error: "",
  });

  console.log('hellooooooooooooooooooooooo')

  const [user, setUser] = useState("");
  const [favouritesFinal, setFavouritesFinal] = useState([]);

  useEffect(() => {
    setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")));
  }, []);

  const classes = useStyles();




  const mapData = getMapDataLayer(state.mapData);
  !state.loading && console.log(mapData[0]);





  const handleChange = (e: any, data?: any) => {
    e.preventDefault();
    console.log("handleChange", e.target, data.value);
    setCountry((prev) => ({
      ...prev,
      countryName: data.value,
      error: "",
      period: 0,
    }));
  };



  const onSave = (favourites) => {
    console.log(favourites);
    saveFavourites(favourites)
      .then(() => console.log(localStorage.getItem("favourites"))
 
       )
      .then(() => setFavouritesFinal(JSON.parse(localStorage.getItem("favourites"))));
  };

  const favouritesForDropDown =
    favouritesFinal.length > 0 &&
    !state.loading &&
    getFavouritesCountriesForDropDown(favouritesFinal, state.mapData);

  return (
    <div>


      {!state.loading && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {<AllCountriesSelection onSave={onSave} defaultValue={favouritesFinal}
            />}
          </GridItem>
        </GridContainer>
      )}

      <GridContainer>
        {favouritesFinal.length > 0 && !state.loading && (
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  List of Your Favourites Countries
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <h4> You can add or remove countries from your list</h4>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <Dropdown
                      placeholder="Select Country"
                      fluid
                      selection
                      onChange={handleChange}
                      options={favouritesForDropDown}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        )}



      </GridContainer>


    </div>
  );
}
