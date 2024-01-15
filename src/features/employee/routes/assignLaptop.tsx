import * as React from 'react';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from "@mui/material/Snackbar";
import { SnackbarCloseReason } from "@mui/material/Snackbar";
import type { AlertColor } from '@mui/material';

import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import {
    StyledTableCell,
} from '../../../lib/theme';
import { Alert } from '../../common/components/Alert';
import Link from '../../common/components/Link';
import SecondaryButton from '../../common/components/Button/SecondaryButton';

import { useGetAvailableHardwareQuery } from '../../api/hardware/hardwareApiSlice';
import { useAssignHardwareMutation } from '../../api/hardware/assignmentApiSlice';


export default function AssignLaptop() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams()
    const [page, setPage] = React.useState(1);
    const [ alertMessage, setAlertMessage ] = React.useState<string>("")
    const [ alertType, setAlertType ] = React.useState<AlertColor>("success")
    const [asssignSuccess, setAssignSuccess] = React.useState(false);
    const { data: hardwares, isLoading } = useGetAvailableHardwareQuery(searchParams.get('type') || '')
    const [ assignHardware ] = useAssignHardwareMutation()

    function handleClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason) {
        if (reason === 'clickaway') {
            return;
        }
        setAssignSuccess(false);
    }

    const handleChangePage = React.useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
            console.log(newPage)
            setPage(newPage + 1);
        }, []
    );

    function handleAssignHardware(hardware_id: string) {
        const currDate = new Date()
        const payload = {
            employee: id,
            hardware: hardware_id,
            assignment_date: `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`
        }
        assignHardware(payload)
            .unwrap()
            .then((res) => {
                setAlertType("success")
                setAlertMessage("Hardware Assigned Successfully")
                setAssignSuccess(true)
                setTimeout(() => {
                    navigate(`/employee/${id}`)
                }, 1000)
            })
            .catch(err => {
                const errMessage = err?.data && err?.data[0]
                setAlertType("error")
                setAlertMessage(errMessage)
                setAssignSuccess(true)
                
            })
            .finally(() => null)
    }

    if (!isLoading) {
        return (
            <>
                <Typography variant="h4" component="h1" mb={2} >
                    Assign Hardware
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Hardware Type</StyledTableCell>
                                <StyledTableCell align="center">Hardware ID</StyledTableCell>
                                <StyledTableCell align="center">Serial Number</StyledTableCell>
                                <StyledTableCell align="center">Location</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hardwares?.results.map((hardware) => (
                                <TableRow
                                    key={hardware.uuid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{hardware.type?.name}</TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/laptop/${hardware.uuid}`} >{hardware.hardware_id}</Link>
                                    </TableCell>
                                    <TableCell align="center">{hardware.serial_no}</TableCell>
                                    <TableCell align="center">{hardware.location?.location}</TableCell>
                                    <TableCell align="center" >
                                        <SecondaryButton
                                            size='small'
                                            onClick={() => handleAssignHardware(hardware.uuid)}
                                        >
                                            Assign
                                        </SecondaryButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={hardwares?.count ?? 0}
                    rowsPerPage={10}
                    page={page - 1}
                    onPageChange={handleChangePage}
                />
                <Snackbar open={asssignSuccess} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity={alertType}
                        sx={{ width: "100%" }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}