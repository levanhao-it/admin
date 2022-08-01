import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../features/Auth/userSlice';

Header.propTypes = {};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#fff',
    color: 'rgb(107 114 128)',
    borderBottom: '1px solid #d1d5db',
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  login: {
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  title: {
    fontSize: '18px',
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.user.isLoggedIn);

  const isLoggedIn = !!loggedInUser;
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
    history.push('/login');
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.tool}>
          <Typography className={classes.title} variant="h6" noWrap>
            Manager Dashboard
          </Typography>
          {!isLoggedIn && (
            <Typography className={classes.login} variant="h6" noWrap component={Link} to="/login">
              Login
            </Typography>
          )}
          {isLoggedIn && (
            <>
              <Typography className={classes.login} variant="h6" noWrap onClick={handleLogoutClick}>
                Logout
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
