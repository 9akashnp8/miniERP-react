import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import * as Yup from 'yup';
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

import { useState, forwardRef } from "react";

import { getCurrentDate } from "../../lib/utils";
import { FORM_DB_FIELD_MAPPING } from "../../lib/constants";
import { useGetDesignationsQuery } from "../../features/employees/designationApiSlice";
import { useGetDepartmentsQuery } from "../../features/employees/departmentApiSlice";
import { useGetBranchesQuery } from "../../features/employees/branchApiSlice";
import { useUpdateEmployeeMutation, useGetEmployeeDetailQuery } from "../../features/employees/employeesApiSlice";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EmployeeEdit() {
    let { id } = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { 
        data: employee,
        isLoading
    } = useGetEmployeeDetailQuery({ id: id });
    const formik = useFormik({
        initialValues: {
            employeeId: employee?.lk_emp_id,
            department: employee?.dept_id?.department_id,
            designation: employee?.desig_id?.designation_id,
            employeeName: employee?.emp_name,
            emailId: employee?.emp_email,
            mobileNumber: employee?.emp_phone,
            employeeStatus: employee?.emp_status,
            branch: employee?.loc_id?.location_id,
            dateJoined: employee?.emp_date_joined,
            dateExited: employee?.emp_date_exited,
        },
        validationSchema: Yup.object({
            employeeId: Yup.string().required('Required'),
            department: Yup.string().required('Required'),
            designation: Yup.string().required('Required'),
            employeeName: Yup.string().required('Required'),
            emailId: Yup.string().email().required('Required'),
            dateJoined: Yup.string().required('Required'),
            employeeStatus: Yup.string().required('Required'),
            branch: Yup.string().required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            setLoading(true)
            var payload = {
                dept_id: values.department,
                desig_id: values.designation,
                loc_id: values.branch,
                lk_emp_id: values.employeeId,
                emp_name: values.employeeName,
                emp_email: values.emailId,
                emp_phone: values.mobileNumber,
                emp_status: values.employeeStatus,
                emp_date_joined: values.dateJoined,
                emp_date_exited: values.dateExited ? values.dateExited : null,
            }
            updateEmployee(payload)
                .unwrap()
                .then((res) => {
                    setOpen(true)
                    resetForm();
                })
                .catch((error) => {
                    Object.entries(error.data).forEach(([field, message]) => {
                        formik.setFieldError(FORM_DB_FIELD_MAPPING[field], message)
                    })
                })
                .finally(() => setLoading(false))
        }
    })
    const {
        data: designations
    } = useGetDesignationsQuery({ deptId: formik.values.department });
    const {
        data: departments
    } = useGetDepartmentsQuery();
    const {
        data: branches
    } = useGetBranchesQuery();
    const [
        updateEmployee, response
    ] = useUpdateEmployeeMutation();

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    if (!isLoading) {
        return (
            <Box sx={{ maxWidth: "80%", margin: "auto", py: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Employee
                </Typography>
                <Divider />
                {loading ? <LinearProgress /> : null}
                <Paper sx={{ pt: 3 }} variant="">
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="employeeId"
                                    name="employeeId"
                                    label="Employee ID"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.employeeId}
                                    error={formik.touched.employeeId && formik.errors.employeeId}
                                    helperText={
                                        formik.touched.employeeId && formik.errors.employeeId
                                            ? formik.errors.employeeId
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ minWidth: 250 }} fullWidth>
                                    <InputLabel id="department-label">Department</InputLabel>
                                    <Select
                                        defaultValue=""
                                        id="department"
                                        name="department"
                                        label="Department"
                                        labelId="department-label"
                                        value={formik.values.department}
                                        onChange={formik.handleChange("department")}
                                        onBlur={formik.handleBlur("department")}
                                        error={formik.touched.department && formik.errors.department}
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
                                    <FormHelperText error>
                                        {formik.touched.department && formik.errors.department
                                            ? formik.errors.department
                                            : null}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ minWidth: 250 }} fullWidth>
                                    <InputLabel id="designation-label">Designation</InputLabel>
                                    <Select
                                        defaultValue=""
                                        id="designation"
                                        name="designation"
                                        label="Designation"
                                        labelId="designation-label"
                                        value={formik.values.designation || employee.dept_id?.department_id}
                                        onChange={formik.handleChange("designation")}
                                        onBlur={formik.handleBlur("designation")}
                                        error={
                                            formik.touched.designation && formik.errors.designation
                                        }
                                    >
                                        {designations
                                            ? designations.results.map((designation) => {
                                                return (
                                                    <MenuItem
                                                        key={designation.designation_id}
                                                        value={designation.designation_id}
                                                    >
                                                        {designation.designation}
                                                    </MenuItem>
                                                );
                                            })
                                            : null}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.designation && formik.errors.designation
                                            ? formik.errors.designation
                                            : null}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="employeeName"
                                    name="employeeName"
                                    label="Employee Name"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.employeeName || employee.emp_name}
                                    error={
                                        formik.touched.employeeName && formik.errors.employeeName
                                    }
                                    helperText={
                                        formik.touched.employeeName && formik.errors.employeeName
                                            ? formik.errors.employeeName
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="emailId"
                                    name="emailId"
                                    label="Email ID"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.emailId || employee.emp_email}
                                    error={formik.touched.emailId && formik.errors.emailId}
                                    helperText={
                                        formik.touched.emailId && formik.errors.emailId
                                            ? formik.errors.emailId
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    label="Mobile Number"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mobileNumber || employee.emp_phone}
                                    error={
                                        formik.touched.mobileNumber && formik.errors.mobileNumber
                                    }
                                    helperText={
                                        formik.touched.mobileNumber && formik.errors.mobileNumber
                                            ? formik.errors.mobileNumber
                                            : null
                                    }
                                />
                                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                                    <p>Required</p>
                                ) : null}
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ minWidth: 250 }} fullWidth>
                                    <InputLabel id="status-label">Employee Status</InputLabel>
                                    <Select
                                        id="employeeStatus"
                                        name="employeeStatus"
                                        label="Employee Status"
                                        labelId="status-label"
                                        value={formik.values.employeeStatus || employee.emp_status}
                                        onChange={formik.handleChange("employeeStatus")}
                                        onBlur={formik.handleBlur("employeeStatus")}
                                        error={
                                            formik.touched.employeeStatus &&
                                            formik.errors.employeeStatus
                                        }
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="InActive">InActive</MenuItem>
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.employeeStatus && formik.errors.employeeStatus
                                            ? formik.errors.employeeStatus
                                            : null}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ minWidth: 250 }} fullWidth>
                                    <InputLabel id="branch-label">Branch</InputLabel>
                                    <Select
                                        id="branch"
                                        name="branch"
                                        label="Branch"
                                        labelId="branch-label"
                                        value={formik.values.branch || employee.loc_id?.location_id}
                                        onChange={formik.handleChange("branch")}
                                        onBlur={formik.handleBlur("branch")}
                                        error={formik.touched.branch && formik.errors.branch}
                                    >
                                        {branches
                                            ? branches.results.map((branch) => {
                                                return (
                                                    <MenuItem
                                                        key={branch.location_id}
                                                        value={branch.location_id}
                                                    >
                                                        {branch.location}
                                                    </MenuItem>
                                                );
                                            })
                                            : null}
                                    </Select>
                                    <FormHelperText error>
                                        {formik.touched.branch && formik.errors.branch
                                            ? formik.errors.branch
                                            : null}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    id="dateJoined"
                                    name="dateJoined"
                                    label="Date Joined"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateJoined || employee.emp_date_joined}
                                    error={formik.touched.dateJoined && formik.errors.dateJoined}
                                    helperText={
                                        formik.touched.dateJoined && formik.errors.dateJoined
                                            ? formik.errors.dateJoined
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type="date"
                                    id="dateExited"
                                    name="dateExited"
                                    label="Date Exited"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.dateExited || employee.emp_date_exited}
                                    error={formik.touched.dateExited && formik.errors.dateExited}
                                    helperText={
                                        formik.touched.dateExited && formik.errors.dateExited
                                            ? formik.errors.dateExited
                                            : null
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Employee Added Successfully
                        </Alert>
                    </Snackbar>
                </Paper>
            </Box>
        );
    }
}
