import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField"
import { SnackbarCloseReason } from "@mui/material/Snackbar";

import { Alert } from "../../components/Alert";
import PageTitle from "../../components/PageTitle"
import PrimaryButton from "../../components/Button/PrimaryButton";

import { useFormik } from "formik";
import { useState } from "react";

import {
    useGetEmployeeAppSettingsQuery,
    useUpdateEmployeeSettingsMutation,
} from "../../appSettingsApiSlice";


export default function EmployeeSettingsAdminRoute() {
    const [ open, setOpen ] = useState(false);
    const { data } = useGetEmployeeAppSettingsQuery()
    const [ updateEmployeeAppSettings ] = useUpdateEmployeeSettingsMutation();
    const formik = useFormik({
        initialValues: {
            empIdPrefix: data?.emp_id_prefix
        },
        onSubmit: (values) => {
            const payload = {
                emp_id_prefix: values.empIdPrefix
            };
            updateEmployeeAppSettings(payload)
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
                Employee App Settings
            </PageTitle>
            <Divider />
            <Box sx={{ pt: 3 }}>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', gap: 10 }}>
                    <TextField
                        label="Emp ID Prefix"
                        name="empIdPrefix"
                        value={formik.values.empIdPrefix}
                        onChange={formik.handleChange}
                    />
                    <PrimaryButton type="submit">
                        Save
                    </PrimaryButton>
                </form>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Employee Settings Saved
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    )
}