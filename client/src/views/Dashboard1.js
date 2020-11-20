import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
// import Page from 'src/components/Page';

import Sales from './Sales';

import TrafficByDevice from './TrafficByDevice';
import CasesChart from "components/CasesChart.js";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default function Dashboard({ state }) {
 
  const globalHistorical = state.globalHistorical;
  const currentGlobalData = state.currentGlobalData;
  const currentCanadaData = state.currentCanadaData;
  const historicalCanadaData = state.historicalCanadaData;
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


  }


  return (
    <>
      <Container maxWidth={false}>
      <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
                            <CasesChart
                  color="info"
                  title="registered cases (in Millions)"
                  multiple="Millions"
                  days={days}
                  series={cases}
                  type="Bar"
                  period="20"
                />
            {/* <Sales /> */}
          </Grid>
 
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
        </Grid>
      </Container>
    </>
  );
}
