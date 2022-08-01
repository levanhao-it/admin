import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Chip, IconButton, TableCell, TableRow } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CachedIcon from "@material-ui/icons/Cached";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CancelIcon from "@material-ui/icons/Cancel";

OrderItem.propTypes = {
  row: PropTypes.object,
};

const STATUS = {
  PROCESS: "Đang xử lí",
  RECEIVED: "Đã nhận",
  CANCELLED: "Đã hủy",
};

function OrderItem({ row }) {
  const history = useHistory();

  const handleAction = (id) => {
    history.push(`/orders/${id}`);
  };

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.quantityItem}</TableCell>
        <TableCell>{row.total}</TableCell>
        <TableCell>{row.subtotal}</TableCell>
        <TableCell>
          {row.status === STATUS.PROCESS && (
            <Chip
              icon={<CachedIcon />}
              label="Đang xử lí"
              clickable
              color="primary"
            />
          )}

          {row.status === STATUS.RECEIVED && (
            <Chip
              icon={<AssignmentTurnedInIcon />}
              label="Đã nhận"
              clickable
              color="primary"
            />
          )}

          {row.status === STATUS.CANCELLED && (
            <Chip
              icon={<CancelIcon />}
              label="Đã hủy"
              clickable
              color="primary"
            />
          )}
        </TableCell>
        <TableCell>
          <IconButton size="medium" onClick={() => handleAction(row.id)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default OrderItem;
