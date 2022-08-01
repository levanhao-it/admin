import React from 'react';
import PropTypes from 'prop-types';
import Address from '../Address';
import { Box, Grid } from '@material-ui/core';

AddressList.propTypes = { data: PropTypes.array };

AddressList.defaultProps = {
  data: [],
};

function AddressList({ data }) {
  return (
    <div>
      {data.map((address) => (
        <Address address={address} />
      ))}
    </div>
  );
}

export default AddressList;
