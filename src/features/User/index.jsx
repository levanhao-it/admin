import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import UserList from './components/UserList';
import PageDetailUser from './pages/PageDetailUser';
import PageListUser from './pages/PageListUser';
import PageAddUser from './pages/PageAddUser';
import PageEditUser from './pages/PageEditUser';

UserFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: 'rgb(249 250 252)',
  },
}));

function UserFeature(props) {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} exact component={PageListUser} />
        <Route path={`${match.url}/detail/:userId`} extact component={PageDetailUser} />
        <Route path={`${match.url}/add`} extact component={PageAddUser} />
        <Route path={`${match.url}/edit/:userId`} extact component={PageEditUser} />
      </Switch>
    </Box>
  );
}

export default UserFeature;
