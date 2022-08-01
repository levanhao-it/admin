import { makeStyles } from '@material-ui/core';
import categoryApi from 'components/api/category';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import CategoryAddForm from '../CategoryAddForm';
import PropTypes from 'prop-types';

AddCategory.propTypes = {
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles({});

function AddCategory({ onSubmit }) {
  const classes = useStyles();

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const { status } = await categoryApi.add(values);
      // do something here
      if (status === 'OK') {
        enqueueSnackbar('Add Category Success', { variant: 'success', autoHideDuration: 1000 });
        const { data } = await categoryApi.getAll();
        onSubmit(data);
      }
    } catch (error) {
      console.log('failed to register user: ', error.message);
      enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000 });
    }
  };
  return (
    <div>
      <CategoryAddForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddCategory;
