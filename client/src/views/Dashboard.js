import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import CasesChart from "components/CasesChart.js";
import ChartPie from "components/ChartPie.js";
import CardDashboard from "components/CardDashboard.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import "../App.scss";


const useStyles = makeStyles(styles);

export default function Dashboard({state}) {

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
          <ChartPie  state={state}/>
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
