import Sidebar from "./components/Sidebar";

import { makeStyles } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import UserFeature from "./features/User";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import LoginFeature from "./features/Auth";
import ProductFeature from "features/Product";
import "./App.css";
import CategoryFeature from "features/Category";
import OrderFeature from "features/Order";
import { useSelector } from "react-redux";
import StorageKeys from "components/constant/storage-keys";
import VoucherFeauture from "features/Voucher";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content1: {
    flexGrow: 1,
    marginTop: "64px",
  },
  content2: {
    flexGrow: 1,
    marginTop: "0px",
  },
}));
function App() {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      {loggedInUser ? (
        <div className={classes.root}>
          <Header />
          <Sidebar />
          <div className={classes.content1}>
            <Switch>
              <Route path="/" component={UserFeature} exact />
              <Route path="/users" component={UserFeature} />
              <Route path="/categories" component={CategoryFeature} />
              {/* <Route path="/login" component={LoginFeature} /> */}
              <Route path="/products" component={ProductFeature} />
              <Route path="/orders" component={OrderFeature} />
              <Route path="/vouchers" component={VoucherFeauture} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className={classes.content2}>
            <Switch>
              <Redirect from="/" to="/login" exact />
              <Route path="/" component={LoginFeature} />
            </Switch>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
