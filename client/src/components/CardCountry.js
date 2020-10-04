import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js"


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function CardCountry(props) {
  const { mapData, countryName } = props;
  // console.log(props)

  const selectedCountry = mapData.find(ele=>ele.iso2===countryName)
  // console.log(mapData, countryName, selectedCountry)

  const classes = useStyles();
  return (
    <div>
      <Card profile>
            <CardAvatar profile>
                <img src={selectedCountry.flag} alt="..." />
            </CardAvatar>
            <CardBody profile>
              <h4 className={classes.cardTitle}>{selectedCountry.country}</h4>
              {/* <ul className='Country'>
                <li><strong>Cases:</strong>  {selectedCountry.cases} </li>
                <li><strong>Deaths:</strong>{selectedCountry.deaths} </li>
                <li><strong>Recovered:</strong>{selectedCountry.recovered} </li>
                <li><strong>Last Updated:</strong>{selectedCountry.updated} </li>
              </ul> */}
                        <Table
                            tableHeaderColor="primary"
                            tableHead={['Cases','Deaths','Recovered','Last Updated']}
                            tableData={[
                                [ selectedCountry.cases , selectedCountry.deaths , selectedCountry.recovered , selectedCountry.updated ] ,

                            ]}
                        />

            </CardBody>
          </Card>


    </div>
  );
}
