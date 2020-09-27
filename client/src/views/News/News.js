import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import CasesChart from "components/CasesChart.js";
import ChartPie from "components/ChartPie.js";
import CardDashboard from "components/CardDashboard.js";
import CardNews from "components/CardNews.js";

import { bugs, website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import "../../App.scss";

import useApplicationData from "../../hooks/useApplicationData";

const useStyles = makeStyles(styles);

export default function News() {
  const { state, dispatch } = useApplicationData();

  const worldCovidNews = state.worldCovidNews;

  //console.log("News.js @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("News.js state", state);

  //const totalResults = worldCovidNews.totalResults;

  // let days =[]
  // let cases = []
  // let casesRecovered = []

  // let newsTitle;
  // let newsDescription;
  // let newsContent;
  // let newsPublishedAt;
  // let newsUrl;
  // let newsImage;

  if (worldCovidNews.totalResults) {
  }

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardNews
            newsImage="Image"
            newsTitle="Title"
            newsDescription="Description"
            newsContent="Content"
            newsPublishedAt="Time Published"
          />
        </GridItem>

        {state.worldCovidNews.articles &&
          worldCovidNews.articles.map((item, index) => {
            return (
              <GridItem xs={12} sm={12} md={12}>
                <CardNews
                  newsImage={item.urlToImage}
                  newsTitle={item.title}
                  newsDescription={item.description}
                  newsContent={item.content}
                  newsPublishedAt={item.publishedAt}
                />
              </GridItem>
            );
          })}

        {/* <GridItem xs={12} sm={12} md={12}>
          {state.worldCovidNews.articles && (
            <CardNews
              newsImage={worldCovidNews.articles[1].urlToImage}
              newsTitle={worldCovidNews.articles[1].title}
              newsDescription={worldCovidNews.articles[1].description}
              newsContent={worldCovidNews.articles[1].content}
              newsPublishedAt={worldCovidNews.articles[1].publishedAt}
            />
          )}
        </GridItem> */}

        {/* <GridItem xs={12} sm={12} md={12}>
          <CardNews
            newsImage={worldCovidNews.articles[2].urlToImage}
            newsTitle={worldCovidNews.articles[2].title}
            newsDescription={worldCovidNews.articles[2].description}
            newsContent={worldCovidNews.articles[2].content}
            newsPublishedAt={worldCovidNews.articles[2].publishedAt}
          />
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
