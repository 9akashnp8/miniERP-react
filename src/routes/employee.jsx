import {
    useState,
    useCallback
} from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { StyledTableCell } from '../lib/theme';
import { useGetEmployeesQuery } from '../features/employees/employeesApiSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function EmployeeTable() {
    const [page, setPage] = useState(1);
    const [employeeSearch, setEmployeeSearch] = useState('');

    const {
        data: employees,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetEmployeesQuery({page: page, employeeSearch: employeeSearch});

    const handleChangePage = useCallback(
        (event, newPage) => {
            console.log(newPage)
            setPage(newPage + 1);
        }
    );

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>{JSON.stringify(error)}</p>
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => setEmployeeSearch(e.target.value)}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Employee Name</StyledTableCell>
                            <StyledTableCell align="center">Department</StyledTableCell>
                            <StyledTableCell align="center">Designation</StyledTableCell>
                            <StyledTableCell align="center">Branch</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.results.map((employee) => (
                            <TableRow
                                key={employee.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {employee.emp_name}
                                </TableCell>
                                <TableCell align="center">{employee.dept_id.dept_name}</TableCell>
                                <TableCell align="center">{employee.desig_id.designation}</TableCell>
                                <TableCell align="center">{employee.loc_id.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={employees.count}
                rowsPerPage={10}
                page={page - 1}
                onPageChange={handleChangePage}
            />
        </>
    );
}