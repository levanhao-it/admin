import { Box, Button, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import productApi from 'components/api/productApi';
import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import queryString from 'query-string';
import FilterViewer from '../components/Filters/FilterViewer';
import { Alert } from '@material-ui/lab';

ListPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 4),
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
  },

  button: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  alert: {
    marginTop: theme.spacing(2),
    width: '100%',
    margin: 'auto',
  },
}));

function ListPage(props) {
  const classes = useStyle();
  const [productList, setProductList] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params._page) || 1,
      limit: Number.parseInt(params._limit) || 100,
      sort: params.sort || 'createdDate,desc',
      category: params.category || '',
      price_gte: params.price_gte || '',
      price_lte: params.price_lte || '',
      size: params.size || '',
      color: params.color || '',
    };
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await productApi.getAll(queryParams);
        setProductList(data.products);
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    })();
  }, [queryParams]);

  const handleAddProduct = () => {
    history.push(`/products/add`);
  };

  const handleEditProduct = (data) => {
    setProductList(data.products);
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Products
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add
        </Button>
      </Box>
      <Paper elevation={0}>
        <FilterViewer filters={queryParams} onChange={setNewFilters} />
        <Divider />
        <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
      </Paper>
      {productList.length === 0 ? (
        <Alert severity="warning" className={classes.alert}>
          Sorry. No matching products found!
        </Alert>
      ) : (
        <ProductList data={productList} onSubmit={handleEditProduct} />
      )}
    </div>
  );
}

export default ListPage;
