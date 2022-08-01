import {
  Box,
  Button,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  withStyles,
} from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import userApi from 'components/api/userApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AddressFeature from '../components/Address';
import DetailUser from '../components/DetailUser';
import Profile from '../components/Profile';
import useUserDetail from '../hooks/useUserDetail';

PageDetailUser.propTypes = {};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
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
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '32px',
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5048e5',
    '&:hover': {
      backgroundColor: '#3832a0',
    },
    borderRadius: '5px',
    height: '40px',
    marginTop: '20px',
  },
}))(Button);

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#000',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => (
  <Tab
    component="a"
    onClick={(event) => {
      event.preventDefault();
    }}
    {...props}
  />
));
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function PageDetailUser(props) {
  const classes = useStyles();

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <a className={classes.box1} onClick={() => history.push('/users')}>
        <ArrowBackIcon />
        <Typography style={{ marginLeft: '10px' }}> Customers</Typography>
      </a>
      <Box className={classes.box2}>
        <Profile user={userData}></Profile>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          endIcon={<EditIcon />}
          onClick={() => history.push(`/users/edit/${userId}`)}
        >
          Edit
        </ColorButton>
      </Box>
      <Box>
        <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
          <StyledTab label="Detail" {...a11yProps(0)} />
          <StyledTab label="Address" {...a11yProps(1)} />
          {/* <StyledTab label="Invoice" {...a11yProps(2)} /> */}
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <DetailUser user={userData}></DetailUser>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddressFeature user={userData} />
        </TabPanel>
        {/* <TabPanel value={value} index={2}>
          <Invoice user={userData} />
        </TabPanel> */}
      </Box>
    </Container>
  );
}

export default PageDetailUser;
