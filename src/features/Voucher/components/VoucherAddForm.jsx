import React, { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import InputField from "components/form-controls/InputField";
import { useHistory } from "react-router-dom";

VoucherAddForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter voucher name"),
  code: yup
    .string()
    .required("Please enter voucher code")
    .test(
      "Should has at least two words",
      "Please enter at only one words",
      (value) => {
        const words = value.split(" ");
        return words.length === 1;
      }
    ),

  quantity: yup
    .number()
    .required("Please enter quantity")
    .min(0, "Price must be more than 0"),

  discount: yup
    .number()
    .required("Please enter quantity")
    .min(0, "Price must be more than 0"),

  priceCondition: yup
    .number()
    .required("Please enter quantity")
    .min(0, "Price must be more than 0"),
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

function VoucherAddForm({ onSubmit }) {
  const classes = useStyle();
  const [checked, setChecked] = useState(true);
  const history = useHistory();
  const form = useForm({
    defaultValues: {
      name: "",
      code: "",
      quantity: "",
      discount: "",
      priceCondition: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    if (onSubmit) {
      values.status = checked;
      await onSubmit(values);
    }
    form.reset();
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCancel = () => {
    history.push("/vouchers");
  };

  return (
    <form onSubmit={form.handleSubmit(handelSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <InputField name="name" label="Voucher name" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField name="code" label="Voucher code" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField name="quantity" label="Quantity" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField name="discount" label="Discount" form={form} />
        </Grid>

        <Grid item xs={6}>
          <InputField
            name="priceCondition"
            label="Price condition"
            form={form}
          />
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

export default VoucherAddForm;
