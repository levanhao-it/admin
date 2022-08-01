import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';

Profile.propTypes = {
  user: PropTypes.object,
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  box: {
    marginTop: '12px',
    marginLeft: '20px',
  },
  h5: {
    margin: '0px',
    fontWeight: '700',
    fontSize: '15px',
  },
  h6: {
    margin: '0px',
    fontWeight: '500',
    fontSize: '14px',
  },
}));

function Profile({ user = {} }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar
        alt=""
        src="https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png"
        className={classes.large}
      />
      <Box className={classes.box}>
        <Typography variant="h5" className={classes.h5}>
          Full Name: {user['full_name']}
        </Typography>
        <Typography variant="h6" className={classes.h6}>
          {' '}
          Email: {user['email']}
        </Typography>
      </Box>
    </div>
  );
}

export default Profile;
