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
  console.log("props", props);
  const {
    newsTitle,
    newsDescription,
    newsURL,
    newsPublishedAt,
    source,
    image,
  } = props;

  console.log("image", image);

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4
                className={classes.cardCategory}
                style={{ fontWeight: "bold", color: "white", fontSize: 20 }}
              >
                {newsTitle}
              </h4>
            </CardHeader>
            <CardBody className="news-card-body">
              <div className="news-part1">
                <div className="news-description">
                  <p
                    className={classes.cardTitle}
                    style={{
                      fontSize: 16,
                      paddingTop: "1em",
                      paddingBottom: "1em",
                    }}
                  >
                    {newsDescription}
                  </p>
                </div>
                <div className="news-link">
                  <a href={newsURL} target="_blank" style={{ color: "red" }}>
                    Click here to read full article...
                  </a>
                </div>
              </div>

              <div className="news-part2">
                <img src={image} alt={newsTitle} />
              </div>
            </CardBody>
            <CardFooter stats className="news-card-footer">
              <div className={classes.stats}>
                <span
                  onClick={(e) => e.preventDefault()}
                  style={{ fontWeight: "bold", fontStyle: "italic" }}
                >
                  Source: {source}, {newsPublishedAt}
                </span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
