import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { purple } from "@material-ui/core/colors";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import VoucherList from "../components/VoucherList";
import voucherApi from "components/api/voucherApi";
import { useHistory } from "react-router-dom";

ListVoucherPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 4),
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
  },

  button: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}));

function ListVoucherPage(props) {
  const classes = useStyle();
  const [voucherList, setVoucherList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await voucherApi.getAll();
      setVoucherList(data);
    })();
  }, []);

  const handleChangeData = (data) => {
    setVoucherList(data);
  };

  const handleAddProduct = () => {
    history.push("/vouchers/add");
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Vouchers
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
        >
          Add
        </Button>
      </Box>

      <VoucherList onChangeData={handleChangeData} data={voucherList} />
    </div>
  );
}

export default ListVoucherPage;
