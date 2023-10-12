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

export default function BranchAdminRoute() {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { data: branches } = useGetBranchesQuery();
    const [ createBranch ] = useCreateBranchMutation();
    const formik = useFormik({
        initialValues: {
            branchName: ""
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

    return (
        <>
            <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                <Typography variant="h4" component="h1">
                    Branches
                </Typography>
                <PrimaryButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setFormOpen(true)}
                >
                    Add New
                </PrimaryButton>
            </Stack>
            <Table
                columns={[
                    "Sl No",
                    "Branches",
                ]}
            >
                {branches?.results.map((branch) => (
                    <TableRow
                        key={branch.location_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {branch.location_id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {branch.location}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Dialog open={formOpen} onClose={(e) => setFormOpen(false)}>
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
                                label="Branc Name"
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
            </Dialog>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackBarClose}>
                <Alert
                    onClose={() => handleSnackBarClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Branch Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}