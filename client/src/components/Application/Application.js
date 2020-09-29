import React from "react";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import StateContext from "../../StateContext";
import DispatchContext from "../../DispatchContext";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/north_america.png";
import logo from "assets/img/covid.png";
import useApplicationData from "hooks/useApplicationData";

import Dashboard from "views/Dashboard.js";
import News from "views/News/News.js";
import Favourites from "views/Favourites.js";
import Icons from "views/Icons/Icons.js";
import Maps from "../Maps/Maps";
import Login from "views/Login"
import Signup from "views/Signup"
import { isPropertySignature } from "typescript";
import { getMapDataLayer } from "../../helpers/helpers";

let ps;

// const switchRoutes = (
//   <Switch>
//     {routes.map((prop, key) => {
//       console.log(prop)
//         return (
//           <Route
//             path={prop.path}
//             component={prop.component}
//             key={key}
//           />
//         );
//     })}
//     <Redirect from="/" to="/dashboard" />
//   </Switch>
// );

const useStyles = makeStyles(styles);

export default function Application({ ...rest }) {
  const { state, dispatch } = useApplicationData();
  let mapData = [];
  if (!state.loading) mapData = getMapDataLayer(state.mapData);

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        console.log(prop);
        if (prop.name === "Dashboard")
          return (
            <Route key={key} path={prop.path}>
              <Dashboard state={state} />
            </Route>
          );
        if (prop.name === "Maps")
          return (
            <Route key={key} path={prop.path}>
              <Maps state={state} />
            </Route>
          );
        if (prop.name === "News")
          return (
            <Route key={key} path={prop.path}>
              <News state={state} />
            </Route>
          );
        if (prop.name === "Login")
          return (
            <Route key={key} path={prop.path}>
              <Login state={state} />
            </Route>
          );
        if (prop.name === "Signup")
          return (
            <Route key={key} path={prop.path}>
              <Signup state={state} />
            </Route>
          );
        if (prop.name === "Favourites")
          return (
            <Route key={key} path={prop.path}>
              <Favourites state={state} />
            </Route>
          );
        return (
          <Route key={key} path={prop.path}>
            {prop.component}
          </Route>
        );

      })}
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Sidebar
            routes={routes}
            logoText={"COVID DASHBOARD"}
            logo={logo}
            image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            color={color}
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <Navbar
              routes={routes}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}

          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
            {getRoute() ? <Footer /> : null}
            <FixedPlugin
              handleImageClick={handleImageClick}
              handleColorClick={handleColorClick}
              bgColor={color}
              bgImage={image}
              handleFixedClick={handleFixedClick}
              fixedClasses={fixedClasses}
            />
          </div>
        </StateContext.Provider>
      </DispatchContext.Provider>
      {/* </Router> */}
    </div>
  );
}
