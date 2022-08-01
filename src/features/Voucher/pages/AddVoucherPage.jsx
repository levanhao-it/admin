import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import voucherApi from "components/api/voucherApi";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import VoucherAddForm from "../components/VoucherAddForm";

AddVoucherPage.propTypes = {};

const useStyle = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(0, 4),
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontWeight: "bold",
  },
}));

function AddVoucherPage(props) {
  const classes = useStyle();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await voucherApi.add(values);

      if (status === "OK") {
        setTimeout(() => {
          history.push("/vouchers");
        }, 1000);
        enqueueSnackbar("Add product successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <div className={classes.box}>
      <Box className={classes.header}>
        <Typography component="h1" variant="h4" className={classes.heading}>
          Add Voucher
        </Typography>
      </Box>

      <Paper elevation={0}>
        <VoucherAddForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
}

export default AddVoucherPage;
