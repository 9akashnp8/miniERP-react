import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useParams } from "react-router-dom";

import {
    StyledTableCell,
} from '../../lib/theme';
import { useGetEmployeeHistoryQuery } from '../../features/employees/employeesApiSlice';

export default function EmployeeHistory() {
    const { id } = useParams();

    const {
        data: employeeHistory,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetEmployeeHistoryQuery({ id: id });

    return (
        <>
            <Typography variant="h4" component="h1" pb={2} >
                {employeeHistory.employee}'s Edit History
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Edit Date</StyledTableCell>
                            <StyledTableCell align="center">Changed Field</StyledTableCell>
                            <StyledTableCell align="center">Old Value</StyledTableCell>
                            <StyledTableCell align="center">New Value</StyledTableCell>
                            <StyledTableCell align="center">User</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeHistory.history.map((history) => (
                            <TableRow
                                key={history.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{new Date(history.history_date).toDateString()}</TableCell>
                                <TableCell align="center">{history.field}</TableCell>
                                <TableCell align="center">{history.old_value}</TableCell>
                                <TableCell align="center">{history.new_value}</TableCell>
                                <TableCell align="center">{history.history_user}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}