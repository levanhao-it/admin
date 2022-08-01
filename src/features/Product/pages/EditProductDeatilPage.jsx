import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import ProductEditForm from "../components/ProductEditForm";
import productApi from "components/api/productApi";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSnackbar } from "notistack";
import useProduct from "../hooks/useProduct";

EditProductDetailPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 4),
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
  },

  button: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}));

function EditProductDetailPage({ row, onOpen }) {
  const classes = useStyle();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { product } = useProduct(row.id);

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await productApi.update(row.id, values);
      if (onOpen) {
        onOpen(false);
      }
      // ok then show user list
      if (status === "OK") {
        // do something here
        enqueueSnackbar("Edit product success", {
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
      const { status, message } = await productApi.remove(id);
      if (onOpen) {
        onOpen(false);
      }
      // ok then show user list
      if (status === "OK") {
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

  return (
    <div className={classes.box}>
      <Paper elevation={0}>
        <ProductEditForm
          onSubmit={handleSubmit}
          product={product}
          onDelete={handleDelete}
        />
      </Paper>
    </div>
  );
}

export default EditProductDetailPage;
