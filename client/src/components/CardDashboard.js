import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardDashboard(props) {
  const { statType, value, statColor, statIcon, updated } = props;
  // console.log(props)

  const classes = useStyles();
  return (
    <div>
      <Card>
        <CardHeader color={statColor} stats icon>
          <CardIcon color={statColor}>
            <Icon>{statIcon}</Icon>
          </CardIcon>
          <p className={classes.cardCategory}>{statType}</p>
          <h3 className={classes.cardTitle}>
            {value} <small>per one Million</small>
          </h3>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              updated {updated} {}
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
