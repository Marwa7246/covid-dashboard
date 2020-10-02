/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import routes from "../../routes";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  console.log(props.user);
  const user = props.user;
  const [route, setRoutes] = useState(routes);

  const newRoutes = (routes) => {
    let new_routes2 = [];
    for (let route of routes) {
      if (route.name !== "Login" && route.name !== "Signup") {
        new_routes2.push(route);
        console.log("added");
      }
    }
    return new_routes2;
  };
  const loggedRoutes = (routes) => {
    let new_routes2 = [];
    for (let route of routes) {
      if (route.name !== "Favourites" && route.name !== "Logout") {
        new_routes2.push(route);
        console.log("added");
      }
    }
    return new_routes2;
  };

  React.useEffect(() => {
    let loggedUser = localStorage.getItem("user");
    console.log(`loggedUser: ${JSON.stringify(loggedUser)}`);
    if (loggedUser !== "null") {
      setRoutes(newRoutes(routes));
    } else {
      setRoutes(loggedRoutes(routes));
    }
  }, []);

  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText } = props;
  var links = (
    <List className={classes.list}>
      {route.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true,
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path),
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path),
        });
        return (
          <>
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />
                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          </>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <span className={classNames(classes.logoLink)} target="_blank">
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </span>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {<AdminNavbarLinks />}
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
