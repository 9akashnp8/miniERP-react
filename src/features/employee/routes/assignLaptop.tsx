import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Snackbar from "@mui/material/Snackbar";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell,
} from '../../../lib/theme';
import { Alert } from '../../common/components/Alert';
import Link from '../../common/components/Link';
import SecondaryButton from '../../common/components/Button/SecondaryButton';

import {
    useGetLaptopsQuery,
    useAssignLaptopMutation
} from '../../laptop/laptopsApiSlice';
import { useGetAvailableHardwareQuery } from '../../api/hardware/hardwareApiSlice';
import { useAssignHardwareMutation } from '../../api/hardware/assignmentApiSlice';

import { Laptop } from '../../../types/laptop';

export default function AssignLaptop() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [searchParams] = useSearchParams()
    const [page, setPage] = React.useState(1);
    const [laptopSearch, setLaptopSearch] = React.useState('');
    const [asssignSuccess, setAssignSuccess] = React.useState(false);
    const {
        data: laptops,
        isLoading,
        isError,
        error
    } = useGetLaptopsQuery({
        page: page,
        laptopSearch: laptopSearch,
        filterQuery: 'emp_id__isnull=true&laptop_status=Working'
    });
    const { data: hardwares } = useGetAvailableHardwareQuery(searchParams.get('type') || '')
    const [ assignHardware ] = useAssignHardwareMutation()
    const [ assignLaptop ] = useAssignLaptopMutation()

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
        const payload = {
            employee: id,
            hardware: hardware_id,
            assignment_date: new Date().toISOString()
        }
        assignHardware(payload)
            .unwrap()
            .then((res) => {
                setAssignSuccess(true)
                setTimeout(() => {
                    navigate(`/employee/${id}`)
                }, 1000)
            })
            .finally(() => null)
    }

    if (!isLoading) {
        return (
            <>
                <Typography variant="h4" component="h1" mb={2} >
                    Assign Hardware
                </Typography>
                <AppBar position="static">
                    <Box
                        sx={{
                            display: 'flex',
                            padding: '0.75rem',
                            gap: '0.5rem'
                        }}
                    >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setLaptopSearch(e.target.value)}
                            />
                        </Search>
                    </Box>
                </AppBar>
                <TableContainer component={Paper} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
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
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/laptop/${hardware.uuid}`} >{hardware.hardware_id}</Link>
                                    </TableCell>
                                    <TableCell align="center">{hardware.serial_no}</TableCell>
                                    <TableCell align="center">{hardware.location.location}</TableCell>
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
                    count={laptops.count}
                    rowsPerPage={10}
                    page={page - 1}
                    onPageChange={handleChangePage}
                />
                <Snackbar open={asssignSuccess} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        onClose={() => handleClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        Hardware Assigned Successfully
                    </Alert>
                </Snackbar>
            </>
        )
    }
}