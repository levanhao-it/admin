import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 2,
    getLabel: (filters) => {
      if (filters.sort === 'createdDate,desc') {
        return 'Sort product by newest';
      }
      if (filters.sort === 'originalPrice,asc') {
        return 'Sort product by price low to high';
      }
      if (filters.sort === 'originalPrice,desc') {
        return 'Sort product by price high to low';
      }
    },
    isActive: () => true,
    isVisible: (filters) => filters['sort'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.sort;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters) => `From ${filters['price_gte']} To ${filters['price_lte']}`,
    isActive: () => true,
    isVisible: (filters) => filters['price_gte'] && filters['price_lte'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['price_gte'];
      delete newFilters['price_lte'];
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: (filters) => `Category: ${filters['category']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category'];
      return newFilters;
    },
    onToggle: (filters) => {},
  },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilterList = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilterList.map((x) => {
        const isFilterActive = x.isActive(filters);
        return (
          <li key={x.id}>
            <Chip
              icon={x.icon}
              label={x.getLabel(filters)}
              className={isFilterActive ? 'is-active' : ''}
              variant={isFilterActive ? 'default' : 'outlined'}
              color={isFilterActive ? 'secondary' : 'default'}
              onClick={
                x.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return;

                      const newFilters = x.onToggle(filters);
                      onChange(newFilters);
                    }
              }
              onDelete={
                x.isRemovable
                  ? () => {
                      if (!onChange) return;

                      const newFilters = x.onRemove(filters);
                      onChange(newFilters);
                    }
                  : null
              }
            />
          </li>
        );
      })}
    </Box>
  );
}

export default FilterViewer;
