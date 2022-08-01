import {
  Box,
  Collapse,
  IconButton,
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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import categoryApi from 'components/api/category';
import useCategoryDetail from 'features/Category/hooks/useCategoryDetail';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CategoryForm from '../CategoryEditForm';

CategoryList.propTypes = {
  data: PropTypes.array,
  onSubmit: PropTypes.func,
};
CategoryList.defaultProps = {
  data: [],
};

Row.propTypes = {
  row: PropTypes.object,
  onSubmitEdit: PropTypes.func,
};

const useStyles = makeStyles({
  margin: {
    '&:first-child': {
      marginRight: '15px',
    },
  },
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row, onSubmitEdit } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { category, loading } = useCategoryDetail(row.id);
  const dataCategory = category.data;

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await categoryApi.update(row.id, values);
      // ok then show user list
      if (status === 'OK') {
        // do something here
        const { data } = await categoryApi.getAll();
        onSubmitEdit(data);
        enqueueSnackbar('Edit Category Success', {
          variant: 'success',
          autoHideDuration: 1000,
        });
        setOpen(false);
      } else {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log('failed to Category : ', error.message);
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.code}</TableCell>
        <TableCell align="right">{row.quantity_product}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <CategoryForm category={dataCategory} onSubmit={handleSubmit} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CategoryList({ data, onSubmit }) {
  const [openEdit, setOpenEdit] = React.useState(false);

  const rows = [];
  data.map((e) => {
    rows.push({
      id: e.id,
      name: e.name,
      code: e.code,
      quantity_product: e.productList.length,
    });
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditCategory = (data) => {
    onSubmit(data);
    setOpenEdit(false);
  };
  return (
    <div>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">CODE</TableCell>
                <TableCell align="right">QUANTITY PRODUCT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} onSubmitEdit={handleEditCategory} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default CategoryList;
