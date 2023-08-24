import { useState, useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
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
} from '../../../lib/theme';
import { useGetLaptopsQuery } from '../laptopsApiSlice';
import { Laptop } from '../../../types/laptop';
import { useTheme } from '@mui/material/styles';

import Link from '../../common/components/Link';
import PrimaryButton from '../../common/components/Button/PrimaryButton';
import SecondaryButton from '../../common/components/Button/SecondaryButton';

export default function LaptopTable() {
    const theme = useTheme();
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
                        <PrimaryButton>
                            Create
                        </PrimaryButton>
                    </Link>
                    <SecondaryButton>...</SecondaryButton>
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
                                key={laptop?.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    <Link to={`/laptop/${laptop?.id}`} >{laptop?.hardware_id}</Link>
                                </TableCell>
                                <TableCell align="center">{laptop?.laptop_sr_no}</TableCell>
                                <TableCell align="center">{laptop?.processor}</TableCell>
                                <TableCell align="center">{laptop?.ram_capacity}</TableCell>
                                <TableCell align="center">{laptop?.laptop_branch?.location}</TableCell>
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