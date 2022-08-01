import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Paper,
  TableCell,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import voucherApi from "components/api/voucherApi";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import VoucherForm from "./VoucherForm";

VoucherItem.propTypes = {
  data: PropTypes.object,
  onChangeData: PropTypes.func,
};

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  { id: "code", label: "Code", minWidth: 150, align: "center" },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 100,
    align: "center",
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 170,
    align: "center",
  },
  {
    id: "priceCondition",
    label: "Condition",
    minWidth: 170,
    align: "center",
  },
];

function VoucherItem({ data = {}, onChangeData }) {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeData = (data) => {
    if (onChangeData) onChangeData(data);
  };

  const handleSubmit = async (values) => {
    try {
      const { status, message } = await voucherApi.update(data.id, values);
      setOpen(false);

      if (status === "OK") {
        const { data } = await voucherApi.getAll();
        handleChangeData(data);
        enqueueSnackbar("Edit voucher successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to fetch voucher: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  const handleDelete = async (data) => {
    try {
      const { status, message } = await voucherApi.remove(data.id);
      setOpen(false);

      if (status === "OK") {
        const { data } = await voucherApi.getAll();
        handleChangeData(data);
        enqueueSnackbar("Delete product successfully", {
          variant: "success",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar(message, { variant: "error", autoHideDuration: 1000 });
      }
    } catch (error) {
      console.log("Faied to delete product: ", error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000,
      });
    }
  };

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          const value = data[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {value}
            </TableCell>
          );
        })}

        <TableCell key="status" align="center">
          {data.status ? (
            <Chip label="PUBLIC" color="primary" />
          ) : (
            <Chip label="PRIVATE" color="secondary" />
          )}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Paper elevation={0}>
                <VoucherForm
                  onSubmit={handleSubmit}
                  onDelete={handleDelete}
                  data={data}
                />
              </Paper>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default VoucherItem;
