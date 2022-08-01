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
import PropTypes from "prop-types";
import React, { useState } from "react";
import VoucherItem from "./VoucherItem";

VoucherList.propTypes = {
  onChangeData: PropTypes.func,
  data: PropTypes.array,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "32px",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "code", label: "Code", minWidth: 150, align: "center" },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    align: "center",
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 170,
    align: "center",
  },
  {
    id: "priceCondition",
    label: "Condition",
    minWidth: 170,
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
];

function VoucherList({ onChangeData, data = [] }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeData = (data) => {
    if (onChangeData) onChangeData(data);
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
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <VoucherItem data={row} onChangeData={handleChangeData} />
                  );
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

export default VoucherList;
