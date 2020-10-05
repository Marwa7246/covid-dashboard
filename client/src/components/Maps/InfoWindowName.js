import React from "react";
import "../../assets/css/InfoWindow.scss";
import NumberFormat from "react-number-format";

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
        <div className="desc">
          <strong>Total Cases:</strong>

          <NumberFormat
            value={cases}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
        <div className="desc">
          <strong>Total Deaths:</strong>

          <NumberFormat
            value={deaths}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
        <div className="desc">
          <strong>Total Recovered:</strong>

          <NumberFormat
            value={recovered}
            displayType={"text"}
            thousandSeparator={true}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoWindowName;
