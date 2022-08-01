import { InputAdornment, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

PriceField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PriceField(props) {
  const { form, name, label, disabled } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      fullWidth
      margin="normal"
      variant="outlined"
      label={label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      id="outlined-size-normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AttachMoneyIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PriceField;
