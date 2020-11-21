import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import {
  Container,
  Grid
} from '@material-ui/core';
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
import Collapse from "@material-ui/core/Collapse";
import "../App.scss";

//
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
//

const useStyles = makeStyles(styles);

export default function Dashboard({ state }) {
  //
  const classes123 = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [checked1, setChecked1] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleChange1 = () => {
    setChecked1((prev) => !prev);
  };

  //console.log(state.loading);

  const globalHistorical = state.globalHistorical;
  const currentGlobalData = state.currentGlobalData;
  const currentCanadaData = state.currentCanadaData;
  const historicalCanadaData = state.historicalCanadaData;

  useEffect(() => {
    const userEmail = JSON.stringify(localStorage.getItem("userEmail"));
    console.log("Dashboard user email2", userEmail);
  }, []);

  let days = [];
  let cases = [];
  let casesRecovered = [];
  let deaths = []
  let canCases = [];
  let canDeaths = [];

  if (!state.loading) {
    //console.log(globalHistorical);
    //console.log("currentGlobalData is @@@@", currentGlobalData);
    const casesObject = globalHistorical.cases;
    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000000);
    const DeathsObj = globalHistorical.deaths;
    deaths = Object.values(DeathsObj).map((e) => Number(e) / 1000);

    const casesRecoveredObject = globalHistorical.recovered;
    casesRecovered = Object.values(casesRecoveredObject).map(
      (e) => Number(e) / 1000000
    );

    //console.log("***************", historicalCanadaData);
    const canCasesObj = historicalCanadaData.timeline.cases;
    canCases = Object.values(canCasesObj).map((e) => Number(e) / 1000);
    const canDeathsObj = historicalCanadaData.timeline.deaths;
    canDeaths = Object.values(canDeathsObj).map((e) => Number(e) / 1000);
    //console.log("@@@@@@@@@@@@@@@@", historicalCanadaData.timeline.cases);
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
            <Container maxWidth={false}>

      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <h3 style={{ fontWeight: "bold" }}>World Statistics</h3>
          </GridItem>
          <GridItem>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Show"
            />
          </GridItem>
        </GridContainer>

        <div className={classes.container}>
          <Collapse in={checked}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Total Cases"}
                  value={currentGlobalData.cases}
                  statColor={"primary"}
                  statIcon={"add_alert_outlined"}
                  footerTitle={"New Cases Today"}
                  footerValue={currentGlobalData.todayCases}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Total Deaths"}
                  value={currentGlobalData.deaths}
                  statColor={"danger"}
                  statIcon={"warning"}
                  footerTitle={"New Deaths Today"}
                  footerValue={currentGlobalData.todayDeaths}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Total Recovered"}
                  value={currentGlobalData.recovered}
                  statColor={"success"}
                  statIcon={"accessibility_new_outlines"}
                  footerTitle={"Recovered Cases Today"}
                  footerValue={currentGlobalData.todayRecovered}
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
            {/* <GridContainer>
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
            </GridContainer> */}
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CasesChart
                  color="warning"
                  title="registered cases (in Millions)"
                  multiple="Millions"
                  days={days}
                  series={cases}
                  type="Bar"
                  period="20"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CasesChart
                  color="success"
                  title="recovered cases (in Millions)"
                  multiple="Millions"
                  days={days}
                  series={casesRecovered}
                  type="Line"
                  period="20"
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CasesChart
                  color="danger"
                  title="Deaths (in Millions)"
                  multiple="Millions"
                  days={days}
                  series={deaths}
                  type="Line"
                  period="20"
                />
              </GridItem>
              <GridItem xs={24} sm={24} md={6}>
                <ChartPie state={state} />
              </GridItem>

            </GridContainer>
            <GridContainer>
            <div>
              <a
                style={{
                  fontStyle: "italic",
                  color: "blue",
                  paddingLeft: "20px",
                }}
              >
                <b>Updated:</b> {timeFormat_World}; <b>Sources:</b>{" "}
                Worldometers, JHUCSSE {}
              </a>
            </div>
            </GridContainer>
          </Collapse>
        </div>
      </div>
      <br />

      <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <h3 style={{ fontWeight: "bold" }}>Canada Statistics</h3>
          </GridItem>
          <GridItem>
            <FormControlLabel
              control={<Switch checked={checked1} onChange={handleChange1} />}
              label="Show"
            />
          </GridItem>
        </GridContainer>

        <div className={classes.container}>
          <Collapse in={checked1}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Total Cases"}
                  value={currentCanadaData.cases}
                  statColor={"primary"}
                  statIcon={"add_alert_outlined"}
                  footerTitle={"New Cases Today"}
                  footerValue={currentCanadaData.todayCases}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Total Deaths"}
                  value={currentCanadaData.deaths}
                  statColor={"danger"}
                  statIcon={"warning"}
                  footerTitle={"New Deaths Today"}
                  footerValue={currentCanadaData.todayDeaths}
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
            {/* <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <CardDashboard1
                  statType={"Recovered Today"}
                  value={currentCanadaData.todayRecovered}
                  statColor={"success"}
                  statIcon={"accessibility_new_outlines"}
                />
              </GridItem>
            </GridContainer> */}
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CasesChart
                  color="warning"
                  title="registered cases (in Thousands)"
                  multiple="Thousands"
                  days={days}
                  series={canCases}
                  type="Bar"
                  period="20"
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CasesChart
                  color="danger"
                  title="deaths (in Thousands)"
                  multiple="Thousands"
                  days={days}
                  series={canDeaths}
                  type="Line"
                  period="20"
                />
              </GridItem>
            </GridContainer>
            <GridContainer>
            <div>
              <a
                style={{
                  fontStyle: "italic",
                  color: "blue",
                  paddingLeft: "20px",
                }}
              >
                <b>Updated:</b> {timeFormat_Canada}; <b>Sources:</b>{" "}
                Worldometers, JHUCSSE {}
              </a>
            </div>
            </GridContainer>

          </Collapse>
        </div>
      </div>
      <br />

      {/* <div className={classes.root}>
        <GridContainer>
          <GridItem>
            <h3 style={{ fontWeight: "bold" }}>Charts</h3>
          </GridItem>
          <GridItem>
            <FormControlLabel
              control={<Switch checked={checked2} onChange={handleChange2} />}
              label="Show"
            />
          </GridItem>
        </GridContainer>

        <div className={classes.container}>
          <Collapse in={checked2}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <ChartPie state={state} />
              </GridItem>
            </GridContainer>
          </Collapse>
        </div>
      </div> */}
            </Container>

    </div>
  );
}
