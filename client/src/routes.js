/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";

import VpnKey from "@material-ui/icons/VpnKey";
import Create from "@material-ui/icons/Create";
import Stars from "@material-ui/icons/Stars";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

import LocationOn from "@material-ui/icons/LocationOn";

import Dashboard from "views/Dashboard.js";
import News from "views/News/News.js";
import Favourites from "views/Favourites.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps.js";
import Login from "views/Login";
import Signup from "views/Signup";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
  },

  {
    path: "/news",
    name: "News",
    icon: LibraryBooks,
    component: News,
  },

  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
  },
  {
    path: "/login",
    name: "Login",
    icon: VpnKey,
    component: Login,
  },

  {
    path: "/signup",
    name: "Sign-up",
    icon: Create,
    component: Signup,
  },
  {
    path: "/favourites",
    name: "Favourites",
    icon: Stars,
    component: Favourites,
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
