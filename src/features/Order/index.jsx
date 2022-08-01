import React from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListOrderPage from "./pages/ListOrderPage";
import AddOrderPage from "./pages/AddOrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";

OrderFeature.propTypes = {};
const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(8, 0),
    backgroundColor: "#f9fafc",
  },
}));

function OrderFeature(props) {
  const match = useRouteMatch();
  const classes = useStyle();
  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} component={ListOrderPage} exact />
        <Route path={`${match.url}/add`} component={AddOrderPage} exact />
        <Route path={`${match.url}/:orderId`} component={OrderDetailPage} />
      </Switch>
    </Box>
  );
}

export default OrderFeature;
