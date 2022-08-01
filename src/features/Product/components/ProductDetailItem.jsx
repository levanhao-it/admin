import {
  Avatar,
  Box,
  Chip,
  Collapse,
  IconButton,
  makeStyles,
  Paper,
  TableCell,
  TableRow,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import productApi from "components/api/productApi";
import productDetailApi from "components/api/productDetailApi";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import ProductDetailEditForm from "./ProductDetailEditForm";
import PropTypes from "prop-types";

ProductDetailItem.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const columns = [
  { id: "salePrice", label: "Sale price", minWidth: 100 },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
  },
  {
    id: "size",
    label: "Size",
    minWidth: 170,
  },

  {
    id: "color",
    label: "Color",
    minWidth: 170,
  },
  {
    id: "status",
    label: "status",
    minWidth: 170,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

const useStyles = makeStyles((theme) => ({}));

function ProductDetailItem({ row, onSubmit }) {
  const [open, setOpen] = useState(false);
  const {
    params: { productId },
  } = useRouteMatch();

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const { status, message } = await productDetailApi.update(
        productId,
        row.id,
        values
      );
      setOpen(false);
      // ok then show user list
      if (status === "OK") {
        // do something here
        const { data } = await productApi.getById(productId);
        onSubmit(data);
        enqueueSnackbar("Edit product detail success", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to fetch product: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const { status, message } = await productDetailApi.remove(productId, id);
      setOpen(false);
      // ok then show user list
      if (status === "OK") {
        const { data } = await productApi.getById(productId);
        onSubmit(data);
        // do something here
        enqueueSnackbar("Delete product successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to delete product: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };
  const classes = useStyles();

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            alt=""
            src={row.linkImg}
            className={classes.square}
            style={{ width: "50px", height: "50px" }}
          ></img>
        </TableCell>
        <TableCell>{row.salePrice}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.size}</TableCell>
        <TableCell>{row.color}</TableCell>
        <TableCell>
          {row.status ? (
            <Chip label="PUBLIC" color="primary" />
          ) : (
            <Chip label="PRIVATE" color="secondary" />
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Paper elevation={0}>
                <ProductDetailEditForm
                  onSubmit={handleSubmit}
                  values={row}
                  onDelete={handleDelete}
                />
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProductDetailItem;
