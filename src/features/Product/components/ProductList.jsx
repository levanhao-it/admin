import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import ProductItem from './ProductItem';

ProductList.propTypes = {
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'name', label: 'Name', minWidth: 300 },
  { id: 'stock', label: 'Stock', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
];

function ProductList({ data, onSubmit }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const productList1 = data.map((product) => {
      let totalQuantity = 0;
      if (product.productDetailList.length > 0) {
        totalQuantity = product.productDetailList.reduce(
          (total, number) => total + number.quantity,
          0
        );
      }
      let imageList = [];
      product.productDetailList.forEach((element) => {
        imageList.push(element.linkImg);
      });

      return {
        id: product.id,
        name: product.name,
        stock: totalQuantity,
        price: product.originalPrice,
        category: product.categoryName,
        imageList: imageList,
      };
    });
    setProductList(productList1);
  }, [data]);
  console.log(productList.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleOnSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return <ProductItem row={row} onSubmit={handleOnSubmit} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={productList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default ProductList;
