import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
import ButtonActive from '../../../../components/component-custom/ButtonActive';
import './styles.scss';

LogInForm.propTypes = {
  onSubmit: PropTypes.func,
};

const schema = yup.object().shape({
  email: yup.string().required('Please enter admin'),
  password: yup
    .string()
    .required('Please enter password')
    .min(6, 'Title must be at least 6 characters'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '350px',
    padding: '10px 40px',
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    left: '42%',
    marginTop: '-50px',
    marginLeft: '-50px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  submit: {
    backgroundColor: '#2AC37D',
    fontSize: '14px',
  },
  img: {
    width: '100px',
  },
  link: {
    fontSize: '12px',
    color: '#8d8d8d',
    textDecoration: 'underline',
  },
  slogan: {
    margin: '10px 0 20px 0',
  },
  process: {
    left: '-65px',
    top: '-18px',
    width: '479px',
  },
}));

function LogInForm(props) {
  const [checked, setChecked] = useState(false);

  const classes = useStyles();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handelSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      values.remember = checked;

      await onSubmit(values);
    }

    form.reset();
  };
  const { isSubmitting } = form.formState;

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Box align="center" className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.process} />}

      <Typography className={classes.title} component="h3" variant="h5">
        Sign In
      </Typography>
      <Typography className={classes.slogan}>Your account for everything shoes</Typography>

      <form onSubmit={form.handleSubmit(handelSubmit)}>
        <InputField name="email" label="Admin" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <Box justifyContent={'space-between'} alignItems={'center'} display="flex">
          <FormControlLabel
            control={<Checkbox defaultChecked onChange={handleChangeChecked} checked={checked} />}
            label="Keep me signed in"
          />
        </Box>

        <Box>
          <Typography>
            <Box sx={{ fontFamily: 'default', m: 1, fontSize: 12 }}>
              By logging in, you agree to our{' '}
              <Link href="#" className={classes.link}>
                {' '}
                Privacy Policy{' '}
              </Link>{' '}
              and{' '}
              <Link href="#" className={classes.link}>
                {' '}
                Terms of Use{' '}
              </Link>{' '}
            </Box>
          </Typography>

          <ButtonActive disabled={isSubmitting} content="sign in" type="submit" />
        </Box>
      </form>
    </Box>
  );
}

export default LogInForm;
