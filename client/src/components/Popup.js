import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
import { Icon } from "@material-ui/core";
import CasesChart from "components/CasesChart.js";
import GridItem from "components/Grid/GridItem.js";
import Dashboard from "views/Dashboard";
import imagine1 from "assets/img/sidebar-1.jpg";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  //const globalHistorical = state.globalHistorical;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let days = [];
  let cases = [];
  let casesRecovered = [];

  // if (!state.loading) {
  //   // console.log(globalHistorical)
  //   const casesObject = globalHistorical.cases;
  //   days = Object.keys(casesObject);
  //   cases = Object.values(casesObject).map((e) => Number(e) / 1000000);

  //   const casesRecoveredObject = globalHistorical.recovered;
  //   casesRecovered = Object.values(casesRecoveredObject).map(
  //     (e) => Number(e) / 1000000
  //   );
  // }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <ZoomOutMap />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Chart
            </Typography>
          </Toolbar>
        </AppBar>
        <GridItem xs={12} sm={12} md={4}>
          {/* <CasesChart
          // color="success"
          // title="recovered"
          // multiple="Millions"
          // days={days}
          // //series={casesRecovered}
          // type="Line"
          // period="20"
          /> */}
          <h3>Display chart here</h3>
          <img src={imagine1} alt="..." />
        </GridItem>
      </Dialog>
    </div>
  );
}
