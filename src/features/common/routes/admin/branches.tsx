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
    useGetBranchesQuery,
    useCreateBranchMutation,
} from "../../../employee/branchApiSlice"

import { withFetchData } from "../../components/TableHoC"

type BranchCreateFormProps = {
    setOpen: (value: boolean) => void,
    setFormOpen: (value: boolean) => void
}

function BranchCreateForm({setOpen, setFormOpen}: BranchCreateFormProps) {
    const [ createBranch ] = useCreateBranchMutation();
    const formik = useFormik({
        initialValues: {
            branchName: ""
        },
        onSubmit: (value) => new Promise((res, rej) => res("success"))
    })

    function handleSubmit() {
        const payload = {
            location: formik.values.branchName
        };
        createBranch(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setFormOpen(false);
                setOpen(true);
            })
            .catch((err) => {
                formik.setFieldError(
                    "branchName",
                    err?.data?.dept_name[0]
                )
            })
    }

    function handleDeptCreateDialogClose() {
        formik.resetForm();
        setFormOpen(false);
    }

    return (
        <>
            <DialogTitle>Add New Branch</DialogTitle>
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
                            id="branchName"
                            label="Branch Name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.branchName}
                            error={Boolean(formik.touched.branchName && formik.errors.branchName)}
                            helperText={
                                formik.touched.branchName && formik.errors.branchName
                                    ? String(formik.errors.branchName)
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
        </>
    )
}

type BranchTableRowsProps = {
    data?: any
}

function BranchTableRows({ data}: BranchTableRowsProps) {
    return (
        <>
            {data.map((branch: any) => (
                <TableRow
                    key={branch.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row" align="center">
                        {branch.userId}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                        {branch.title}
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default function BranchAdminRoute() {
    const BrandAdmin = withFetchData(BranchTableRows, BranchCreateForm, useGetBranchesQuery)
    return (
        <BrandAdmin
            pageTitle='Branches'
            columns={['Sr No', 'Branch']}
            successAlertMessage='Branch Added Successfully'
        />
    )
}
