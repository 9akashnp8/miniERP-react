import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useLoaderData } from "react-router-dom";

import { getLaptops } from '../lib/laptops';

export default function LaptopTable() {
    const laptops = useLoaderData();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Laptop HW ID</TableCell>
                        <TableCell align="center">Serial Number</TableCell>
                        <TableCell align="center">Processor</TableCell>
                        <TableCell align="center">RAM</TableCell>
                        <TableCell align="center">Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {laptops.map((laptop) => (
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
    );
}

export async function loader() {
    const laptops = getLaptops();
    return laptops;
}