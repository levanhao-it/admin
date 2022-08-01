import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';
import LogInForm from '../LogInForm';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import { useHistory } from 'react-router-dom';

LogIn.propTypes = {};

function LogIn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push('/users');
      enqueueSnackbar('Login Success', { variant: 'success', autoHideDuration: 1000 });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  return (
    <div>
      <LogInForm onSubmit={handleSubmit} />
    </div>
  );
}

export default LogIn;
