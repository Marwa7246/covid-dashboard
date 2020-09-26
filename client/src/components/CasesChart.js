import ChartistGraph from "react-chartist";



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


export default function CasesChart({color, days, series, title, type, warning}) {

  // console.log(days)

  // const { state, dispatch } = useApplicationData();
  // console.log(state)

  // const globalHistorical =state.globalHistorical 

  // let days =[]
  // let series = []

  //   if (globalHistorical.series) {
  //     // console.log(globalHistorical)
  //     const seriesObject = globalHistorical.series;      
  //    days = Object.keys(seriesObject)
  //    series = Object.values(seriesObject).map(e => Number(e)  / 1000000 )


  //   }
    // console.log(series)

    const delays = 80,
    durations = 500;
  const delays2 = 80,
    durations2 = 500;

    const chartInfo  = {
      data: {
        labels: days,
        series: [series]
      },
      options: {
        showArea: true,
        showLine: true,
        showPoint: true,
        axisX: {
          labelInterpolationFnc: function(value, index) {
            return index % 2 === 0 ? value : null;
          }
        },
        low: Math.max(...series)-5,
        high: Math.max(...series)+5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      // for animation
      animation: {
        draw: function(data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                // easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
          }
        }
      }
    };


const classes = useStyles();
const textColor = `${color}Text`
const classColorText = classes[textColor]



return (
  <div>
          <Card chart>
            <CardHeader color={color}>
              <ChartistGraph
                className="ct-chart"
                data={chartInfo.data}
                type={type}
                options={chartInfo.options}
                listener={chartInfo.animation}
              />
              </CardHeader>
            <CardBody>
              {days && <h4 className={classes.cardTitle}>Number of {title} cases in the last {days.length} days (in Millions)</h4>}

              {series && <p className={classes.cardCategory}>
                               
                <span className={classColorText}>
                {warning && <i class="fa fa-exclamation-triangle"></i>}
                <ArrowUpward className={classes.upArrowCardCategory} /> {Math.floor(Math.max(...series)- Math.max(...series) / Math.max(...series) )}
                </span>{" "}
                increase.
              </p>}
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
  </div>

)


}
