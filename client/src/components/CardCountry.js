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

export default function CardDashboard(props) {
  const { mapData, state } = props;
  // console.log(props)

  const classes = useStyles();
  return (
    <div>
      <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={mapData[0].flag} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{mapData[0].country}</h4>
              <div className='country'>
                <div><strong>Cases:</strong>  {mapData[0].cases} </div>
                <div><strong>Deaths:</strong>{mapData[0].deaths} </div>
                <div><strong>Recovered:</strong>{mapData[0].recovered} </div>
                <div><strong>Last Updated:</strong>{mapData[0].updated} </div>
              </div>

            </CardBody>
          </Card>
    </div>
  );
}
