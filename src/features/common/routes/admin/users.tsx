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
    useGetUsersQuery,
    useCreateUserMutation,
} from "../../../common/userApiSlice"

export default function UserAdminRoute() {
    const [open, setOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const { data: users } = useGetUsersQuery();
    const [ createUser ] = useCreateUserMutation();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
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
            first_name: formik.values.firstName,
            last_name: formik.values.lastName,
            email: formik.values.email,
            username: formik.values.userName,
            password: formik.values.password,
        };
        createUser(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setFormOpen(false);
                setOpen(true);
            })
            .catch((err) => {
                formik.setFieldError(
                    "userName",
                    err?.data?.dept_name[0]
                )
            })
    }

    return (
        <>
            <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                <Typography variant="h4" component="h1">
                    Users
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
                    "User Name",
                    "Email"
                ]}
            >
                {users?.results.map((user) => (
                    <TableRow
                        key={user.username}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" align="center">
                            {user.username}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                            {user.email}
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
                                id="firstName"
                                label="First Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                helperText={
                                    formik.touched.firstName && formik.errors.firstName
                                        ? String(formik.errors.firstName)
                                        : null
                                }
                            />
                            <TextField
                                required
                                id="lastName"
                                label="Last Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                helperText={
                                    formik.touched.lastName && formik.errors.lastName
                                        ? String(formik.errors.lastName)
                                        : null
                                }
                            />
                            <TextField
                                required
                                id="email"
                                label="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                error={Boolean(formik.touched.email && formik.errors.email)}
                                helperText={
                                    formik.touched.email && formik.errors.email
                                        ? String(formik.errors.email)
                                        : null
                                }
                            />
                            <TextField
                                required
                                id="userName"
                                label="User Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.userName}
                                error={Boolean(formik.touched.userName && formik.errors.userName)}
                                helperText={
                                    formik.touched.userName && formik.errors.userName
                                        ? String(formik.errors.userName)
                                        : null
                                }
                            />
                            <TextField
                                required
                                type="password"
                                id="password"
                                label="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                error={Boolean(formik.touched.password && formik.errors.password)}
                                helperText={
                                    formik.touched.password && formik.errors.password
                                        ? String(formik.errors.password)
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
                    User Added Successfully
                </Alert>
            </Snackbar>
        </>
    )
}