import * as React from 'react';
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
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

import * as Yup from 'yup';
import { useFormik } from "formik";

import { useState, forwardRef } from "react";

import { getCurrentDate } from "../../../lib/utils";
import { FORM_DB_FIELD_MAPPING } from "../../../lib/constants";
import { useGetDesignationsQuery } from "../designationApiSlice";
import { useGetDepartmentsQuery } from "../departmentApiSlice";
import { useGetBranchesQuery } from "../branchApiSlice";
import { useCreateNewEmployeeMutation } from "../employeesApiSlice";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import { FormFieldMapping } from '../../../types/common';
import { Department, Designation, Location } from '../../../types/employee';
import { Alert } from '../../common/components/Alert';
import PrimaryButton from '../../common/components/Button/PrimaryButton';

export default function EmployeeCreate() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            employeeId: '',
            department: '',
            designation: '',
            employeeName: '',
            emailId: '',
            mobileNumber: '',
            employeeStatus: 'Active',
            branch: '',
            dateJoined: getCurrentDate(new Date()),
            dateExited: null,
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
            createNewEmployee(payload)
                .unwrap()
                .then((res) => {
                    setOpen(true)
                    resetForm();
                })
                .catch((error) => {
                    Object.entries(error.data).forEach(([field, message]: [string, any]) => { // TODO: Change this
                        formik.setFieldError(FORM_DB_FIELD_MAPPING[field as keyof FormFieldMapping], message)
                    })
                })
                .finally(() => setLoading(false))
        }
    })
    const {
        data: designations
    } = useGetDesignationsQuery(formik.values.department);
    const {
        data: departments
    } = useGetDepartmentsQuery();
    const {
        data: branches
    } = useGetBranchesQuery();
    const [
        createNewEmployee, response
    ] = useCreateNewEmployeeMutation();

    function handleClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Box sx={{ maxWidth: "80%", margin: "auto", py: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Add Employee
            </Typography>
            <Divider />
            {loading ? <LinearProgress /> : null}
            <Box sx={{ pt: 3 }}>
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
                                error={Boolean(formik.touched.employeeId && formik.errors.employeeId)}
                                helperText={
                                    formik.touched.employeeId && formik.errors.employeeId
                                        ? String(formik.errors.employeeId)
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("department")}
                                    error={Boolean(formik.touched.department && formik.errors.department)}
                                >
                                    {departments
                                        ? departments.results.map((department: Department) => {
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
                                    value={formik.values.designation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("designation")}
                                    error={
                                        Boolean(formik.touched.designation && formik.errors.designation)
                                    }
                                >
                                    {designations
                                        ? designations.results.map((designation: Designation) => {
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
                                value={formik.values.employeeName}
                                error={
                                    Boolean(formik.touched.employeeName && formik.errors.employeeName)
                                }
                                helperText={
                                    formik.touched.employeeName && formik.errors.employeeName
                                        ? String(formik.errors.employeeName)
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
                                value={formik.values.emailId}
                                error={Boolean(formik.touched.emailId && formik.errors.emailId)}
                                helperText={
                                    formik.touched.emailId && formik.errors.emailId
                                        ? String(formik.errors.emailId)
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
                                value={formik.values.mobileNumber}
                                error={
                                    Boolean(formik.touched.mobileNumber && formik.errors.mobileNumber)
                                }
                                helperText={
                                    formik.touched.mobileNumber && formik.errors.mobileNumber
                                        ? String(formik.errors.mobileNumber)
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
                                    value={formik.values.employeeStatus}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("employeeStatus")}
                                    error={
                                        Boolean(formik.touched.employeeStatus && formik.errors.employeeStatus)
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
                                    value={formik.values.branch}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur("branch")}
                                    error={Boolean(formik.touched.branch && formik.errors.branch)}
                                >
                                    {branches
                                        ? branches.results.map((branch: Location) => {
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
                                        ? String(formik.errors.branch)
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
                                value={formik.values.dateJoined}
                                error={Boolean(formik.touched.dateJoined && formik.errors.dateJoined)}
                                helperText={
                                    formik.touched.dateJoined && formik.errors.dateJoined
                                        ? String(formik.errors.dateJoined)
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
                                value={formik.values.dateExited}
                                error={Boolean(formik.touched.dateExited && formik.errors.dateExited)}
                                helperText={
                                    formik.touched.dateExited && formik.errors.dateExited
                                        ? String(formik.errors.dateExited)
                                        : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PrimaryButton type="submit" variant="contained">
                                Submit
                            </PrimaryButton>
                        </Grid>
                    </Grid>
                </form>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Employee Added Successfully
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
