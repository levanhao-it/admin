import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, FormControlLabel, Grid, makeStyles } from '@material-ui/core';
import InputField from 'components/form-controls/InputField';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import colorApi from 'components/api/colorApi';
import sizeApi from 'components/api/sizeApi';
import { jsonToFormData } from 'components/constant';
import PriceField from 'components/form-controls/PriceField';
import SelectField from 'components/form-controls/SelectField';
import { useHistory, useRouteMatch } from 'react-router-dom';

ProductDetailAddForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  salePrice: yup.number().required('Please enter price').min(1, 'Price must be more than 0'),
  quantity: yup.number().required('Please enter price').min(1, 'Price must be more than 0'),

  sizeId: yup.string().required('Please choose size'),
  colorId: yup.string().required('Please choose color'),
});
const useStyle = makeStyles((theme) => ({
  boxFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(4, 0),
  },

  btn: {
    '& > span': {
      textTransform: 'capitalize',
    },
  },
  upload: {
    margin: ' 0px 25px',
  },
  input: {
    display: 'none',
  },
  img: {
    marginTop: '25px',
  },
}));

function ProductDetailAddForm({ onSubmit }) {
  const classes = useStyle();
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [checked, setChecked] = useState(false);
  const [image, setImage] = useState({});
  const [file, setFile] = useState(null);

  const {
    params: { productId },
  } = useRouteMatch();

  const history = useHistory();
  const form = useForm({
    defaultValues: {
      salePrice: '',
      quantity: '',
      sizeId: '',
      colorId: '',
      file: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

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

  const handleCancel = () => {
    history.push(`/products/${productId}`);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
          <SelectField name="colorId" label="Color" form={form} values={colors} />
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
            <img src={file} alt="" width={'60px'} className={classes.img} />
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

      <Box mt={4}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.btn}
          style={{ marginRight: '16px' }}
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

export default ProductDetailAddForm;
