import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

 

import InputLabel from "@material-ui/core/InputLabel";
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core';

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
import {getFavouritesCountriesForDropDown, addCountryNameKey, getMapDataLayer, getArrofNameFromIso, getAllCountriesForDropDown} from '../helpers/helpers'
import AllCountriesSelection from '../components/AllCountriesSelection'
import {getHistoricalCountry} from '../hooks/useApplicationData'

import avatar from "assets/img/faces/marc.jpg";
import { isConstructSignatureDeclaration } from "typescript";
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

// const countryOptionsFavourites = [
//   { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
//   { key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
//   { key: 'al', value: 'al', flag: 'al', text: 'Albania' },

// ]



const periodicTime = [
  {key:'10', text: '10 days', value: '10'}, 
  {key:'20', text: '20 days', value: '20'}, 
  {key:'30', text: '30 days', value: '30'},
  {key:'60', text: '60 days', value: '60'}];

const useStyles = makeStyles(styles);

export default function Favourites({state, saveFavourites, getHistoricalCountry}) {

  const [country, setCountry] = useState({countryName: '', period: '20', error: ''});

  const [user, setUser] = useState('');
  const [favouritesFinal, setFavouritesFinal] = useState([]);
  console.log (state)


  
  useEffect(() => {
    setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")));
    console.log(JSON.parse(localStorage.getItem("favourites")))
  }, []);



  
  const classes = useStyles();

  const favouriteCountryHistorical = state.favouriteCountryHistorical;
  const favouriteCountryNews = state.favouriteCountryNews;

  !state.loadingFavouriteCountry && console.log('ffff', favouriteCountryNews)

  const newsList = !state.loadingFavouriteCountry &&
    favouriteCountryNews.articles.map((item, index) => {
      let publishedTime = moment.utc(item.publishedAt).toDate();
      let localTime = moment(publishedTime)
        .local()
        .format("YYYY-MM-DD HH:mm");
      let timeFormat = moment(localTime).fromNow();
      return (
          <CardNews
            newsTitle={item.title}
            newsDescription={item.description}
            newsURL={item.url}
            newsPublishedAt={timeFormat}
            source={item.source.name}
            urlToImage={item.urlToImage}

          />
      );
    })

    
  const mapData = getMapDataLayer(state.mapData)
  !state.loading && console.log(mapData[0])

  
  let days = [];
  let cases = [];
  let deaths = [];

  if (!state.loadingFavouriteCountry) {
    const casesObject = favouriteCountryHistorical.timeline.cases;

    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000);

    const deathsObject = favouriteCountryHistorical.timeline.deaths;
    deaths = Object.values(deathsObject).map(
      (e) => Number(e) / 1000
    );
  }

  const handleChange = (e: any, data?: any) => {
    // e.preventDefault()    
    console.log('handleChange',  e.target, data.value)
    getHistoricalCountry(data.value,  country.period)
    .then(()=>setCountry(prev=>({...prev, countryName: data.value, error:''})))
    .catch(() => {
      setCountry(prev=>({...prev, countryName: data.value, error: 'This country does not have historical data'}));
      console.log('state.loadingFavouriteCountry',state.loadingFavouriteCountry)
    })

  }



  const handleChangeTimeRadio = (e) => {
    console.log('time',e.target.value)
    setCountry(prev=>({...prev, period: e.target.value}))
    country.countryName && getHistoricalCountry(country.countryName, e.target.value)
    // .then(()=>setCountry(prev=>({...prev, period: e.target.value})))
    .catch(() => {
      setCountry(prev=>({...prev, period: e.target.value, error: 'This country does not have historical data'}));
      console.log('state.loadingFavouriteCountry',state.loadingFavouriteCountry)
    })


  }

const favouritesForDropDown = favouritesFinal.length > 0 && !state.loading && getFavouritesCountriesForDropDown(favouritesFinal, state.mapData)

  return (
    <div>      

      <GridContainer>

             {/* FAvourite countries dropdown menu */}

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Your Favourites Countries</h4>

            </CardHeader>
            <CardBody>
              <GridContainer>  

              <GridItem xs={12} sm={12} md={12}>
                <h4> Select a country to see more information</h4>  
     
                </GridItem> 

                { !state.loading && 
                <GridItem xs={12} sm={12} md={12}>
                   <Dropdown
                    placeholder='Select Country'
                    fluid
                    selection
                    onChange={handleChange}
                    options={favouritesForDropDown}
                  />   
                </GridItem> } 


                {!country.error  && country.countryName &&
                <GridItem xs={12} sm={12} md={12}>
                  <h4> <br/> </h4>  
     
                </GridItem> }


                        {/* /////////////////////////////////Radio Button//////////////// */}

                <GridItem xs={12} sm={12} md={12}>
          {!country.error  && country.countryName && 
                <FormControl component="fieldset">
                  <FormLabel component="legend"><strong>Select A time Interval</strong></FormLabel>
                  <RadioGroup row aria-label="time" name="time" value={country.period} onChange={handleChangeTimeRadio} >
                    <FormControlLabel value="10" control={<Radio />} label="10 days" />
                    <FormControlLabel value="20" control={<Radio />} label="20 days" />
                    <FormControlLabel value="30" control={<Radio />} label="30 days" />
                    <FormControlLabel value="60" control={<Radio />} label="60 days" />
                    <FormControlLabel value="90" control={<Radio />} label="90 days" />


                  </RadioGroup>
                </FormControl> 
              }    
                </GridItem> 



                      {/* Containter of error if no country added */}

              {favouritesFinal.length === 0 && !state.loading &&  

                <GridItem xs={12} sm={12} md={12}>
                <h4> No countries in you favourite list. Please go to the settings page first.</h4>
              
                </GridItem >


      }
              </GridContainer>
            </CardBody>
 
          </Card>
        </GridItem>    


              {/* Containter of error */}
    {country.error && 
    <GridItem xs={12} sm={12} md={6}>
    <h4>{country.error}</h4>
    </GridItem>}

    {/* Containter of country card */}

        <GridItem xs={12} sm={12} md={6}>

         { country.countryName && 
         <CardCountry
          mapData={mapData}
          countryName={country.countryName}         
         />
        }
        </GridItem>

      </GridContainer>


                  {/* Containter of charts */}

      { country.countryName && !country.error &&    
      <>
      <GridContainer>
                  {/* GridItem of 1st charts */}

        <GridItem xs={12} sm={12} md={6}>
        <CasesChart
            color="danger"
            title="deaths"
            days={days}
            series={deaths}
            multiple='Thousands'
            type="Bar"
            warning="warning"
            />

        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
        <CasesChart
              color="info"
              title="accumulated cases"
              days={days}
              series={cases}
              multiple='Thousands'

              type="Line"

          /> 
        </GridItem>


      </GridContainer>

      
      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
        {newsList[0]}

        </GridItem>


        <GridItem xs={12} sm={12} md={6}>
            {newsList[1]}

        </GridItem>
      </GridContainer>
</>

}


    </div>
  );
}
