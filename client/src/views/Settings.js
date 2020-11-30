import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Flag } from 'semantic-ui-react'


import "bootstrap/dist/css/bootstrap.min.css";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import {
  getFavouritesCountriesForDropDown,
  getArrofNameFromIso,
  getAllCountriesForDropDown,
  getMaxDifferenceCasesForSms,
} from "../helpers/helpers";
import AllCountriesSelection from "../components/AllCountriesSelection";

import "semantic-ui-css/semantic.min.css";

import "../assets/css/Settings.scss";

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

export default function Settings({
  state,
  saveFavourites,
  deleteFavourites,
  sendSMS
}) {
  // const [country, setCountry] = useState({
  //   countryName: "",
  // });
  const [favouritesFinal, setFavouritesFinal] = useState([]);
  const [user, setUser] = useState('');


/////////////////////////////////////////////////////////////////
  const [total, setTotal]=useState({country:''})
/////////////////////////////////////////////////////////////////


  useEffect(() => {
    setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")));
    const email = localStorage.getItem("userEmail");
    setUser(email);
  }, []);

  const favouritesForDropDown =
    user && getFavouritesCountriesForDropDown(favouritesFinal, state.mapData);

   const countryOptionsAll = getAllCountriesForDropDown(state.mapData);

  const countryOptions =
    user &&
    countryOptionsAll.filter(
      (ele) =>
        !favouritesForDropDown.filter((item) => item.text === ele.text).length
    );

  const classes = useStyles();


  // const mapData = getMapDataLayer(state.mapData);


  const ValidateSendSMS = () => {
  const countriesOfHighIncrease = getMaxDifferenceCasesForSms(state.historicalCountriesForSms)

    if (!state.loading && countriesOfHighIncrease.length) {
      sendSMS(countriesOfHighIncrease)
    }
  }



const onSave = (favourites) => {
    const arrOfFavCountryNames = getArrofNameFromIso(favourites, countryOptions);
    saveFavourites(arrOfFavCountryNames)
      .then(() => setFavouritesFinal(JSON.parse(localStorage.getItem("favourites"))))
      .then(()=>ValidateSendSMS())
  };



   const handleChangeRemove = (event) => {
      setTotal({...total, country: event.target.name});

      deleteFavourites(event.target.name)
      .then(()=> {
        setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")))
      })
      
    };

    const favList = user && favouritesFinal.length > 0 && !state.loading &&  favouritesForDropDown.map(ele =>{
      return (
        <FormGroup column>
        <FormControlLabel 
          key={ele}
          control={<Checkbox 
          checked={true} 
          onChange={handleChangeRemove} name={ele.text} 
          color="primary"
          />}
          label={<span className='toBeHovered' ><Flag name= {ele.key} /><strong>{ele.text}</strong> <span className='box'>DELETE</span></span>}
        />
      </FormGroup>
  
      )
    } 
    )
    ////////////////////////////////////////////////////////
  return (
    <div>

  {user && <>

      {!state.loading && favouritesForDropDown && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {<AllCountriesSelection onSave={onSave} defaultValue={favouritesFinal} countryOptions={countryOptions}
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
                    <h4> You can remove countries from your list by unticking the checkbox</h4>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                  {favouritesFinal.length > 0 && !state.loading && user &&favList}


                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        )}

      </GridContainer>

</>
}
    </div>
  );
}
