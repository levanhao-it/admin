import React from 'react';
import PropTypes from 'prop-types';
import SearchByName from './Filters/SearchByName';
import { Box, Divider, makeStyles } from '@material-ui/core';
import FilterViewer from './Filters/FilterViewer';
import SearchByCategory from './Filters/SearchByCategory';
import ProductSort from './Filters/ProductSort';
import FilterByPrice from './Filters/FilterByPrice';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  boxFilter: {
    display: 'flex',
  },
}));

function ProductFilters({ filters, onChange }) {
  const classes = useStyle();
  const handleCategoryChange = (newCategory) => {
    if (!onChange) return;

    const newFilters = {
      category: newCategory,
    };
    onChange(newFilters);
  };

  const handleSortChange = (values) => {
    if (!onChange) return;
    const newFilters = {
      ...filters,
      sort: values,
    };

    onChange(newFilters);
  };

  const handleChange = (values) => {
    console.log(values);
    if (onChange) {
      const newFilters = {
        price_lte: values.price_lte,
        price_gte: values.price_gte,
      };
      onChange(newFilters);
    }
  };

  return (
    <Box mt={4}>
      <SearchByName />
      <Box className={classes.boxFilter}>
        <SearchByCategory onChange={handleCategoryChange} />
        <ProductSort onChange={handleSortChange} />
      </Box>
      {/* <FilterByPrice onChange={handleChange} /> */}
    </Box>
  );
}

export default ProductFilters;
