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
    useGetBuildingsQuery,
    useCreateBuildingMutation,
} from "../../../common/buildingApiSlice"
import {
    useGetBranchesQuery,
} from "../../../employee/branchApiSlice"

export default function BuildingAdminRoute() {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { data: buildings } = useGetBuildingsQuery();
    const { data: branches } = useGetBranchesQuery();
    const [ createBuilding ] = useCreateBuildingMutation();
    const formik = useFormik({
        initialValues: {
            branch: "",
            building: "",
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
            location: formik.values.branch,
            building: formik.values.building
        }
        createBuilding(payload)
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
                    Buildings
                </PageTitle>
                <PrimaryButton
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setFormOpen(true)}
                >
                    Add New
                </PrimaryButton>
            </Stack>
            <Table columns={[ "Sl No", "Location", "Building" ]}>
                {buildings?.results.map((building) => (
                    <TableRow
                        key={building.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {building.id}
                        </TableCell>
                        <TableCell component="th" align="center">
                            {building.location?.location}
                        </TableCell>
                        <TableCell component="th" align="center">
                            {building.building}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Dialog open={formOpen} onClose={(e) => setFormOpen(false)}>
                <DialogTitle>Add New Building</DialogTitle>
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
                            <InputLabel id="department-label">Branch</InputLabel>
                            <Select
                                defaultValue=""
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
                                    ? branches.results.map((branch) => {
                                        return (
                                            <MenuItem
                                                key={branch.location_id}
                                                value={branch.location_id}
                                            >
                                                {branch.location}
                                            </MenuItem>
                                        )
                                    })
                                    : null}
                            </Select>
                            <Divider sx={{ paddingTop: 2 }} />
                            <TextField
                                required
                                id="building"
                                label="building Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.building}
                                error={Boolean(formik.touched.building && formik.errors.building)}
                                helperText={
                                    formik.touched.building && formik.errors.building
                                        ? String(formik.errors.building)
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
                    Building Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}