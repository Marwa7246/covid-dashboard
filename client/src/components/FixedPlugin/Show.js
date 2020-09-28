/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/africa.png";
import imagine2 from "assets/img/asia.png";
import imagine3 from "assets/img/north_america.png";
import imagine4 from "assets/img/south_america.png";

import Button from "components/CustomButtons/Button.js";

import Signup from "./Signup"

const SIGNUP= 'SIGNUP'
const SHOW="SHOW";
const mode = SHOW;

export default function Show(props) {
  const [classes, setClasses] = React.useState("dropdown show");
  const [bg_checked, setBg_checked] = React.useState(true);
  const [bgImage, setBgImage] = React.useState(props.bgImage);
  const handleClick = () => {
    props.handleFixedClick();
  };
  return (
  
         <ul className="dropdown-menu"> 
           <li className="header-title">Options</li> 
           <li className="adjustments-line">            
          </li>
          <li className="header-title">Zoom on a specific continent map</li>
          <li className={bgImage === imagine1 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine1);
                props.handleImageClick(imagine1);
              }}
            >
              <img src={imagine1} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine2 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine2);
                props.handleImageClick(imagine2);
              }}
            >
              <img src={imagine2} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine3 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine3);
                props.handleImageClick(imagine3);
              }}
            >
              <img src={imagine3} alt="..." />
            </a>
          </li>
          <li className={bgImage === imagine4 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBgImage(imagine4);
                props.handleImageClick(imagine4);
              }}
            >
              <img src={imagine4} alt="..." />
            </a>
          </li>

          <li className="button-container">
            <div className="button-container">
              <Button
                color="success"
                target="_blank"
                fullWidth
              >
                Login First
              </Button>
            </div>
          </li>
          <li className="button-container">
            <div className="button-container">
              <Button
                color="warning"
                target="_blank"
                fullWidth
                onClick={props.onSignup} 
              >
                Don't Have an account? Signup
              </Button>
            </div>
          </li> 

       
           <li className="adjustments-line" /> 
         </ul> 

  );
}

Show.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};
