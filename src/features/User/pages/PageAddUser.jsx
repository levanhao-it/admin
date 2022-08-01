import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddUserForm from '../components/AddUserForm';

PageAddUser.propTypes = {};
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

function PageAddUser(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      console.log('Form Submit: ', values);
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      // close dialog
      history.push('/users');
      // do something here
      console.log('New User: ', user);
      enqueueSnackbar('Add Customer Success', { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      console.log('failed to register user: ', error.message);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <a className={classes.box1} onClick={() => history.push('/users')}>
          <ArrowBackIcon />
          <Typography style={{ marginLeft: '10px' }}> Customers</Typography>
        </a>
        <Box className={classes.box2}>
          <AddUserForm onSubmit={handleSubmit} />
        </Box>
      </Container>
    </div>
  );
}

export default PageAddUser;
