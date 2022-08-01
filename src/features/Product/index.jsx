import { Box, makeStyles } from "@material-ui/core";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddProductDetailPage from "./pages/AddProductDetailPage";
import AddProductPage from "./pages/AddProductPage";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

ProductFeature.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(8, 0),
    backgroundColor: "#f9fafc",
  },
}));

function ProductFeature(props) {
  const match = useRouteMatch();
  const classes = useStyle();

  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} component={ListPage} exact />
        <Route path={`${match.url}/add`} component={AddProductPage} exact />

        <Route
          path={`${match.url}/:productId/add`}
          component={AddProductDetailPage}
          exact
        />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
