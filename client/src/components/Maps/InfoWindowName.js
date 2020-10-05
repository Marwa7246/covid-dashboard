import React from "react";
import "../../assets/css/InfoWindow.scss";
import NumberFormat from "react-number-format";
import {digitFormat} from '../../helpers/helpers'

function InfoWindowName(props) {
  const { country, cases, onClick, flag, deaths, recovered, updated } = props;
  console.log(props);

  return (
    <div className="InfoWindow">
      <div className="firstBox">
        <img className="InfoWindow-image" src={flag} alt={country} />
        <span>
          <b> {country} </b>
        </span>
      </div>

      <div className="InfoWindow-description">
        <div >
          <strong>Total Cases:</strong>{digitFormat(cases)}

        </div>
        <div >
          <strong>Total Deaths:</strong>{digitFormat(deaths)}

        </div>
        <div >
          <strong>Total Recovered:</strong>{digitFormat(recovered)}

        </div>
      </div>
    </div>
  );
}

export default InfoWindowName;
