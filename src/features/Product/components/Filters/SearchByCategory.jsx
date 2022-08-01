import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import categoryApi from 'components/api/category';

SearchByCategory.propTypes = {
  onChange: PropTypes.func,
};

const useStyle = makeStyles((theme) => ({
  btn: {
    padding: theme.spacing(1, 2),
    '& > span': {
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
  },
}));

function SearchByCategory({ onChange }) {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickCategory = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCategory = () => {
    setAnchorEl(null);
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoryApi.getAll();
        setCategoryList(
          data.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch category list', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.name);
    }
  };
  return (
    <Box padding={1}>
      <Button endIcon={<ExpandMoreIcon />} className={classes.btn} onClick={handleClickCategory}>
        Category
      </Button>
      <Popover
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseCategory}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {categoryList.map((category) => (
          <MenuItem key={category.id} onClick={() => handleCategoryClick(category)}>
            {/* <FormControlLabel control={<Checkbox name={category.name} />} label={category.name} /> */}
            {category.name}
          </MenuItem>
        ))}
      </Popover>
    </Box>
  );
}

export default SearchByCategory;
