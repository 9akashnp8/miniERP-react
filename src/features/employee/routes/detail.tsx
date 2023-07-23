// Material UI Imports
import { Paper } from "@mui/material"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Snackbar from "@mui/material/Snackbar";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

// React imports
import { useState } from "react";

// 3rd party tools
import { useParams, Link } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from "formik";

// Custom Components
import {
    darkTheme,
    StyledButton,
    SecondaryButton,
    StyledTableCell,
    StyledLink
} from "../../../lib/theme";
import { getCurrentDate } from "../../../lib/utils";
import DetailItem from "../../common/components/DetailContent";
import Delete from "../../common/components/Delete";
import StatusInfo from "../components/StatusInfo";
import { Alert } from "../../common/components/Alert";
import { useGetEmployeeDetailQuery } from "../employeesApiSlice";
import { useReturnLaptopMutation } from "../../laptop/laptopsApiSlice";
import { Laptop } from "../../../types/laptop";
import { OnClickEvent } from "../../../types/common";


export default function EmployeeDetail() {
    let { id } = useParams();
    const {
        data: employee,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetEmployeeDetailQuery({ id: id });
    const [ returnLaptop ] = useReturnLaptopMutation()
    const formik = useFormik({
        initialValues: {
            returnRemarks: '',
            returnDate: getCurrentDate(new Date())
        },
        validationSchema: Yup.object({
            returnRemarks: Yup.string().required(),
            returnDate: Yup.date().required()
        }),
        onSubmit: (values) => 
            handleReturnDialogSubmit(values)
    })
    const [anchorEl, setAnchorEl] = useState<null | EventTarget & HTMLButtonElement>(null);
    const [ returnDialogOpen, setReturnDialogOpen ] = useState<boolean>(false);
    const [ returnSuccess, setReturnSuccess ] = useState<boolean>(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: OnClickEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSuccessSnackBarClose(
        event: Event | React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason
    ) {
        if (reason === 'clickaway') {
            return;
        }
        setReturnSuccess(false);
    }

    const handleReturnDialogClose = () => {
        formik.resetForm();
        setReturnDialogOpen(false);
    }

    const handleReturnDialogSubmit = (laptop_id: number) => {
        let payload = {...formik.values, employee_id: id, laptop_id,}
        returnLaptop(payload)
            .unwrap()
            .then((res) => {
                formik.resetForm();
                setReturnSuccess(true);
            })
            .finally(() => setReturnDialogOpen(false))
    }

    if (!isLoading) {
        return (
            <>
                <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"} useFlexGap>
                        <Typography variant="h4" component="h1">
                            {employee?.emp_name}
                        </Typography>
                        <StatusInfo isActive={employee?.emp_status == 'Active'} />
                    </Stack>
                    <Link
                        to={`edit`}
                        style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}
                    >
                        <StyledButton>
                            Edit
                        </StyledButton>
                    </Link>
                    <StyledButton onClick={handleClick}>...</StyledButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ marginTop: '10px'}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link
                                to={`history`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                History
                            </Link>
                        </MenuItem>
                        <Delete employeeId={id}/>
                    </Menu>
                </Stack>
                <Paper variant="outlined">
                    <Grid container spacing={2} padding={3}>
                        <DetailItem
                            textAlign={'left'}
                            title={'Employee Id'}
                            content={employee?.lk_emp_id}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Email'}
                            content={employee?.emp_email}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Branch'}
                            content={employee?.loc_id?.location}
                        />
                        <DetailItem
                            textAlign={'left'}
                            title={'Department'}
                            content={employee?.dept_id?.dept_name}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Designation'}
                            content={employee?.desig_id?.designation}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Date Joined'}
                            content={employee?.emp_date_joined}
                        />
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ padding: '1rem', marginTop: '30px' }}>
                    <Typography
                        color={darkTheme.palette.text.secondary}
                        mb={2}
                    >
                        Laptops Assigned
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Hardware ID</StyledTableCell>
                                    <StyledTableCell align="center">Laptop Sr No</StyledTableCell>
                                    <StyledTableCell align="center">Laptop Grade</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employee.laptops.length > 0
                                    ? employee.laptops.map((laptop: Laptop) => (
                                        <TableRow
                                            key={laptop.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                <StyledLink to={`/laptop/${laptop.id}`}>{laptop.hardware_id}</StyledLink>
                                            </TableCell>
                                            <TableCell align="center">{laptop.laptop_sr_no}</TableCell>
                                            <TableCell align="center">{laptop.processor}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                                                    <SecondaryButton onClick={(e) => setReturnDialogOpen(true)}>
                                                        Return
                                                    </SecondaryButton>
                                                    <Dialog open={returnDialogOpen} onClose={(e) => setReturnDialogOpen(false)}>
                                                        <DialogTitle>Return {employee?.emp_name}'s Laptop</DialogTitle>
                                                        <DialogContent >
                                                            <form
                                                                method="POST"
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    marginTop: '10px'
                                                                }}
                                                                onSubmit={formik.handleSubmit}
                                                            >
                                                                <FormControl>
                                                                    <TextField
                                                                        id="returnRemarks"
                                                                        label="Return Remarks"
                                                                        multiline
                                                                        rows={4}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.returnRemarks}
                                                                        error={Boolean(formik.touched.returnRemarks && formik.errors.returnRemarks)}
                                                                        helperText={
                                                                            formik.touched.returnRemarks && formik.errors.returnRemarks
                                                                                ? String(formik.errors.returnRemarks)
                                                                                : null
                                                                        }
                                                                    />
                                                                    <TextField
                                                                        id="returnDate"
                                                                        label="Return Date"
                                                                        type="date"
                                                                        margin="normal"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.returnDate}
                                                                        error={Boolean(formik.touched.returnDate && formik.errors.returnDate)}
                                                                        helperText={
                                                                            formik.touched.returnDate && formik.errors.returnDate
                                                                                ? String(formik.errors.returnDate)
                                                                                : null
                                                                        }
                                                                    />
                                                                </FormControl>
                                                            </form>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button onClick={handleReturnDialogClose}>Cancel</Button>
                                                            <Button
                                                                type="button"
                                                                onClick={() => handleReturnDialogSubmit(laptop.id)}
                                                            >
                                                                Return
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                    <SecondaryButton>
                                                        Replace
                                                    </SecondaryButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    : (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell colSpan={4} align="center">
                                                <StyledLink to={'#'} >No Laptops Assigned</StyledLink>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Snackbar open={returnSuccess} autoHideDuration={4000} onClose={handleSuccessSnackBarClose}>
                        <Alert
                            onClose={() => handleSuccessSnackBarClose}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            Laptop Returned Successfully
                        </Alert>
                    </Snackbar>
                </Paper>
            </>
        )
    }
}