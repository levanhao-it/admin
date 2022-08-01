import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Menu, MenuItem, Popover, Typography } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

ProductSort.propTypes = {
  onChange: PropTypes.func,
};

const SORT_BY_OPTIONS = [
  { value: 'createdDate,desc', label: 'Newest' },
  { value: 'originalPrice,desc', label: 'Price: High-Low' },
  { value: 'originalPrice,asc', label: 'Price: Low-High' },
];

const useStyle = makeStyles((theme) => ({
  btn: {
    '& > span': {
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
  },
}));

function ProductSort({ onChange }) {
  const classes = useStyle();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleSortChange = (newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        className={classes.btn}
      >
        Sort By&nbsp;
        {/* <Typography component="span">Newest</Typography> */}
      </Button>
      <Popover
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === 'newest'}
            // onClick={handleClose}
            sx={{ typography: 'body2' }}
            onClick={() => handleSortChange(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default ProductSort;
