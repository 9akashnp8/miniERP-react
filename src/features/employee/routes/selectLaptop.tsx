import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Typography,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";

import Link from '../../common/components/Link';
import { StyledTableCell } from "../../../lib/theme";
import { getCurrentDate } from "../../../lib/utils";
import { Alert } from '../../common/components/Alert';
import GhostButton from "../../common/components/Button/GhostButton";
import { useReturnLaptopMutation } from "../../laptop/laptopsApiSlice";
import SecondaryButton from "../../common/components/Button/SecondaryButton";

import { useGetEmployeeLaptopsQuery } from "../employeesApiSlice";

export default function SelectLaptop() {
  const formik = useFormik({
    initialValues: {
      returnRemarks: "",
      returnDate: getCurrentDate(new Date()),
    },
    validationSchema: Yup.object({
      returnRemarks: Yup.string().required(),
      returnDate: Yup.date().required(),
    }),
    onSubmit: (values) => handleReturnDialogSubmit(2),
  });
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [ returnLaptop ] = useReturnLaptopMutation()
  const { data: laptops, isLoading } = useGetEmployeeLaptopsQuery(id);
  const [ returnSuccess, setReturnSuccess ] = useState<boolean>(false);
  const [ returnDialogOpen, setReturnDialogOpen ] = useState<boolean>(false);
  const [ isLaptopReplacement, setIsLaptopReplacement  ] = useState<boolean>(false);

  function handleReturnDialogSubmit(laptop_id: number) {
    let payload = { ...formik.values, employee_id: id, laptop_id };
    returnLaptop(payload)
      .unwrap()
      .then((res) => {
        debugger;
        formik.resetForm();
        setReturnSuccess(true);
      })
      .finally(() => {
        setReturnDialogOpen(false);
        if (isLaptopReplacement) {
          setTimeout(() => {
            navigate(`/employee/${id}/assign`);
          }, 1000);
        } else {
          setTimeout(() => {
            navigate(`/employee/${id}/`);
          }, 1000);
        }
      });
  };

  function handleReturnDialogClose() {
    formik.resetForm();
    setReturnDialogOpen(false);
  }

  function handleClose(
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) {
    if (reason === "clickaway") {
      return;
    }
    setReturnSuccess(false);
  }

  if (laptops) {
    return (
      <>
        <Typography variant="h4" component="h1" mb={2}>
          Assigned Laptops
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Hardware ID</StyledTableCell>
                <StyledTableCell align="center">Laptop Sr No</StyledTableCell>
                <StyledTableCell align="center">Laptop Grade</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {laptops.length > 0 ? (
                laptops.map((laptop) => (
                  <TableRow
                    key={laptop.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      <Link to={`/laptop/${laptop.id}`}>
                        {laptop.hardware_id}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{laptop.laptop_sr_no}</TableCell>
                    <TableCell align="center">{laptop.processor}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction={"row"}
                        spacing={1}
                        justifyContent={"center"}
                      >
                        <SecondaryButton
                          size="small"
                          onClick={(e) => setReturnDialogOpen(true)}
                        >
                          Return
                        </SecondaryButton>
                        <Dialog
                          open={returnDialogOpen}
                          onClose={(e) => setReturnDialogOpen(false)}
                        >
                          <DialogTitle>
                            Return {/* {employee?.emp_name}'s */}Laptop
                          </DialogTitle>
                          <DialogContent>
                            <form
                              method="POST"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "10px",
                              }}
                              onSubmit={formik.handleSubmit}
                            >
                              <FormControl>
                                <TextField
                                  id="returnRemarks"
                                  label="Return Remarks"
                                  multiline
                                  rows={4}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.returnRemarks}
                                  error={Boolean(
                                    formik.touched.returnRemarks &&
                                      formik.errors.returnRemarks
                                  )}
                                  helperText={
                                    formik.touched.returnRemarks &&
                                    formik.errors.returnRemarks
                                      ? String(formik.errors.returnRemarks)
                                      : null
                                  }
                                />
                                <TextField
                                  id="returnDate"
                                  label="Return Date"
                                  type="date"
                                  margin="normal"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.returnDate}
                                  error={Boolean(
                                    formik.touched.returnDate &&
                                      formik.errors.returnDate
                                  )}
                                  helperText={
                                    formik.touched.returnDate &&
                                    formik.errors.returnDate
                                      ? String(formik.errors.returnDate)
                                      : null
                                  }
                                />
                              </FormControl>
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <GhostButton onClick={handleReturnDialogClose}>
                              Cancel
                            </GhostButton>
                            <GhostButton
                              type="button"
                              onClick={() =>
                                handleReturnDialogSubmit(laptop.id)
                              }
                            >
                              Return
                            </GhostButton>
                          </DialogActions>
                        </Dialog>
                        <SecondaryButton
                          size="small"
                          onClick={(e) => {
                            setReturnDialogOpen(true);
                            setIsLaptopReplacement(true);
                          }}
                        >
                          Replace
                        </SecondaryButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell colSpan={4} align="center">
                    No Laptops Assigned
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={returnSuccess}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={() => handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Laptop Returned Successfully
          </Alert>
        </Snackbar>
      </>
    );
  }
}
