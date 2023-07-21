// Material UI Imports
import { Paper } from "@mui/material"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// React imports
import { useState } from "react";

// 3rd party tools
import { useParams, Link } from "react-router-dom";

// Custom Components
import {
    darkTheme,
    StyledButton,
    StyledTableCell,
    StyledLink
} from "../../../lib/theme";
import DetailItem from "../../common/components/DetailContent";
import Delete from "../../common/components/Delete";
import { useGetEmployeeDetailQuery } from "../employeesApiSlice";
import { Laptop } from "../../../types/laptop";
import { OnClickEvent } from "../../../types/common";


export default function EmployeeDetail() {
    let { id } = useParams();
    const {
        data: employee,
        isLoading,
        isFetching,
        isError,
        error
    } = useGetEmployeeDetailQuery({ id: id });
    const [anchorEl, setAnchorEl] = useState<null | EventTarget & HTMLButtonElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: OnClickEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isLoading) {
        return (
            <>
                <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                    <Typography variant="h4" component="h1">
                        {employee?.emp_name}
                    </Typography>
                    <Link
                        to={`edit`}
                        style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}
                    >
                        <StyledButton>
                            Edit
                        </StyledButton>
                    </Link>
                    <StyledButton onClick={handleClick}>...</StyledButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ marginTop: '10px'}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link
                                to={`history`}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                History
                            </Link>
                        </MenuItem>
                        <Delete employeeId={id}/>
                    </Menu>
                </Stack>
                <Paper variant="outlined">
                    <Grid container spacing={2} padding={3}>
                        <DetailItem
                            textAlign={'left'}
                            title={'Employee Id'}
                            content={employee?.lk_emp_id}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Email'}
                            content={employee?.emp_email}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Branch'}
                            content={employee?.loc_id?.location}
                        />
                        <DetailItem
                            textAlign={'left'}
                            title={'Department'}
                            content={employee?.dept_id?.dept_name}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Designation'}
                            content={employee?.desig_id?.designation}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Date Joined'}
                            content={employee?.emp_date_joined}
                        />
                    </Grid>
                </Paper>
                <Paper variant="outlined" sx={{ padding: '1rem', marginTop: '30px' }}>
                    <Typography
                        color={darkTheme.palette.text.secondary}
                        mb={2}
                    >
                        Laptops Assigned
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Hardware ID</StyledTableCell>
                                    <StyledTableCell align="center">Laptop Sr No</StyledTableCell>
                                    <StyledTableCell align="center">Laptop Grade</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {employee.laptops.length > 0
                                    ? employee.laptops.map((laptop: Laptop) => (
                                        <TableRow
                                            key={laptop.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                <StyledLink to={`/laptop/${laptop.id}`}>{laptop.hardware_id}</StyledLink>
                                            </TableCell>
                                            <TableCell align="center">{laptop.laptop_sr_no}</TableCell>
                                            <TableCell align="center">{laptop.processor}</TableCell>
                                        </TableRow>
                                    ))
                                    : (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell colSpan={3} align="center">
                                                <StyledLink to={'#'} >No Laptops Assigned</StyledLink>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </>
        )
    }
}