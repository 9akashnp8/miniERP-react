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
import Box from '@mui/material/Box';

import {
    Search,
    SearchIconWrapper,
    StyledInputBase,
    StyledTableCell,
    StyledButton,
    StyledLink
} from '../../lib/theme';
import { useGetLaptopsQuery } from '../../features/laptops/laptopsApiSlice';
import { OnClickEvent } from '../../types/common';
import { Laptop } from '../../types/laptop';

import { Link } from "react-router-dom";

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
            <TableContainer component={Paper} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Laptop HW ID</StyledTableCell>
                            <StyledTableCell align="center">Serial Number</StyledTableCell>
                            <StyledTableCell align="center">Processor</StyledTableCell>
                            <StyledTableCell align="center">RAM</StyledTableCell>
                            <StyledTableCell align="center">Location</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {laptops.results.map((laptop: Laptop) => ( // TODO: change this
                            <TableRow
                                key={laptop.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <StyledLink to={`/laptop/${laptop.id}`} >{laptop.hardware_id}</StyledLink>
                                </TableCell>
                                <TableCell align="center">{laptop.laptop_sr_no}</TableCell>
                                <TableCell align="center">{laptop.processor}</TableCell>
                                <TableCell align="center">{laptop.ram_capacity}</TableCell>
                                <TableCell align="center">{laptop.laptop_branch.location}</TableCell>
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