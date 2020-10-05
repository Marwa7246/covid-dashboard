import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridContainer from "components/Grid/GridContainer.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import "../assets/css/CardNews.scss";


const useStyles = makeStyles(styles);

export default function CardNews(props) {
  console.log('props', props)
  const { newsTitle, newsDescription, newsURL, newsPublishedAt, source, urlToImage } = props;

  console.log('urlToImage', urlToImage)

  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4
            className={classes.cardCategory}
            style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
          >
            {newsTitle}
          </h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>

              <p
                className={classes.cardTitle}
                style={{ fontSize: 16, paddingTop: "1em", paddingBottom: "1em" }}
              >
                {newsDescription}
              </p>
              <a href={newsURL} target="_blank" style={{ color: "red" }}>
                Click here to read full article...
              </a>
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <img className="news-image" src={urlToImage} alt={newsTitle} />          
              </GridItem>
          </GridContainer>



          </CardBody>
        <CardFooter stats>
          <div className={classes.stats}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              Source: {source}, {newsPublishedAt} 
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
