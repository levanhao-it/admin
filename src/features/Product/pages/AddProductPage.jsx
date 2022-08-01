import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import productApi from "components/api/productApi";
import { useSnackbar } from "notistack";
import { useHistory, useRouteMatch } from "react-router-dom";
import ProductAddForm from "../components/ProductAddForm";

AddProductPage.propTypes = {};

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

function AddProductPage(props) {
  const classes = useStyle();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await productApi.add(values);
      // ok then show user list
      if (status === "OK") {
        setTimeout(() => {
          history.push("/products");
        }, 1000);
        // do something here
        enqueueSnackbar("Add product successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Add Product
        </Typography>
      </Box>
      <Paper elevation={0}>
        <ProductAddForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
}

export default AddProductPage;
