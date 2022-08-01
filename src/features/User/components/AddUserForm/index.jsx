import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

import ButtonActive from 'components/component-custom/ButtonActive';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

AddUserForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '10px 40px',
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    left: '45%',
    marginTop: '-50px',
    marginLeft: '-50px',
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
    marginBottom: '20px',
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
const ColorCancelButton = withStyles((theme) => ({
  root: {
    color: '#5048e5',
    backgroundColor: ' #fff',
    '&:hover': {
      backgroundColor: '#5048e50a',
    },
    borderRadius: '5px',
    border: '1px solid #5048e5',
  },
}))(Button);

function AddUserForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter full name')
      .test('Should has at least two words', 'Please enter at least two words', (value) => {
        const words = value.split(' ');
        return words.length >= 2;
      }),
    email: yup.string().required('Please enter email').email('Please enter valid email'),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'Title must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Please enter confirm password')
      .oneOf([yup.ref('password'), null], 'Password does not match'),
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    console.log(props);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };

  const { isSubmitting } = form.formState;

  const classes = useStyles();
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Typography variant="h6" className={classes.heading}>
        Add User
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} xl={12}>
          <InputField name="fullName" label="Full Name" form={form} />
        </Grid>
        <Grid item xs={12} md={6} xl={12}>
          <InputField name="email" label="Email" form={form} />
        </Grid>
        <Grid item xs={12} md={6} xl={12}>
          <PasswordField name="password" label="Password" form={form} />
        </Grid>
        <Grid item xs={12} md={6} xl={12}>
          <PasswordField name="confirmPassword" label="Confirm Password" form={form} />
        </Grid>
      </Grid>
      <Box>
        <ColorBlueButton
          variant="contained"
          color="primary"
          className={classes.margin}
          type="submit"
        >
          Create
        </ColorBlueButton>
        <ColorCancelButton
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={goToPreviousPath}
        >
          Cancel
        </ColorCancelButton>
      </Box>
    </form>
  );
}

export default AddUserForm;
