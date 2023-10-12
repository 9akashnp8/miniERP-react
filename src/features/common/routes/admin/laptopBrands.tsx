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
    useGetBrandsQuery,
    useCreateLaptopBrandMutation,
} from "../../../laptop/laptopBrandApiSlice"

export default function BrandAdminRoute() {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { data: brands } = useGetBrandsQuery();
    const [ createBrand ] = useCreateLaptopBrandMutation();
    const formik = useFormik({
        initialValues: {
            brandName: ""
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
            brand_name: formik.values.brandName
        };
        createBrand(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setFormOpen(false);
                setOpen(true);
            })
            .catch((err) => {
                formik.setFieldError(
                    "brandName",
                    err?.data?.dept_name[0]
                )
            })
    }

    return (
        <>
            <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                <Typography variant="h4" component="h1">
                    Laptop Brands
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
                    "Brands",
                ]}
            >
                {brands?.results.map((brand) => (
                    <TableRow
                        key={brand.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {brand.id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {brand.brand_name}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Dialog open={formOpen} onClose={(e) => setFormOpen(false)}>
                <DialogTitle>Add New Laptop Brand</DialogTitle>
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
                                id="brandName"
                                label="Brand Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.brandName}
                                error={Boolean(formik.touched.brandName && formik.errors.brandName)}
                                helperText={
                                    formik.touched.brandName && formik.errors.brandName
                                        ? String(formik.errors.brandName)
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
                    Brand Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}