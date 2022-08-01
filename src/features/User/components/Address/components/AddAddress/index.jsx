import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddressForm from '../AddressForm';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import addressApi from 'components/api/addressApi';

AddAddress.propTypes = {
  id: PropTypes.string,
};

const useStyles = makeStyles({});

function AddAddress(id) {
  const history = useHistory();
  const [addressList, setAddressList] = useState([]);

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const { data } = await addressApi.getAllAddressByUser(id);
      setAddressList(data);
    } catch (error) {
      console.log('failed to fetch address: ', error.message);
    }
  };
  const classes = useStyles();
  return (
    <div>
      <AddressForm />
    </div>
  );
}

export default AddAddress;
