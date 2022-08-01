import React from 'react';
import PropTypes from 'prop-types';
import { Box, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import SearchForm from './SearchForm';

SearchByName.propTypes = {};

function SearchByName(props) {
  const history = useHistory();

  const handleSearchFormSubmit = (values) => {
    console.log(values);
    const { search } = values;

    history.push({
      pathname: '/products',
      search: queryString.stringify(search ? { title: search } : {}),
    });
  };
  return (
    <div>
      <Box>
        <SearchForm onSubmit={handleSearchFormSubmit} />
      </Box>
    </div>
  );
}

export default SearchByName;
