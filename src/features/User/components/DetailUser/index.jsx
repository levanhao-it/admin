import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import userApi from 'components/api/userApi';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

DetailUser.propTypes = {
  user: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 32px',
  },
  paper: {
    marginBottom: '20px',
  },
  textHeading: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.375',
    padding: '32px 24px',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  li: {
    padding: '12px 24px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '14px',
    '&:first-child': {
      borderTop: '1px solid #e0e0e0',
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: '600',

    minWidth: '180px',
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(101 116 139)',
  },
  margin: {
    float: 'right',
  },
}));

function DetailUser({ user = {} }) {
  const classes = useStyles();
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  const [openRemove, setOpenRemove] = React.useState(false);
  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleRemove = async () => {
    await userApi.remove(user.idUser);
    goToPreviousPath();
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <Box className={classes.heading}>
          <Typography className={classes.textHeading}>Basics Detail</Typography>
        </Box>
        <Box>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography className={classes.title}>Id User:</Typography>
              <Typography className={classes.value}> {user['idUser']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Full Name: </Typography>
              <Typography className={classes.value}>{user['full_name']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Email:</Typography>
              <Typography className={classes.value}>{user['email']}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}> Quantity Order:</Typography>
              <Typography className={classes.value}>{user['quantityOrders']}</Typography>
            </li>
          </ul>
        </Box>
      </Paper>
      <Button
        variant="outlined"
        className={classes.margin}
        color="secondary"
        onClick={handleClickOpenRemove}
      >
        Delete User
      </Button>
      <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this user?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleRemove} variant="outlined" color="secondary" autoFocus>
            Agree
          </Button>
          <Button onClick={handleCloseRemove} variant="outlined" color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DetailUser;
