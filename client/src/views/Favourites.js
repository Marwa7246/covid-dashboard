import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import { getMapDataLayer } from "../helpers/helpers";
import CardCountry from "components/CardCountry.js";
import DropDownSearch from "components/DropdownSearch"


import avatar from "assets/img/faces/marc.jpg";
import { isConstructSignatureDeclaration } from "typescript";
import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from "semantic-ui-react";
import DropdownSearch from "components/DropdownSearch";

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

export default function Favourites({state}) {
  const classes = useStyles();

  const globalHistorical = state.globalHistorical;
  const worldCovidNews = state.worldCovidNews;

  const newsList = !state.loading &&
    worldCovidNews.articles.map((item, index) => {
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
          />
      );
    })


    
  const mapData = getMapDataLayer(state.mapData)

  
  let days = [];
  let cases = [];
  let casesRecovered = [];

  if (!state.loading) {
    const casesObject = globalHistorical.cases;

    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000000);

    const casesRecoveredObject = globalHistorical.recovered;
    casesRecovered = Object.values(casesRecoveredObject).map(
      (e) => Number(e) / 1000000
    );
  }

  
  return (
    <div>

      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List of Countries</h4>

            </CardHeader>
            <CardBody>
              <GridContainer>  
              <GridItem xs={12} sm={12} md={12}>
                <h4>Select a country to see more information</h4>  
     
                </GridItem>            
              </GridContainer>

              <GridContainer>

            
                <GridItem xs={12} sm={12} md={12}>
                  <DropdownSearch/>
     
                </GridItem>
              </GridContainer>
              <GridContainer>
                
                
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>

                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Select</Button>
            </CardFooter>
          </Card>
        </GridItem>


        <GridItem xs={12} sm={12} md={6}>

         { !state.loading && <CardCountry
         mapData={mapData}
         
         />}
        </GridItem>
      </GridContainer>

      
      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
            {newsList[0]}
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
        <CasesChart
              color="success"
              title="recovered"
              days={days}
              series={casesRecovered}
              type="Line"

          /> 
        </GridItem>


      </GridContainer>

      
      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
        {newsList[1]}

        </GridItem>


        <GridItem xs={12} sm={12} md={6}>
        <CasesChart
            color="danger"
            title="new"
            days={days}
            series={cases}
            type="Bar"
            warning="warning"
            />
        </GridItem>
      </GridContainer>





    </div>
  );
}
