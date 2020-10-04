import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";

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
import { isConstructSignatureDeclaration, textSpanContainsPosition } from "typescript";
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
  const [total, setTotal]=useState({country:'', confirmDelete: false, favouritesForDropDown: []})
/////////////////////////////////////////////////////////////////
  const classes = useStyles();


  useEffect(() => {
    const finalWithCheked = JSON.parse(localStorage.getItem("favourites"));
    console.log('mapAgain', finalWithCheked);
    setFavouritesFinal(finalWithCheked)
    console.log('map', JSON.parse(localStorage.getItem("favourites")));

    !state.loading &&  setTotal({...total, favouritesForDropDown: getFavouritesCountriesForDropDown(favouritesFinal, state.mapData)});

 }, []);
  

    console.log(total.favouritesForDropDown)

   const countryOptionsAll = getAllCountriesForDropDown(state.mapData);

  const countryOptions = countryOptionsAll.filter(ele =>  !total.favouritesForDropDown.filter(item=>item.text === ele.text).length )

   !state.loading && console.log('test', total.favouritesForDropDown, countryOptions.length, countryOptionsAll.length )

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

  const validate =() => {
      const newFav = total.favouritesForDropDown.filter(ele => ele.text!==total.country )
      console.log ('total again', total, newFav)
      deleteFavourites(total.country)
      .then(()=> {
        console.log(JSON.parse(localStorage.getItem("favourites")))
        setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")))
         setTotal({...total, confirmDelete: false})

       })

  }

  const cancel =() => {
       setTotal({...total, confirmDelete: false})
}


    ////////////////////////////////////////////////////////

    const handleChangeRemove = (event) => {
      // setTotal({...total, })
      setTotal({...total, confirmDelete: true, checked: false, country: event.target.name});

      console.log ('total', total)


      
    };

    const favList = favouritesFinal.length > 0 && !state.loading &&  total.favouritesForDropDown.map(ele =>{
      return (
        <FormGroup column>
        <FormControlLabel
          key={ele}
          control={<GreenCheckbox 
          checked={ele.checked} 
          onChange={handleChangeRemove} name={ele.text} />}
          label={ele.text}
        />
      </FormGroup>
  
  
      )
    } 
    )
    ////////////////////////////////////////////////////////
  return (
    <div>


      {!state.loading && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            {<AllCountriesSelection onSave={onSave} defaultValue={favouritesFinal} countryOptions={countryOptions}
            />}
          </GridItem>
        </GridContainer>
      )}

      <GridContainer>

          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  List of Your Favourites Countries
                </h4>
              </CardHeader>
              <CardBody>
                            {favouritesFinal.length > 0 && !state.loading && (            

                <GridContainer>

                  <GridItem xs={12} sm={12} md={12}>
                    <h4> You can remove countries from your list by unchecking the CheckBox</h4>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                  {favouritesFinal.length > 0 && !state.loading && favList}

                  </GridItem>
                </GridContainer>)}
              </CardBody>

              <CardFooter>
    { total.confirmDelete &&

              <GridItem>
                <h4> Are you sure?</h4>

                <Button variant="contained" color="danger" onClick={validate}>
                  DELETE
                </Button>
                <Button variant="contained" color="primary" onClick={cancel}>
                  CANCEL
                </Button>            
              
 
              </GridItem>
             }
            </CardFooter>
            </Card>
          </GridItem>
        



      </GridContainer>
      {/* {favouritesFinal.length > 0 && !state.loading && favList} */}


    </div>
  );
}
