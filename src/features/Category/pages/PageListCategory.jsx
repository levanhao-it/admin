import { Box, Button, Dialog, makeStyles, withStyles } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import CategoryIcon from '@material-ui/icons/Category';
import categoryApi from 'components/api/category';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AddCategory from '../components/AddCategory';
import CategoryList from '../components/CategoryList';

PageListCategory.propTypes = {};

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: '#5048e5',
    '&:hover': {
      backgroundColor: '#3832a0',
    },
    borderRadius: '5px',
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    padding: '58px 50px',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  h1: {
    margin: '0 ',
  },
  icon: {
    float: 'right',
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    fontSize: '30px',
  },
}));

function PageListCategory(props) {
  const classes = useStyles();
  const history = useHistory();

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoryApi.getAll();
        setCategoryList(data);
      } catch (error) {
        console.log('Failed to fetch getAll', error);
      }
    })();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCategory = (data) => {
    setCategoryList(data);
  };

  return (
    <div className={classes.padding}>
      <Box className={classes.box}>
        <h1 className={classes.h1}>Categories</h1>
        <ColorButton
          variant="contained"
          color="primary"
          className={classes.margin}
          startIcon={<CategoryIcon />}
          onClick={handleClickOpen}
        >
          Add
        </ColorButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <AddCategory onSubmit={handleAddCategory} />
      </Dialog>

      <CategoryList data={categoryList} onSubmit={handleAddCategory} />
    </div>
  );
}

export default PageListCategory;
