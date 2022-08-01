import React, { useState } from "react";
import PropTypes from "prop-types";
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
} from "@material-ui/core";
import OrderItem from "./OrderItem";

OrderList.propTypes = {
  data: PropTypes.object,
  onChangeData: PropTypes.func,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "id", label: "Id", minWidth: 100 },
  { id: "email ", label: "Email", minWidth: 100 },
  {
    id: "quantityItem",
    label: "Quanity Item",
    minWidth: 170,
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
  },
  {
    id: "subtotal",
    label: "Sub Total",
    minWidth: 170,
  },

  {
    id: "status",
    label: "Status",
    minWidth: 100,
  },

  {
    id: "actions",
    label: "Actions",
    minWidth: 50,
    align: "right",
  },
];

function OrderList({ data }) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(data);

  return (
    <div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return <OrderItem row={row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default OrderList;
