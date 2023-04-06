import {
    useState,
    useCallback
} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import { useGetEmployeesQuery } from '../features/employees/employeesApiSlice';

export default function EmployeeTable() {
    const [page, setPage] = useState(1);

    const { data: employees, isLoading, isFetching, isError, error } = useGetEmployeesQuery(page);

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell align="center">Department</TableCell>
                            <TableCell align="center">Designation</TableCell>
                            <TableCell align="center">Branch</TableCell>
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