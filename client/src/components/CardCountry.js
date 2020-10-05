import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import moment from "moment";


// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js"
import {digitFormat} from '../helpers/helpers'


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardCountry(props) {
  const { mapData, countryName } = props;

  const selectedCountry = mapData.find(ele=>ele.iso2===countryName);
  const updatedTime = moment.utc(selectedCountry.updated).toDate();
  const localTime = moment(updatedTime)
    .local()
    .format("YYYY-MM-DD HH:mm");
  const timeFormat = moment(localTime).fromNow();

  const classes = useStyles();
  return (
    <div>
      <Card >
      <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}><strong>{selectedCountry.country}</strong></h4>

            <CardAvatar profile>
                <img src={selectedCountry.flag} alt="..." />
            </CardAvatar>
            </CardHeader>
 
            <CardBody >

                        <Table
                            tableHeaderColor="primary"
                            tableHead={['Cases',"Today's Cases", 'Deaths', "Today's Deaths", 'Recovered', 'Critical', 'Last Updated']}
                            tableData={[
                                [ digitFormat(selectedCountry.cases), digitFormat(selectedCountry.todayCases), digitFormat(selectedCountry.deaths) , digitFormat(selectedCountry.todayDeaths), digitFormat(selectedCountry.recovered) , digitFormat(selectedCountry.critical), timeFormat,  ] ,

                            ]}
                        />

            </CardBody>
          </Card>


    </div>
  );
}
