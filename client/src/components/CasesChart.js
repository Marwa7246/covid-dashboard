import ChartistGraph from "react-chartist";



import React from "react";


import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";



const useStyles = makeStyles(styles);


export default function CasesChart({color, days, series, title, type, warning, state, multiple}) {

  


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
        low: Math.min(...series),
        high: Math.max(...series), 
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
              {days && <h4 className={classes.cardTitle}>Number of {title} in the last {days.length} days (in {multiple})</h4>}

              {series && <p className={classes.cardCategory}>
                               
                <span className={classColorText}>
                {warning && <i className="fa fa-exclamation-triangle"></i>}
                <ArrowUpward className={classes.upArrowCardCategory} /> {Math.ceil((Math.max(...series)- Math.min(...series)) / Math.max(...series )*100)} 
                </span>{" "}
                % increase. 
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
