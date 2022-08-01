import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import categoryApi from "components/api/category";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function SelectField(props) {
  const { form, name, label, disabled, values } = props;
  const { errors } = form;
  const hasError = errors[name];

  return (
    <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={
          <Select>
            {values.map((x) => {
              return <MenuItem value={x.id}>{x.name}</MenuItem>;
            })}
          </Select>
        }
        label={label}
        disabled={disabled}
        error={!!hasError}
        helperText={errors[name]?.message}
      />
    </FormControl>
  );
}

export default SelectField;
