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

import { bugs, website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import "../../App.scss";

import useApplicationData from "../../hooks/useApplicationData";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const { state, dispatch } = useApplicationData();

  // const userList = state.users.map((user) => (
  //   <li key={user.id}>
  //     {user.id},{user.first_name} ,{user.last_name} ,
  //     {JSON.parse(user.email).length}
  //   </li>
  // ));

  // console.log("Dashboard State", state);

  const globalHistorical = state.globalHistorical;

  let days = [];
  let cases = [];
  let casesRecovered = [];

  if (globalHistorical.cases) {
    // console.log(globalHistorical)
    const casesObject = globalHistorical.cases;
    days = Object.keys(casesObject);
    cases = Object.values(casesObject).map((e) => Number(e) / 1000000);

    const casesRecoveredObject = globalHistorical.recovered;
    casesRecovered = Object.values(casesRecoveredObject).map(
      (e) => Number(e) / 1000000
    );
  }

  if (state.yesterdayGlobal.updated) {
  }

  const classes = useStyles();
  return (
    <div>
      {/* <div className='App'>
        <h1>Users</h1>

        {state.loading && <h3>Loading...</h3>}

        <ul>{!state.loading && userList}</ul>
      </div>        */}

      <GridContainer>
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
      </GridContainer>

      <GridContainer>
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
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <CasesChart
            color="success"
            title="recovered"
            days={days}
            series={casesRecovered}
            type="Line"
          />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <ChartPie />
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
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
