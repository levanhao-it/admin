import {
  Box,
  Button,
  Chip,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import orderApi from 'components/api/orderApi';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CachedIcon from '@material-ui/icons/Cached';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CancelIcon from '@material-ui/icons/Cancel';
import userApi from 'components/api/userApi';

Invoice.propTypes = { data: PropTypes.array, user: PropTypes.object };
Invoice.defaultProps = {
  data: [],
};

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'date', label: 'DATE', minWidth: 100 },
  {
    id: 'total',
    label: 'TOTAL',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'STATUS',
    minWidth: 170,
    align: 'center',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 32px',
  },
  paper: {
    marginBottom: '20px',
  },
  textHeading: {
    fontSize: '18px',
    fontWeight: '600',
    lineHeight: '1.375',
    padding: '32px 24px',
  },
  ul: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  li: {
    padding: '12px 24px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: '14px',
    '&:first-child': {
      borderTop: '1px solid #e0e0e0',
    },
  },
  title: {
    fontSize: '14px',
    fontWeight: '600',

    minWidth: '180px',
  },
  value: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'rgb(101 116 139)',
  },
  margin: {
    float: 'right',
  },
}));

function Invoice({ data, user = {} }) {
  const classes = useStyles();
  const history = useHistory();
  const { idUser } = user;

  const [invoiceList, setInvoiceList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.getById(idUser);
        setInvoiceList(data.orderResponseList);
      } catch (error) {
        console.log('Failed to fetch address list', error);
      }
    })();
  }, []);

  const rows = [];
  invoiceList.map((e) => {
    rows.push({
      id: e.id,
      date: e.createDate,
      total: e.subtotal,
      status:
        e.status === 'Đang xử lí' ? (
          <Chip icon={<CachedIcon />} label="Đang xử lí" clickable color="primary" />
        ) : e.status === 'Đã nhận' ? (
          <Chip icon={<AssignmentTurnedInIcon />} label="Đã nhận" clickable color="primary" />
        ) : (
          <Chip icon={<CancelIcon />} label="Đã hủy" clickable color="primary" />
        ),
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

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.paper}>
        <Box className={classes.heading}>
          <Typography className={classes.textHeading}>Recent Invoices</Typography>
        </Box>
        <Paper>
          <TableContainer>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
      </Paper>
    </div>
  );
}

export default Invoice;
