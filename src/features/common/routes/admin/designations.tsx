// Material UI/Components
import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import Select from "@mui/material/Select"
import Snackbar from "@mui/material/Snackbar"
import TableRow from "@mui/material/TableRow"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import TableCell from "@mui/material/TableCell"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { Divider, SnackbarCloseReason } from "@mui/material"

// Custom UI Components
import Table from "../../components/Table"
import { Alert } from "../../components/Alert"
import PageTitle from "../../components/PageTitle"
import GhostButton from "../../components/Button/GhostButton"
import PrimaryButton from "../../components/Button/PrimaryButton"

// 3rd Part Functions
import { useState } from "react";
import { useFormik } from "formik"

// Custom Functions
import {
    useGetDesignationsQuery,
    useCreateDesignationMutation,
} from "../../../employee/designationApiSlice"
import {
    useGetDepartmentsQuery,
} from "../../../employee/departmentApiSlice"

export default function DesignationAdminRoute() {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { data: departments } = useGetDepartmentsQuery();
    const { data: designations } = useGetDesignationsQuery("");
    const [ createDesignation ] = useCreateDesignationMutation();
    const formik = useFormik({
        initialValues: {
            department: "",
            designation: "",
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
        setFormOpen(false);
    }

    function handleSubmit() {
        const payload = {
            dept_id: formik.values.department,
            designation: formik.values.designation
        }
        createDesignation(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setFormOpen(false);
                setOpen(true);
            })
            .catch((err) => {
                formik.setFieldError(
                    "designation",
                    err?.data?.designation[0]
                )
            })
    }

    return (
        <>
            <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                <PageTitle>
                    Desginations
                </PageTitle>
                <PrimaryButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setFormOpen(true)}
                >
                    Add New
                </PrimaryButton>
            </Stack>
            <Table columns={[ "Sl No", "Department", "Designations" ]}>
                {designations?.results.map((designation) => (
                    <TableRow
                        key={designation.designation_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {designation.designation_id}
                        </TableCell>
                        <TableCell component="th" align="center">
                            {designation.dept_id.dept_name}
                        </TableCell>
                        <TableCell component="th" align="center">
                            {designation.designation}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Dialog open={formOpen} onClose={(e) => setFormOpen(false)}>
                <DialogTitle>Add New Designation</DialogTitle>
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
                            <InputLabel id="department-label">Department</InputLabel>
                            <Select
                                defaultValue=""
                                id="department"
                                name="department"
                                label="Department"
                                labelId="department-label"
                                value={formik.values.department}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur("department")}
                                error={Boolean(formik.touched.department && formik.errors.department)}
                            >
                                {departments
                                    ? departments.results.map((department) => {
                                        return (
                                            <MenuItem
                                                key={department.department_id}
                                                value={department.department_id}
                                            >
                                                {department.dept_name}
                                            </MenuItem>
                                        )
                                    })
                                    : null}
                            </Select>
                            <Divider sx={{ paddingTop: 2 }} />
                            <TextField
                                required
                                id="designation"
                                label="Designation Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.designation}
                                error={Boolean(formik.touched.designation && formik.errors.designation)}
                                helperText={
                                    formik.touched.designation && formik.errors.designation
                                        ? String(formik.errors.designation)
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
                    Designation Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}