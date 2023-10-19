import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField"
import { SnackbarCloseReason } from "@mui/material/Snackbar";

import Grid from "../../components/Grid";
import { Alert } from "../../components/Alert";
import PageTitle from "../../components/PageTitle"
import PrimaryButton from "../../components/Button/PrimaryButton";

import { useFormik } from "formik";
import { useState } from "react";

import {
    useGetHardwareAppSettingsQuery,
    useUpdateHardwareSettingsMutation,
} from "../../appSettingsApiSlice";

export default function EmployeeSettingsAdminRoute() {
    const [ open, setOpen ] = useState(false);
    const { data } = useGetHardwareAppSettingsQuery()
    const [ updateHardwareAppSettings ] = useUpdateHardwareSettingsMutation();
    const formik = useFormik({
        initialValues: {
            hardwareIdPrefix: data?.hardware_id_prefix,
            defaultProcessor: data?.default_processor,
            defaultRAM: data?.default_ram,
            defaultStorage: data?.default_storage,
            screenSizes: data?.screen_sizes[0],
            rentalVendors: data?.rental_vendors,
            organizationName: data?.organization_name

        },
        onSubmit: (values) => {
            const payload = {
                hardware_id_prefix: values.hardwareIdPrefix,
                default_processor: values.defaultProcessor,
                default_ram: values.defaultRAM,
                default_storage: values.defaultStorage,
                screen_sizes: [values.screenSizes],
                rental_vendors: [values.rentalVendors],
                organization_name: values.organizationName,
            };
            updateHardwareAppSettings(payload)
                .unwrap()
                .then(res => {
                    console.log(res)
                    setOpen(true);
                })
                .catch(err => {
                    console.error(err)
                })
        }
    });

    function handleClose(
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
    ) {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Box sx={{ maxWidth: "80%", margin: "auto", py: 3 }}>
            <PageTitle>
                Hardware App Settings
            </PageTitle>
            <Divider />
            <Box sx={{ pt: 3 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', gap: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Hardware ID Prefix"
                                name="hardwareIdPrefix"
                                value={formik.values.hardwareIdPrefix}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Default Laptop Processor"
                                name="defaultProcessor"
                                value={formik.values.defaultProcessor}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Default RAM"
                                name="defaultRAM"
                                value={formik.values.defaultRAM}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Default Storage"
                                name="defaultStorage"
                                value={formik.values.defaultStorage}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Available Laptop Screensizes"
                                name="screenSizes"
                                value={formik.values.screenSizes}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Rental Vendors"
                                name="rentalVendors"
                                value={formik.values.rentalVendors}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Organization Name"
                                name="organizationName"
                                value={formik.values.organizationName}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PrimaryButton type="submit">
                                Save
                            </PrimaryButton>
                        </Grid>
                        
                    </Grid>
                    
                </form>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Hardware Settings Saved
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}