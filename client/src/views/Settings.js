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
  getAllCountriesForDropDown
} from "../helpers/helpers";
import AllCountriesSelection from "../components/AllCountriesSelection";
import { getHistoricalCountry } from "../hooks/useApplicationData";

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

const countryOptionsFavourites = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "ca", value: "ca", flag: "ca", text: "Canada" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
];



const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// let array = ['1','2','3','4']



const useStyles = makeStyles(styles);

export default function Settings({
  state,
  saveFavourites,
  deleteFavourites
}) {
  const [country, setCountry] = useState({
    countryName: "",
  });
  const [favouritesFinal, setFavouritesFinal] = useState([]);
  // const[countryOptions, setCountryOptions] = useState([]);

/////////////////////////////////////////////////////////////////
  const [total, setTotal]=useState({country:''})
/////////////////////////////////////////////////////////////////

// let favouritesForDropDown= []

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

  //  setCountryOptions(updatedCountryOptions)

    
 

  const classes = useStyles();





  const mapData = getMapDataLayer(state.mapData);
  !state.loading && console.log(mapData[0]);


  



const onSave = (favourites) => {
    console.log(favourites);
    const arrOfFavCountryNames = getArrofNameFromIso(favourites, countryOptions);
    console.log(arrOfFavCountryNames, favourites)
    saveFavourites(arrOfFavCountryNames)
      .then(() => console.log(localStorage.getItem("favourites")))
      .then(() => setFavouritesFinal(JSON.parse(localStorage.getItem("favourites"))));
  };




    ////////////////////////////////////////////////////////

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
          label={<a className='toBeHovered' href="#"><Flag name= {ele.key} /><strong>{ele.text}</strong> <span className='box'>DELETE</span></a>}
        />
      </FormGroup>
  // <span className='mouseHover '><Flag name= {ele.key} /><strong>{ele.text}</strong> <span className='.hoverBox'>DELETE</span></span>
  
      )
    } 
    )
    ////////////////////////////////////////////////////////
  return (
    <div>
<a className='toBeHovered' href="#">Hover Me!<span className='box'>Hello, World!</span></a>

      {!state.loading && (
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
                  {/* <p className='mouseHover' >Hover here<span className='hoverBox'>remove</span></p> */}
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <h4> You can remove countries from your list by unchecking the CheckBox</h4>
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
