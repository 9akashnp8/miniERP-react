import {
    useState,
    useCallback
} from 'react';

import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from 'react-router-dom';

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell,
} from '../../../lib/theme';
import MenuButton from '../../common/components/Menu';
import SecondaryButton from '../../common/components/Button/SecondaryButton';
import PrimaryButton from '../../common/components/Button/PrimaryButton';
import { useGetEmployeesQuery } from '../employeesApiSlice';
import { Employee } from '../../../types/employee';
import { useTheme } from '@mui/material/styles';

import Link from '../../common/components/Link';

export default function EmployeeTable() {
    const theme = useTheme()
    const navigate = useNavigate();
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
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
            console.log(newPage)
            setPage(newPage + 1);
        }, []
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
                        gap: '0.5rem',
                        backgroundColor: theme.palette.background.paper
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
                        <PrimaryButton>
                            Create
                        </PrimaryButton>
                    </Link>
                    <SecondaryButton>...</SecondaryButton>
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
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.results.map((employee: Employee) => (
                            <TableRow
                                key={employee.emp_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <Link to={`/employee/${employee.emp_id}`}>{employee.emp_name}</Link>
                                </TableCell>
                                <TableCell align="center">{employee.dept_id?.dept_name}</TableCell>
                                <TableCell align="center">{employee.desig_id?.designation}</TableCell>
                                <TableCell align="center">{employee.loc_id?.location}</TableCell>
                                <TableCell align="center">
                                    <MenuButton>
                                        <MenuItem
                                            onClick={() => navigate(`/employee/${employee.emp_id}/assign`)}
                                        >
                                            Assign Laptop
                                        </MenuItem>
                                        <MenuItem>Return Laptop</MenuItem>
                                    </MenuButton>
                                </TableCell>
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