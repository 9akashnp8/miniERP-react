// Material UI/Components
import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import Snackbar from "@mui/material/Snackbar"
import TableRow from "@mui/material/TableRow"
import TextField from "@mui/material/TextField"
import TableCell from "@mui/material/TableCell"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { SnackbarCloseReason } from "@mui/material"

// Custom UI Components
import Table from "../../components/Table"
import { Alert } from "../../components/Alert"
import GhostButton from "../../components/Button/GhostButton"
import PrimaryButton from "../../components/Button/PrimaryButton"

// 3rd Part Functions
import { useState } from "react";
import { useFormik } from "formik"

// Custom Functions
import {
    useGetDepartmentsQuery,
    useCreateDepartmentMutation,
} from "../../../employee/departmentApiSlice"

export default function DepartmentAdminRoute() {
    const [open, setOpen] = useState(false);
    const [departmentFormOpen, setDepartmentFormOpen] = useState(false);
    const { data: departments } = useGetDepartmentsQuery();
    const [ createDepartment ] = useCreateDepartmentMutation();
    const formik = useFormik({
        initialValues: {
            departmentName: ""
        },
        onSubmit: (value) => new Promise((res, rej) => res("success"))
    })

    function handleSnackBarClose(
        _: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
    ) {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    function handleDeptCreateDialogClose() {
        formik.resetForm();
        setDepartmentFormOpen(false);
    }

    function handleSubmit() {
        const payload = {
            dept_name: formik.values.departmentName
        }
        createDepartment(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setDepartmentFormOpen(false);
                setOpen(true);
            })
            .catch((err) => {
                formik.setFieldError(
                    "departmentName",
                    err?.data?.dept_name[0]
                )
            })
    }

    return (
        <>
            <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                <Typography variant="h4" component="h1">
                    Departments
                </Typography>
                <PrimaryButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setDepartmentFormOpen(true)}
                >
                    Add New
                </PrimaryButton>
            </Stack>
            <Table
                columns={[
                    "Sl No",
                    "Departments",
                ]}
            >
                {departments?.results.map((department) => (
                    <TableRow
                        key={department.department_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {department.department_id}
                        </TableCell>
                        <TableCell component="th" align="center">
                            {department.dept_name}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Dialog open={departmentFormOpen} onClose={(e) => setDepartmentFormOpen(false)}>
                <DialogTitle>Add New Department</DialogTitle>
                <DialogContent >
                    <form
                        method="POST"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '10px'
                        }}
                    >
                        <FormControl>
                            <TextField
                                required
                                id="departmentName"
                                label="Department Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.departmentName}
                                error={Boolean(formik.touched.departmentName && formik.errors.departmentName)}
                                helperText={
                                    formik.touched.departmentName && formik.errors.departmentName
                                        ? String(formik.errors.departmentName)
                                        : null
                                }
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <GhostButton onClick={handleDeptCreateDialogClose}>Cancel</GhostButton>
                    <GhostButton
                        type="button"
                        onClick={() => handleSubmit()}
                    >
                        Add
                    </GhostButton>
                </DialogActions>
            </Dialog>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={() => handleSnackBarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Department Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}