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
import Box from '@mui/material/Box';

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell,
    StyledButton,
    StyledLink
} from '../lib/theme';
import { useGetEmployeesQuery } from '../features/employees/employeesApiSlice';

import { Link } from "react-router-dom";

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
                            onChange={(e) => setEmployeeSearch(e.target.value)}
                        />
                    </Search>
                    <Link
                        to={`create`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            marginLeft: 'auto'
                        }}
                    >
                        <StyledButton>
                            Create
                        </StyledButton>
                    </Link>
                    <StyledButton>...</StyledButton>
                </Box>
            </AppBar>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Employee Name</StyledTableCell>
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
                                <TableCell component="th" scope="row" align="center">
                                    <StyledLink to={`/employee/${employee.emp_id}`}>{employee.emp_name}</StyledLink>
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