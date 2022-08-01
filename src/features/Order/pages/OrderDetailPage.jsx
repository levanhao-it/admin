import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { purple } from '@material-ui/core/colors';
import CachedIcon from '@material-ui/icons/Cached';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import orderApi from 'components/api/orderApi';
import UpdateIcon from '@material-ui/icons/Update';
import OrderDetailList from '../components/OrderDetailList';
import { useSnackbar } from 'notistack';
import ProductFilters from 'features/Product/components/ProductFilters';
import CancelIcon from '@material-ui/icons/Cancel';

OrderDetailPage.propTypes = {};

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

  title: {
    fontWeight: 'bold',
  },
}));

const STATUS = {
  PROCESS: 'Đang xử lí',
  RECEIVED: 'Đã nhận',
  CANCELLED: 'Đã hủy',
};

function OrderDetailPage(props) {
  const classes = useStyle();
  const [order, setOrder] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [statusOrder, setStatusOrder] = React.useState(STATUS.PROCESS);
  const { enqueueSnackbar } = useSnackbar();
  const {
    params: { orderId },
  } = useRouteMatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await orderApi.getById(orderId);
        setOrder(data);
        setOrderDetail(data.orderItemResponseList);
        setStatusOrder(data.status);
      } catch (error) {
        console.log('Failed to fetch order', error);
      }
    })();
  }, [orderId]);

  const handleChangeStatus = (event) => {
    setStatusOrder(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const { status, message } = await orderApi.update(orderId, {
        status: statusOrder,
      });
      setOpen(false);

      const { data } = await orderApi.getById(orderId);
      setOrder(data);
      setOrderDetail(data.orderItemResponseList);
      // ok then show user list
      if (status === 'OK') {
        // do something here
        enqueueSnackbar('Update status of order successfully', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: 'error', autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log('Faied to update status of order ', error.message);
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: 1000,
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Order Detail
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<UpdateIcon />}
          onClick={handleClickOpen}
        >
          Update
        </Button>
      </Box>
      <Box mt={4} ml={4}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Id:{' '}
            </Typography>
            <Typography component="span">{order.id}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Email:{' '}
            </Typography>
            <Typography component="span">{order.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Quantity Item:{' '}
            </Typography>
            <Typography component="span">{order.quantityItem}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Status:{' '}
            </Typography>
            <Typography component="span">{order.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Total:{' '}
            </Typography>
            <Typography component="span">{order.total}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Discount:{' '}
            </Typography>
            <Typography component="span">{order.feeVoucher}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              SubTotal:{' '}
            </Typography>
            <Typography component="span">{order.subtotal}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Paper elevation={0}>
        <ProductFilters />
      </Paper>
      <OrderDetailList data={orderDetail} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup name="status" value={statusOrder} onChange={handleChangeStatus}>
              <FormControlLabel value={STATUS.PROCESS} control={<Radio />} label="Đang xử lí" />
              <FormControlLabel value={STATUS.RECEIVED} control={<Radio />} label="Đã nhận" />
              <FormControlLabel value={STATUS.CANCELLED} control={<Radio />} label="Đã hủy" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} className={classes.button}>
            Update
          </Button>
          <Button onClick={handleClose} style={{ color: '#9c27b0' }} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderDetailPage;
