import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardNews(props) {
  console.log('props', props)
  const { newsTitle, newsDescription, newsURL, newsPublishedAt, source, urlToImage } = props;

  console.log('source', urlToImage)

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
          <p
            className={classes.cardTitle}
            style={{ fontSize: 16, paddingTop: "1em", paddingBottom: "1em" }}
          >
            {newsDescription}
          </p>
          <a href={newsURL} target="_blank" style={{ color: "red" }}>
            Click here to read full article...
          </a>
        </CardBody>
        <CardFooter stats>
          <div className={classes.stats}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              {newsPublishedAt} , Source: {source}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
