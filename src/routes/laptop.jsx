import { useState, useCallback } from 'react';

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
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell
} from '../lib/theme';
import { useGetLaptopsQuery } from '../features/laptops/laptopsApiSlice';

export default function LaptopTable() {
    const [page, setPage] = useState(1);
    const [laptopSearch, setLaptopSearch] = useState('');
    const {
        data: laptops,
        isLoading,
        isError,
        error
    } = useGetLaptopsQuery({ page: page, laptopSearch: laptopSearch });

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
                            onChange={(e) => setLaptopSearch(e.target.value)}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
            <TableContainer component={Paper} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Laptop HW ID</StyledTableCell>
                            <StyledTableCell align="center">Serial Number</StyledTableCell>
                            <StyledTableCell align="center">Processor</StyledTableCell>
                            <StyledTableCell align="center">RAM</StyledTableCell>
                            <StyledTableCell align="center">Location</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {laptops.results.map((laptop) => (
                            <TableRow
                                key={laptop.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {laptop.hardware_id}
                                </TableCell>
                                <TableCell align="center">{laptop.laptop_sr_no}</TableCell>
                                <TableCell align="center">{laptop.processor}</TableCell>
                                <TableCell align="center">{laptop.ram_capacity}</TableCell>
                                <TableCell align="center">{laptop.laptop_branch}</TableCell>
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
        </>
    );
}