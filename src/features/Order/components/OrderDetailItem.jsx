import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

OrderDetailItem.propTypes = {};

const useStyle = makeStyles((theme) => ({
  boxName: {
    display: "flex",
    alignItems: "center",
  },

  name: {
    marginLeft: theme.spacing(2),
  },
}));

function OrderDetailItem({ row }) {
  const classes = useStyle();
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      <TableCell>
        <Box className={classes.boxName}>
          <img
            src={row.image}
            alt={row.nameProduct}
            width="50px"
            height="50px"
          />
          <Typography component="span" className={classes.name}>
            {row.nameProduct}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{row.size}</TableCell>
      <TableCell>{row.color}</TableCell>
      <TableCell>{row.salePrice}</TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell>{row.quantity * row.salePrice}</TableCell>
    </TableRow>
  );
}

export default OrderDetailItem;
