import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';

import ButtonActive from 'components/component-custom/ButtonActive';
import InputField from 'components/form-controls/InputField';

import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddressForm.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 40px',
    textAlign: 'center',
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

function AddressForm(props) {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    firstName: yup.string().required('Please enter first name'),
    lastName: yup.string().required('Please enter last name'),

    address: yup
      .string()
      .required('Please enter address')
      .test('Should has at least two words', 'Please enter at least two words', (value) => {
        const words = value.split(' ');
        return words.length >= 2;
      }),
    phoneNumber: yup
      .string()
      .required('Please enter phone number')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      phoneNumber: '',
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

  return (
    <Box className={classes.root}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Typography variant="h6" className={classes.heading}>
          Add Address
        </Typography>
        <InputField name="firstName" label="First Name" form={form} />
        <InputField name="lastName" label="Last Name" form={form} />
        <InputField name="address" label="Address" form={form} />
        <InputField name="phoneNumber" label="Phone" form={form} />
        <Box>
          <ColorBlueButton
            variant="contained"
            color="primary"
            className={classes.margin}
            type="submit"
          >
            Save
          </ColorBlueButton>
          <ColorCancelButton variant="contained" color="primary" className={classes.margin}>
            Cancel
          </ColorCancelButton>
        </Box>
      </form>
    </Box>
  );
}

export default AddressForm;
