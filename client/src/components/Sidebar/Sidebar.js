/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";
import routes from "../../routes";

import DashboardIcon from "@material-ui/icons/Dashboard";

import VpnKey from "@material-ui/icons/VpnKey";
import Create from "@material-ui/icons/Create";
import Stars from "@material-ui/icons/Stars";
import ExitToApp from "@material-ui/icons/ExitToApp";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import PersonPin from "@material-ui/icons/PersonPin";
import Settings from "@material-ui/icons/Settings";

import LocationOn from "@material-ui/icons/LocationOn";

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
  const user = props.user;
  const [route, setRoutes] = useState(routes);

  const email = localStorage.getItem("userEmail");
  const firstName = localStorage.getItem("userFirstName");
  const userString = `Welcome ${firstName}!`;



  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, image, logoText } = props;

  
  //////////////////////////////////////////////////////////////
  const listItemClasses0 = classNames({
    [" " + classes[color]]: activeRoute(route[0].path),
  });
  const whiteFontClasses0 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[0].path),
  });
  const listItemClasses1 = classNames({
    [" " + classes[color]]: activeRoute(route[1].path),
  });
  const whiteFontClasses1 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[1].path),
  });
  const listItemClasses2 = classNames({
    [" " + classes[color]]: activeRoute(route[2].path),
  });
  const whiteFontClasses2 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[2].path),
  });
  const listItemClasses3 = classNames({
    [" " + classes[color]]: activeRoute(route[3].path),
  });
  const whiteFontClasses3 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[3].path),
  });
  const listItemClasses4 = classNames({
    [" " + classes[color]]: activeRoute(route[4].path),
  });
  const whiteFontClasses4 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[4].path),
  });
  const listItemClasses5 = classNames({
    [" " + classes[color]]: activeRoute(route[5].path),
  });
  const whiteFontClasses5 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[5].path),
  });
  const listItemClasses6 = classNames({
    [" " + classes[color]]: activeRoute(route[6].path),
  });
  const whiteFontClasses6 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[6].path),
  });
  const listItemClasses7 = classNames({
    [" " + classes[color]]: activeRoute(route[7].path),
  });
  const whiteFontClasses7 = classNames({
    [" " + classes.whiteFont]: activeRoute(route[7].path),
  });

  // ////////////////////////////////////////////////////////////////////////
  const newLinksToUpdate = (
    <List className={classes.list}>
      <>
        {email && (
          <ListItem className={classes.itemLink}>
            <PersonPin
              className={classNames(classes.itemIcon, classes.userDisplay)}
            />
            <ListItemText
              primary={userString}
              className={classNames(classes.itemText, classes.userDisplay)}
              disableTypography={true}
            />
          </ListItem>
        )}
      </>
      <>
        {
          <NavLink
            to={route[0].path}
            className={classes.item}
            activeClassName="active"
            key={route[0].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses0}>
              <DashboardIcon
                className={classNames(classes.itemIcon, whiteFontClasses0)}
              />
              <ListItemText
                primary={route[0].name}
                className={classNames(classes.itemText, whiteFontClasses0)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        }
      </>
      <>
        {
          <NavLink
            to={route[1].path}
            className={classes.item}
            activeClassName="active"
            key={route[1].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses1}>
              <LibraryBooks
                className={classNames(classes.itemIcon, whiteFontClasses1)}
              />
              <ListItemText
                primary={route[1].name}
                className={classNames(classes.itemText, whiteFontClasses1)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        }
      </>
      <>
        {
          <NavLink
            to={route[2].path}
            className={classes.item}
            activeClassName="active"
            key={route[2].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses2}>
              <LocationOn
                className={classNames(classes.itemIcon, whiteFontClasses2)}
              />
              <ListItemText
                primary={route[2].name}
                className={classNames(classes.itemText, whiteFontClasses2)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        }
      </>
      <>
        {email && (
          <NavLink
            to={route[3].path}
            className={classes.item}
            activeClassName="active"
            key={route[3].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses3}>
              <Stars
                className={classNames(classes.itemIcon, whiteFontClasses3)}
              />
              <ListItemText
                primary={route[3].name}
                className={classNames(classes.itemText, whiteFontClasses3)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )}
      </>
      <>
        {!email && (
          <NavLink
            to={route[4].path}
            className={classes.item}
            activeClassName="active"
            key={route[4].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses4}>
              <VpnKey
                className={classNames(classes.itemIcon, whiteFontClasses4)}
              />
              <ListItemText
                primary={route[4].name}
                className={classNames(classes.itemText, whiteFontClasses4)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )}
      </>
      <>
        {!email && (
          <NavLink
            to={route[5].path}
            className={classes.item}
            activeClassName="active"
            key={route[5].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses5}>
              <Create
                className={classNames(classes.itemIcon, whiteFontClasses5)}
              />
              <ListItemText
                primary={route[5].name}
                className={classNames(classes.itemText, whiteFontClasses5)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )}
      </>
      <>
        {email && (
          <NavLink
            to={route[7].path}
            className={classes.item}
            activeClassName="active"
            key={route[7].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses7}>
              <Settings
                className={classNames(classes.itemIcon, whiteFontClasses7)}
              />
              <ListItemText
                primary={route[7].name}
                className={classNames(classes.itemText, whiteFontClasses7)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )}
      </>
      <>
        {email && (
          <NavLink
            to={route[6].path}
            className={classes.item}
            activeClassName="active"
            key={route[6].path}
          >
            <ListItem button className={classes.itemLink + listItemClasses6}>
              <ExitToApp
                className={classNames(classes.itemIcon, whiteFontClasses6)}
              />
              <ListItemText
                primary={route[6].name}
                className={classNames(classes.itemText, whiteFontClasses6)}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        )}
      </>
      );
      {/* })} */}
    </List>
  );

  // //////////////////////////////////////////////////////////////////////////

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
              {/* {<AdminNavbarLinks />} */}
              {/* {links} */}
              {newLinksToUpdate}
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

            {/* <div className={classes.sidebarWrapper}>{links}</div> */}
            <div className={classes.sidebarWrapper}>{newLinksToUpdate}</div>
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
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
