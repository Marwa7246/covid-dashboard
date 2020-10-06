import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Flag, Segment } from 'semantic-ui-react'


import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import InputLabel from "@material-ui/core/InputLabel";

import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
  getArrofNameFromIso,
  getAllCountriesForDropDown,
  getMaxDifferenceCasesForSms
  
} from "../helpers/helpers";
import AllCountriesSelection from "../components/AllCountriesSelection";

import avatar from "assets/img/faces/marc.jpg";
import { isConstructSignatureDeclaration } from "typescript";
import "semantic-ui-css/semantic.min.css";
import { Dropdown } from "semantic-ui-react";

import '../assets/css/Settings.scss'




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
  const [country, setCountry] = useState({
    countryName: "",
  });
  const [favouritesFinal, setFavouritesFinal] = useState([]);

/////////////////////////////////////////////////////////////////
  const [total, setTotal]=useState({country:''})
/////////////////////////////////////////////////////////////////


  useEffect(() => {
    setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")));
    console.log(JSON.parse(localStorage.getItem("favourites")));
 }, []);
  const favouritesForDropDown =    
    getFavouritesCountriesForDropDown(favouritesFinal, state.mapData);

    console.log(favouritesForDropDown)

   const countryOptionsAll = getAllCountriesForDropDown(state.mapData);

  const countryOptions = countryOptionsAll.filter(ele =>  !favouritesForDropDown.filter(item=>item.text === ele.text).length )

   !state.loading && console.log('test', favouritesForDropDown, countryOptions.length, countryOptionsAll.length )

   
 

  const classes = useStyles();





  const mapData = getMapDataLayer(state.mapData);
  !state.loading && console.log(mapData[0]);


  const ValidateSendSMS = () => {
  const countriesOfHighIncrease = getMaxDifferenceCasesForSms(state.historicalCountriesForSms)

    if (!state.loading && countriesOfHighIncrease.length) {
      console.log ('countriesOfHighIncrease', countriesOfHighIncrease)
      sendSMS(countriesOfHighIncrease)
    }
  }





const onSave = (favourites) => {
    console.log(favourites);
    const arrOfFavCountryNames = getArrofNameFromIso(favourites, countryOptions);
    console.log(arrOfFavCountryNames, favourites)
    saveFavourites(arrOfFavCountryNames)
      .then(() => console.log(localStorage.getItem("favourites")))
      .then(() => setFavouritesFinal(JSON.parse(localStorage.getItem("favourites"))))
      .then(()=>ValidateSendSMS())
  };




   const handleChangeRemove = (event) => {
      const newFav = favouritesForDropDown.filter(ele => ele.text!==event.target.name )
      setTotal({...total, country: event.target.name});
      console.log (event.target, newFav)

      deleteFavourites(event.target.name)
      .then(()=> {
        console.log(JSON.parse(localStorage.getItem("favourites")))
        setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")))
      })
      
    };

    const favList = favouritesFinal.length > 0 && !state.loading &&  favouritesForDropDown.map(ele =>{
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
                  {favouritesFinal.length > 0 && !state.loading && favList}


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
