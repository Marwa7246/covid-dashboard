import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardCountry(props) {
  const { mapData, countryName } = props;
  // console.log(props)

  const selectedCountry = mapData.find(ele=>ele.country===countryName)
  // console.log(mapData, countryName, selectedCountry)

  const classes = useStyles();
  return (
    <div>
      <Card profile>
            <CardAvatar profile>
                <img src={selectedCountry.flag} alt="..." />
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{selectedCountry.country}</h4>
              <div className='Country'>
                <div><strong>Cases:</strong>  {selectedCountry.cases} </div>
                <div><strong>Deaths:</strong>{selectedCountry.deaths} </div>
                <div><strong>Recovered:</strong>{selectedCountry.recovered} </div>
                <div><strong>Last Updated:</strong>{selectedCountry.updated} </div>
              </div>

            </CardBody>
          </Card>
    </div>
  );
}
