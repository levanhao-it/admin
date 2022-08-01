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

ProductAddForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter name product"),
  originalPrice: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),
  categoryId: yup.string().required("Please choose category"),
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

function ProductAddForm({ onSubmit }) {
  const classes = useStyle();
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const [description, setDescription] = useState("");
  const form = useForm({
    defaultValues: {
      name: "",
      categoryId: "",
      originalPrice: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChange = (content) => {
    setDescription(content);
  };

  const handelSubmit = async (values) => {
    console.log(values);
    if (onSubmit) {
      values.categoryId = Number(values.categoryId);
      values.description = description;
      console.log(values);
      await onSubmit(values);
    }

    form.reset();
    setDescription("");
  };

  const handleCancel = () => {
    history.push("/products");
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await categoryApi.getAll();
      const categoriesFormat = categoriesList.data.map((x) => {
        return {
          id: x.id,
          name: x.name,
          code: x.code,
        };
      });

      setCategories(categoriesFormat);
    };

    fetchCategories();
  }, []);

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={4}>
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

      <EditorProduct onChange={handleChange} defaultValue={description} />

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.btn}
          style={{ marginRight: "16px" }}
          type="submit"
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          size="large"
          color="primary"
          className={classes.btn}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
}

export default ProductAddForm;
