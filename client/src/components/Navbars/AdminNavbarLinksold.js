import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";



import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  // const [form, setForm] = useState("");
  // const [user, setUser] = useState({});

  const classes = useStyles();
  // const [openNotification, setOpenNotification] = React.useState(null);
  // const [openProfile, setOpenProfile] = React.useState(null);

  const history = useHistory();

  // useEffect(() => {
  //   const user = JSON.stringify(localStorage.getItem("user"));
  // }, []);

  // const handleClickNotification = (event) => {
  //   if (openNotification && openNotification.contains(event.target)) {
  //     setOpenNotification(null);
  //   } else {
  //     setOpenNotification(event.currentTarget);
  //   }
  // };
  // const handleCloseNotification = () => {
  //   setOpenNotification(null);
  // };
  // const handleClickProfile = (event) => {
  //   if (openProfile && openProfile.contains(event.target)) {
  //     setOpenProfile(null);
  //   } else {
  //     setOpenProfile(event.currentTarget);
  //   }
  // };
  // const handleCloseProfile = () => {
  //   setOpenProfile(null);
  // };

  // const handleLogout = () => {
  //   localStorage.setItem("user", null);
  //   localStorage.setItem("token", null);
  //   history.push("/dashboard");
  // };

  return (
    <div>

      <div className={classes.manager}>

      </div>
      <div className={classes.manager}>

      </div>
    </div>
  );
}
