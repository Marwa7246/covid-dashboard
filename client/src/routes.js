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
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard.js";
import News from "views/News/News.js";
import Favourites from "views/Favourites.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps.js";
import Login from "views/Login"
import Signup from "views/Signup"


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  
  
  {
    path: "/news",
    name: "News",
    icon: LibraryBooks,
    component: News,
    layout: "/admin",
  },
  
  {
    path: "/icons",
    name: "Icons",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: Person,
    component: Login,
    layout: "/admin",
  },
  
  {
    path: "/signup",
    name: "Sign-up",
    icon: Notifications,
    component: Signup,
    layout: "/admin",
  },
  {
    path: "/favourites",
    name: "Favourites",
    icon: Notifications,
    component: Favourites,
    layout: "/admin",
  },
    
];

export default dashboardRoutes;
