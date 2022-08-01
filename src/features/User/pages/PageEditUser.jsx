import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import userApi from 'components/api/userApi';
import { useSnackbar } from 'notistack';
import { useHistory, useRouteMatch } from 'react-router-dom';
import EditUserForm from '../components/EditUserForm';
import Profile from '../components/Profile';
import useUserDetail from '../hooks/useUserDetail';

PageEditUser.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '58px 24px 0px 24px',
  },
  box1: {
    display: 'flex',
    color: 'rgb(18 24 40)',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.5',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '32px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  box2: {
    marginTop: '24px',
    marginLeft: '24px',
    marginRight: '24px',
    marginBottom: '24px',
    padding: '32px 24px',
    boxSizing: 'border-box',
    border: '1px solid rgb(233 241 249)',
  },
}));

function PageEditUser(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    params: { userId },
    url,
  } = useRouteMatch();
  const { user, loading } = useUserDetail(userId);
  const userData = user.data;
  const handleSubmit = async (values) => {
    try {
      // const action = edit(userId, values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      console.log(values);
      const { status, message } = await userApi.update(userId, values);
      // ok then show user list
      if (status === 'OK') {
        setTimeout(() => {
          history.push('/users');
        }, 1000);
        // do something here
        enqueueSnackbar('Edit Customer Success', { variant: 'success', autoHideDuration: 1000 });
      } else {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log('failed to register user: ', error.message);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <a className={classes.box1} onClick={() => history.push('/users')}>
          <ArrowBackIcon />
          <Typography style={{ marginLeft: '10px' }}> Customers</Typography>
        </a>
        <Profile user={userData}></Profile>
        <Box className={classes.box2}>
          <EditUserForm user={userData} onSubmit={handleSubmit} />
        </Box>
      </Container>
    </div>
  );
}

export default PageEditUser;
