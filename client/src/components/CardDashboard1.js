import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import NumberFormat from "react-number-format";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardDashboard1(props) {
  const {
    statType,
    value,
    statColor,
    statIcon,
    footerTitle,
    footerValue,
  } = props;
  // console.log(props)

  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader color={statColor} stats icon>
          <CardIcon color={statColor}>
            <Icon>{statIcon}</Icon>
          </CardIcon>
          <p
            className={classes.cardCategory}
            style={{ fontWeight: "bold", fontSize: "larger", color: "black" }}
          >
            {statType}
          </p>
          <h3 className={classes.cardTitle}>
            <NumberFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
            />
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <b>{footerTitle}:&nbsp; </b>
            <NumberFormat
              value={footerValue}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
