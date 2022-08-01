import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import ManagerUser from "../ManagerUser";
import ManagerProduct from "../ManagerProduct";
import ManagerOrder from "../ManagerOrder";
import ManagerCategory from "../ManagerCategory";
import ManagerVoucher from "components/ManagerVoucher";

Sidebar.propTypes = {};
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgb(17 24 39)",
    color: "#d1d5db",
  },
  drawerContainer: {
    padding: "45px 5px 0px 18px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "110px",
    marginTop: "20px",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Link to="/">
          <div className={classes.center}>
            <img
              src="http://nouthemes.net/html/trueshoes/images/logo-white.png"
              alt=""
              className={classes.logo}
            />
          </div>
        </Link>
        <div className={classes.drawerContainer}>
          <ManagerUser />
          <ManagerCategory />
          <ManagerProduct />
          <ManagerOrder />
          <ManagerVoucher />
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
