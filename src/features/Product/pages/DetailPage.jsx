import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import productApi from "components/api/productApi";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import ProductDetailList from "../components/ProductDetailList";
import ProductFilters from "../components/ProductFilters";

DetailPage.propTypes = {};

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

  title: {
    fontWeight: "bold",
  },
}));

function DetailPage(props) {
  const classes = useStyle();
  const [product, setProduct] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const history = useHistory();
  const {
    params: { productId },
  } = useRouteMatch();

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.getById(productId);
        const data = result.data;
        setProduct(data);
        setProductDetail(data.productDetailList);
      } catch (error) {
        console.log("Failed to fetch user", error);
      }
    })();
  }, [productId]);

  const handleAddProductDetail = () => {
    history.push(`/products/${productId}/add`);
  };

  const handleEditDetail = (data) => {
    console.log(data);
    setProductDetail(data.productDetailList);
    console.log(productDetail);
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Product Detail
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAddProductDetail}
        >
          Add
        </Button>
      </Box>
      <Box mt={4} ml={4}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Name:{" "}
            </Typography>
            <Typography component="span">{product.name}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Category:{" "}
            </Typography>
            <Typography component="span">{product.categoryName}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography component="span" className={classes.title}>
              Price:{" "}
            </Typography>
            <Typography component="span">{product.originalPrice}</Typography>
          </Grid>
        </Grid>
      </Box>

      <ProductDetailList data={productDetail} onSubmit={handleEditDetail} />
    </div>
  );
}

export default DetailPage;
