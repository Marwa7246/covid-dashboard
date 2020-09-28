import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardNews(props) {
  const { newsTitle, newsDescription, newsURL, newsPublishedAt } = props;

  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader>
          <h4
            className={classes.cardCategory}
            style={{ fontWeight: "bold", color: "black", fontSize: 20 }}
          >
            {newsTitle}
          </h4>
          <p
            className={classes.cardTitle}
            style={{ fontSize: 16, paddingTop: "1em", paddingBottom: "1em" }}
          >
            {newsDescription}
          </p>
          <a href={newsURL} target="_blank" style={{ color: "red" }}>
            Click here to read full article...
          </a>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <a
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              style={{ fontWeight: "bold" }}
            >
              Published @ {newsPublishedAt} {}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
