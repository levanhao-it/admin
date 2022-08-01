import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Dialog, makeStyles, Paper, Typography, withStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { purple } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EditAdrress from '../EditAddress';

Address.propTypes = {
  address: PropTypes.object,
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
  icon: {
    float: 'right',
    cursor: 'pointer',
    fontSize: '30px',
    marginLeft: '10px',
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

function Address({ address }) {
  const classes = useStyles();
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        {/* <ClearIcon className={classes.icon} onClick={handleClickOpenRemove} />
        <EditIcon
          className={classes.icon}
          fontSize="small"
          onClick={handleClickOpenEdit}
        ></EditIcon> */}
        <Box className={classes.heading}>
          <Typography className={classes.textHeading}>
            Address: {address.id}{' '}
            {address.defaultAddress ? <span style={{ color: '#ccc' }}> ( Default )</span> : ''}
          </Typography>
        </Box>
        <Box>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <Typography className={classes.title}>Full Name: </Typography>
              <Typography className={classes.value}>
                {' '}
                {address.firstName} {address.lastName}
              </Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Phone:</Typography>
              <Typography className={classes.value}> {address.phoneNumber}</Typography>
            </li>
            <li className={classes.li}>
              <Typography className={classes.title}>Address:</Typography>
              <Typography className={classes.value}>{address.address}</Typography>
            </li>
          </ul>
        </Box>
      </Paper>
      {/* <Dialog
        open={openRemove}
        onClose={handleCloseRemove}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this address?'}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCloseRemove} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseRemove} variant="outlined" color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <EditAdrress />
      </Dialog> */}
    </div>
  );
}

export default Address;
