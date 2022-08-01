import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-controls/InputField";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";

import SelectField from "components/form-controls/SelectField";
import PriceField from "components/form-controls/PriceField";
import { useHistory } from "react-router-dom";
import categoryApi from "components/api/category";
import EditorProduct from "components/EditorProduct";

ProductEditForm.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter name product"),
  // description: yup
  //   .string()
  //   .required("Please enter description")
  //   .min(6, "Title must be at least 6 characters"),
  categoryId: yup.string().required("Please choose category"),
  originalPrice: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),
});
const useStyle = makeStyles((theme) => ({
  boxFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(4, 0),
  },

  btn: {
    "& > span": {
      textTransform: "capitalize",
    },
  },
}));

function ProductEditForm({ onSubmit, product = {}, onDelete }) {
  const classes = useStyle();
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState(() => product.description);

  const form = useForm({
    defaultValues: {
      name: "",
      // description: "",
      categoryId: "",
      originalPrice: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fieldList = ["name", "categoryId", "originalPrice"];
    fieldList.forEach((element, i) => {
      form.setValue(element, product[element]);
    });
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await categoryApi.getAll();

      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handelSubmit = async (values) => {
    console.log(values);
    values.description = description;

    console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id);
    }
  };

  const handleChange = (content) => {
    setDescription(content);
  };

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <InputField name="name" label="Product Name" form={form} />
        </Grid>

        <Grid item xs={6}>
          <SelectField
            name="categoryId"
            label="Category"
            form={form}
            values={categories}
          />
        </Grid>
        <Grid item xs={6}>
          <PriceField name="originalPrice" label="Price" form={form} />
        </Grid>
      </Grid>

      <EditorProduct defaultValue={description} onChange={handleChange} />

      <Box className={classes.boxFooter}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.btn}
          style={{ marginRight: "16px" }}
          type="submit"
        >
          Update
        </Button>

        <Button
          size="large"
          color="secondary"
          className={classes.btn}
          onClick={() => handleDelete(product.id)}
          variant="outlined"
        >
          Delete product
        </Button>
      </Box>
    </form>
  );
}

export default ProductEditForm;
