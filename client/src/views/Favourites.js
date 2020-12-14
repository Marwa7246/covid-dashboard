import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import 'bootstrap/dist/css/bootstrap.min.css';

import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";

import moment from "moment";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CasesChart from "components/CasesChart.js";
import CardNews from "components/CardNews.js";
import CardCountry from "components/CardCountry.js";
import {getFavouritesCountriesForDropDown, getMapDataLayer,} from '../helpers/helpers'

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

const useStyles = makeStyles(styles);

export default function Favourites({state, saveFavourites, getHistoricalCountry}) {

  const [country, setCountry] = useState({countryName: '', period: '20', error: ''});

  const [user, setUser] = useState('');
  const [favouritesFinal, setFavouritesFinal] = useState([]);
  
  useEffect(() => {
    setFavouritesFinal(JSON.parse(localStorage.getItem("favourites")));
    const email = localStorage.getItem("userEmail");
    setUser(email);
  }, []);

  
  const classes = useStyles();

  const favouriteCountryHistorical = state.favouriteCountryHistorical;
  const favouriteCountryNewsDuplicated = state.favouriteCountryNews;

  let favouriteCountryNews = [];
  if (!state.loading) {
    favouriteCountryNews = favouriteCountryNewsDuplicated.articles.filter((ele, index) => {
      return (
        favouriteCountryNewsDuplicated.articles.findIndex(
          (obj) => obj.title === ele.title
        ) === index
      );
    });
  }


  const newsList = !state.loadingFavouriteCountry &&
    favouriteCountryNews.map((item, index) => {
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
            image={item.image}
          />
      );
    })

    
  const mapData = getMapDataLayer(state.mapData)

  
  let days = [];
  let cases = [];
  let deaths = [];

  if (!state.loadingFavouriteCountry) {
    const casesObject = favouriteCountryHistorical.timeline.cases;

    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000);

    const deathsObject = favouriteCountryHistorical.timeline.deaths;
    deaths = Object.values(deathsObject).map((e) => Number(e) / 1000);
  }

  const handleChange = (e: any, data?: any) => {
    // e.preventDefault()
    getHistoricalCountry(data.value,  country.period)
      .then(() =>
        setCountry((prev) => ({ ...prev, countryName: data.value, error: "" }))
      )
      .catch(() => {
        setCountry((prev) => ({
          ...prev,
          countryName: data.value,
          error: "This country does not have historical data",
        }));
      });
  };

  const handleChangeTimeRadio = (e) => {
    setCountry((prev) => ({ ...prev, period: e.target.value }));
    country.countryName &&
      getHistoricalCountry(country.countryName, e.target.value).catch(() => {
        setCountry((prev) => ({
          ...prev,
          period: e.target.value,
          error: "This country does not have historical data",
        }));
    })
  }

const favouritesForDropDown = user && favouritesFinal.length > 0 && !state.loading &&  getFavouritesCountriesForDropDown(favouritesFinal, state.mapData)

  return (
    <div>
    {/* {!user && 
      <GridContainer>
          <Alert severity="error">
            <b>Please login first.</b>
          </Alert>
      </GridContainer>} */}

     {/* Containter of error if no country added */}

    {user && favouritesFinal.length === 0 && !state.loading &&  

      <GridItem xs={12} sm={12} md={6}>
        <Alert severity="error">
          <b> No countries in you favourite list. Please go to the settings page first.</b>
        </Alert>
      </GridItem >
    }

    {country.error && 
        <GridItem xs={12} sm={12} md={6}>
          <Alert severity="error">
            <b>{country.error}</b>
          </Alert>    
        </GridItem>}

{user && <>
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

        { !state.loading && user &&
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



              </GridContainer>
            </CardBody>
 
          </Card>
        </GridItem>    


              {/* Containter of error */}


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
              color="info"
              title="accumulated cases (in Thousands)"
              days={days}
              series={cases}

              type="Line"
            />

        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
        <CasesChart
            color="danger"
            title="deaths (in Thousands)"
            days={days}
            series={deaths}
            type="Bar"
            warning="warning"
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

</>
}
    </div>
  );
}
