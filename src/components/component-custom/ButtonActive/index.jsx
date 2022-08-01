import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import './styles.scss';

ButtonActive.propTypes = {};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
    color: '#fff',
    height: '50px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '0',
    width: '100%',
    padding: '0 15px',
    '&:hover': {
      backgroundColor: '#000',
      color: '#ccc',
    },
  },
}));

function ButtonActive(props) {
  const { content, widthBtn, type, disabled } = props;
  const classes = useStyle(props);
  return (
    <div className="btn-primary" style={{ width: `${widthBtn}` }}>
      <Button className={`${classes.root} btn-primary__root`} type={type} disabled={disabled}>
        {content} <ArrowRightAltIcon fontSize="large" />
      </Button>

      <Box className="btn-primary__border"></Box>
    </div>
  );
}

export default ButtonActive;
