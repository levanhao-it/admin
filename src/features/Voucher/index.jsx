import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Box, makeStyles } from "@material-ui/core";
import ListVoucherPage from "./pages/ListVoucherPage";
import AddVoucherPage from "./pages/AddVoucherPage";

VoucherFeauture.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(8, 0),
    backgroundColor: "#f9fafc",
  },
}));

function VoucherFeauture(props) {
  const match = useRouteMatch();
  const classes = useStyle();
  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} component={ListVoucherPage} exact />
        <Route path={`${match.url}/add`} component={AddVoucherPage} exact />
      </Switch>
    </Box>
  );
}

export default VoucherFeauture;
