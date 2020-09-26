import ChartistGraph from "react-chartist";
import legend from "chartist-plugin-legend";



import React from "react";


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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


import useApplicationData from '../hooks/useApplicationData';

const useStyles = makeStyles(styles);


export default function ChartPie() {

  const { state, dispatch } = useApplicationData();
  //  console.log(state)

  const yesterdayContinents =state.yesterdayContinents 

  let seriesNormalized = []
  let labels = []

    if (yesterdayContinents.length > 0) {
      labels = yesterdayContinents.map(cont => cont.continent)
      const series = yesterdayContinents.map(cont => cont.cases)
      const totalCases = series.reduce((a,c) => a+c)
      seriesNormalized = series.map(ele => Math.floor(ele * 100 /totalCases))
     }



    const dataPie = {
      labels: seriesNormalized,
      series: seriesNormalized
    };

    const legendPie = {
      names: labels,
      types: ["#c40000", "#e75480", "#ecb753", "#f7944a", "#4f5355", "#009000"]
    };

    function createLegend (json) {
      const legend = [];

      for (let i = 0; i < json["names"].length; i++) {
        const type = "fa fa-circle text-" + json["types"][i];
        const textColor = { "color": json["types"][i]}
        legend.push(<span key={i} ><i className={type} style={textColor} /> {json["names"][i] }</span>);
        legend.push(" ");

      }
      return legend;
    }


    const options = {
      showLabel: true,  
      // labelInterpolationFnc: function(value) {
      //   return value[0]
      // }
    };


const classes = useStyles();


  return (
    <div>
      <Card chart>
        <CardHeader color="info"> 
          <ChartistGraph data={dataPie} options={options} type="Pie" />
        </CardHeader>
        <CardBody>
          <h4 className={classes.cardTitle}>Continents Cases </h4>
          <p className={classes.legend}>{createLegend(legendPie)}</p>
        </CardBody>
        <CardFooter chart>
          <div className={classes.stats}>
            <AccessTime /> campaign sent 2 days ago
          </div>
        </CardFooter>
      </Card>

    </div>
  )


}
