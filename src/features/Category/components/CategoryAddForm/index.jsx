import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

import InputField from 'components/form-controls/InputField';

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

CategoryAddForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid black`,
    padding: '10px 40px',
  },
  title: {
    margin: '10px 0 20px 0',
  },
  heading: {
    fontSize: '26px',
    textTransform: 'uppercase',
  },
  processing: {
    left: '-65px',
    top: '-18px',
    width: '479px',
  },
  heading: {
    fontSize: '18px',

    fontWeight: '600',
  },
  margin: {
    marginTop: '20px',
    '&:first-child': {
      marginRight: '15px',
    },
  },
}));
const ColorBlueButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5048e5',
    '&:hover': {
      backgroundColor: '#3832a0',
    },
    borderRadius: '5px',
  },
}))(Button);

function CategoryAddForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    name: yup.string().required('Please enter name'),
    code: yup.string().required('Please enter code'),
  });
  const form = useForm({
    defaultValues: {
      name: '',
      code: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Typography variant="h6" className={classes.heading}>
          Add Category
        </Typography>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={12}>
            <InputField name="name" label="Name Category" form={form} />
          </Grid>
          <Grid item xs={12} md={6} xl={12}>
            <InputField name="code" label="Code Category" form={form} />
          </Grid>
        </Grid>

        <Box>
          <ColorBlueButton
            variant="contained"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Save
          </ColorBlueButton>
        </Box>
      </form>
    </Box>
  );
}

export default CategoryAddForm;
