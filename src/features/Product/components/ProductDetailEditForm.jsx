import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import InputField from "components/form-controls/InputField";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import colorApi from "components/api/colorApi";
import sizeApi from "components/api/sizeApi";
import PriceField from "components/form-controls/PriceField";
import SelectField from "components/form-controls/SelectField";
import { jsonToFormData } from "components/constant";

ProductDetailEditForm.propTypes = {
  onSubmit: PropTypes.func,
  product: PropTypes.object,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
};

const schema = yup.object().shape({
  salePrice: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),
  quantity: yup
    .number()
    .required("Please enter price")
    .min(1, "Price must be more than 0"),

  sizeId: yup.string().required("Please choose size"),

  colorId: yup.string().required("Please choose color"),
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

  boxPublic: {
    margin: theme.spacing(2, 0, 0, 2),
    "&  .MuiFormControlLabel-label": {
      fontSize: "20x",
    },
  },
  upload: {
    margin: "25px",
  },
  input: {
    display: "none",
  },
}));

function ProductDetailEditForm({ onSubmit, values, onDelete }) {
  const classes = useStyle();
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [checked, setChecked] = useState(values.status);
  const [image, setImage] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const form = useForm({
    defaultValues: {
      salePrice: "",
      quantity: "",
      sizeId: "",
      colorId: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fieldList = ["salePrice", "quantity", "sizeId", "colorId"];
    fieldList.forEach((element, i) => {
      form.setValue(element, values[element]);
    });
  }, [values]);

  useEffect(() => {
    const fetchCategories = async () => {
      const colors = await colorApi.getAll();
      const sizes = await sizeApi.getAll();

      setColors(colors.data);
      setSizes(sizes.data);
    };

    fetchCategories();
  }, []);

  const handelSubmit = async (values) => {
    if (onSubmit) {
      values.status = checked;
      const jsonObject = {
        fileImg: image,
        productDetailRequest: JSON.stringify(values).trim(),
      };
      const formData = jsonToFormData(jsonObject);
      await onSubmit(formData);
    }

    form.reset();
  };

  const handleDelete = async (id) => {
    if (onDelete) {
      await onDelete(id);
    }
  };
  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const fileSelected = URL.createObjectURL(event.target.files[0]);
      setFile(fileSelected);
      setImage(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <PriceField name="salePrice" label="Sale Price" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField name="quantity" label="Quantity" form={form} />
        </Grid>

        <Grid item xs={4}>
          <SelectField name="sizeId" label="Size" form={form} values={sizes} />
        </Grid>

        <Grid item xs={4}>
          <SelectField
            name="colorId"
            label="Color"
            form={form}
            values={colors}
          />
        </Grid>
        <Grid item xs={4}>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              color="default"
              aria-label="upload picture"
              component="span"
              className={classes.upload}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
            <img src={file} alt="" width={"60px"} className={classes.img} />
          </label>
        </Grid>

        <Grid item xs={4}>
          <Box className={classes.boxPublic}>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={checked}
                  color="primary"
                  onChange={handleChange}
                />
              }
              label="Public"
              size="large"
            />
          </Box>
        </Grid>
      </Grid>

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
          onClick={() => handleDelete(values.id)}
          variant="outlined"
        >
          Delete product detail
        </Button>
      </Box>
    </form>
  );
}

export default ProductDetailEditForm;
