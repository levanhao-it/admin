import { Box, Button, makeStyles, TextField, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * @typedef {import('@material-ui/core').TextFieldProps} TextFieldProps
 */

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,

    '& .MuiInputBase-input': {
      padding: '0.5rem',
    },
  },
  range: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  rangeLine: {
    height: '1px',
    width: '15px',
    margin: '0 5px',
    backgroundColor: theme.palette.grey[700],
  },
}));

const StyledTextField = withStyles({})((/** @type {TextFieldProps} */ props) => (
  <TextField variant="outlined" color="secondary" {...props} />
));

export default function FilterByPrice({ onChange }) {
  const classes = useStyles();
  const [prices, setPrices] = useState({
    price_gte: null,
    price_lte: null,
  });

  const handleChange = (event) => {
    setPrices((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (onChange) onChange(prices);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.range}>
        <Typography>Price</Typography>
        <span>-</span>
        <StyledTextField
          name="price_gte"
          value={prices.price_gte}
          onChange={handleChange}
          placeholder="From"
        />
        <span>$</span>
        <Box component="div" className={classes.rangeLine} />
        <StyledTextField
          name="price_lte"
          value={prices.price_lte}
          onChange={handleChange}
          placeholder="To"
        />
        <span>$</span>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleSubmit}
          style={{ marginLeft: '10px' }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}
