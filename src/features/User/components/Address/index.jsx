import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, makeStyles, withStyles } from '@material-ui/core';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AddressList from './components/AddressList';
import { purple } from '@material-ui/core/colors';
import AddAddress from './components/AddAddress';
import addressApi from 'components/api/addressApi';

AddressFeature.propTypes = {
  user: PropTypes.object,
};
const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5048e5',
    '&:hover': {
      backgroundColor: '#3832a0',
    },
    borderRadius: '5px',
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    float: 'right',
  },
}));

function AddressFeature({ user = {} }) {
  const { email } = user;
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await addressApi.getAllAddressByUser(email);
        setAddressList(data);
      } catch (error) {
        console.log('Failed to fetch address list', error);
      }
    })();
  }, []);

  return (
    <div>
      <AddressList data={addressList} />
      {/* <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        startIcon={<AddLocationIcon />}
        onClick={handleClickOpen}
      >
        Add
      </ColorButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <AddAddress id={idUser} />
      </Dialog> */}
    </div>
  );
}

export default AddressFeature;
