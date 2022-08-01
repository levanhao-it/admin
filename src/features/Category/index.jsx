import { Box, makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import PageListCategory from './pages/PageListCategory';

CategoryFeature.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: 'rgb(249 250 252)',
  },
}));

function CategoryFeature(props) {
  const match = useRouteMatch();
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Switch>
        <Route path={match.url} exact component={PageListCategory} />
      </Switch>
    </Box>
  );
}

export default CategoryFeature;
