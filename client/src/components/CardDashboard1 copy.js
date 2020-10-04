import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import moment from "moment";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CasesChart from "components/CasesChart.js";
import ChartPie from "components/ChartPie.js";
import CardDashboard from "components/CardDashboard.js";
import CardDashboard1 from "components/CardDashboard1.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import "../App.scss";

const useStyles = makeStyles(styles);

export default function Dashboard({ state }) {
  console.log(state.loading);

  const globalHistorical = state.globalHistorical;
  const currentGlobalData = state.currentGlobalData;
  const currentCanadaData = state.currentCanadaData;

  useEffect(() => {
    const userEmail = JSON.stringify(localStorage.getItem("userEmail"));
    console.log("Dashboard user email2", userEmail);
  }, []);

  let days = [];
  let cases = [];
  let casesRecovered = [];

  if (!state.loading) {
    console.log(globalHistorical);
    //console.log("currentGlobalData is @@@@", currentGlobalData);
    const casesObject = globalHistorical.cases;
    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000000);

    const casesRecoveredObject = globalHistorical.recovered;
    casesRecovered = Object.values(casesRecoveredObject).map(
      (e) => Number(e) / 1000000
    );
  }

  let publishedTime_World = moment.utc(currentGlobalData.updated).toDate();
  let localTime_World = moment(publishedTime_World)
    .local()
    .format("YYYY-MM-DD HH:mm");
  let timeFormat_World = moment(localTime_World).fromNow();

  let publishedTime_Canada = moment.utc(currentCanadaData.updated).toDate();
  let localTime_Canada = moment(publishedTime_Canada)
    .local()
    .format("YYYY-MM-DD HH:mm");
  let timeFormat_Canada = moment(localTime_Canada).fromNow();

  const classes = useStyles();
  return (
    <div>
      <div>
        <h3 style={{ fontWeight: "bold" }}>Canada Statistics</h3>
        <a style={{ fontWeight: "bold", fontStyle: "italic" }}>
          Updated: {timeFormat_Canada}, Source: Worldometers {}
        </a>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Cases"}
            value={currentGlobalData.cases}
            statColor={"primary"}
            statIcon={"add_alert_outlined"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Deaths"}
            value={currentGlobalData.deaths}
            statColor={"danger"}
            statIcon={"warning"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Recovered"}
            value={currentGlobalData.recovered}
            statColor={"success"}
            statIcon={"accessibility_new_outlines"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Active"}
            value={currentGlobalData.active}
            statColor={"warning"}
            statIcon={"local_hospital_outline"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Critical"}
            value={currentGlobalData.critical}
            statColor={"danger"}
            statIcon={"local_hotel_outlined"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Affected Countries"}
            value={currentGlobalData.affectedCountries}
            statColor={"info"}
            statIcon={"info_outlined"}
          />
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Cases Today"}
            value={currentGlobalData.todayCases}
            statColor={"primary"}
            statIcon={"add_alert_outlined"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Deaths Today"}
            value={currentGlobalData.todayDeaths}
            statColor={"danger"}
            statIcon={"warning"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Recovered Today"}
            value={currentGlobalData.todayRecovered}
            statColor={"success"}
            statIcon={"accessibility_new_outlines"}
          />
        </GridItem>
      </GridContainer>
      <div>
        <h3 style={{ fontWeight: "bold" }}>Canada Statistics</h3>
        <a style={{ fontWeight: "bold", fontStyle: "italic" }}>
          Updated: {timeFormat_Canada}, Source: Worldometers {}
        </a>
      </div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Cases"}
            value={currentCanadaData.cases}
            statColor={"primary"}
            statIcon={"add_alert_outlined"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Deaths"}
            value={currentCanadaData.deaths}
            statColor={"danger"}
            statIcon={"warning"}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Total Active"}
            value={currentCanadaData.active}
            statColor={"warning"}
            statIcon={"local_hospital_outline"}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Cases Today"}
            value={currentCanadaData.todayCases}
            statColor={"primary"}
            statIcon={"add_alert_outlined"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Deaths Today"}
            value={currentCanadaData.todayDeaths}
            statColor={"danger"}
            statIcon={"warning"}
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard1
            statType={"Recovered Today"}
            value={currentCanadaData.todayRecovered}
            statColor={"success"}
            statIcon={"accessibility_new_outlines"}
          />
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType={"Total Recovered"}
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["recoveredPerOneMillion"]
            }
            statColor={"success"}
            statIcon={"accessibility_new_outlines"}
            updated={state.yesterdayGlobal.updated}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType="Cases"
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["casesPerOneMillion"]
            }
            statColor={"warning"}
            statIcon={"local_hospital_outline"}
            updated={state.yesterdayGlobal.updated}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType="Deaths"
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["deathsPerOneMillion"]
            }
            statColor={"danger"}
            statIcon={"warning"}
            updated={state.yesterdayGlobal.updated}
          />
        </GridItem>
      </GridContainer> */}

      {/* <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType={"Tested"}
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["testsPerOneMillion"]
            }
            statColor={"info"}
            statIcon={"info_outlined"}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType={"Active"}
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["activePerOneMillion"]
            }
            statColor={"primary"}
            statIcon={"add_alert_outlined"}
          />
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <CardDashboard
            statType={"Critical"}
            value={
              state.yesterdayGlobal.updated &&
              state.yesterdayGlobal["criticalPerOneMillion"]
            }
            statColor={"danger"}
            statIcon={"local_hotel_outlined"}
          />
        </GridItem>
      </GridContainer> */}
      <div>
        <h3 style={{ fontWeight: "bold" }}>Charts</h3>
      </div>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <CasesChart
            color="success"
            title="recovered"
            multiple="Millions"
            days={days}
            series={casesRecovered}
            type="Line"
            period="20"
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <ChartPie state={state} />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <CasesChart
            color="danger"
            title="accumulated cases"
            multiple="Millions"
            days={days}
            series={cases}
            type="Bar"
            warning="warning"
            period="20"
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
