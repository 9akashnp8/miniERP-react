// Material UI Imports
import { Paper } from "@mui/material"
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// React imports
import { useState } from "react";

// 3rd party tools
import { useParams, Link } from "react-router-dom";

// Custom Components
import DetailItem from "../../../common/components/DetailContent";
import SecondaryButton from "../../../common/components/Button/SecondaryButton";
import Delete from "../../../common/components/Delete";
import { useGetHardwareQuery } from "../../../api/hardware/hardwareApiSlice";
import { useGetEmployeesAssignedQuery } from "../../../api/hardware/assignmentApiSlice";
import { OnClickEvent } from "../../../../types/common";
import { calculateHardwareAgeAtInventory } from "../../../../lib/utils";

export default function LaptopDetail() {
    const { uuid } = useParams();
    const {
        data: hardware,
        isLoading,
    } = useGetHardwareQuery({ hardwareUuid: uuid || '' });
    const { data: employeesAssigned } = useGetEmployeesAssignedQuery(uuid || '')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: OnClickEvent) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(employeesAssigned)
    if (!isLoading && hardware) {
        return (
            <>
                <Stack direction="row" spacing={1.5} useFlexGap mb={3}>
                    <Typography variant="h4" component="h1">
                        {hardware.hardware_id}                                                    
                    </Typography>
                    <Link
                        to={`edit`}
                        style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}
                    >
                        <SecondaryButton>
                            Edit
                        </SecondaryButton>
                    </Link>
                    <SecondaryButton onClick={handleClick}>...</SecondaryButton>
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
                        <Delete employeeId={hardware.uuid}/>
                    </Menu>
                </Stack>
                {/* Hardware Basic Info Card */}
                <Paper variant="outlined" sx={{ marginBottom: '30px' }}>
                    <Grid container spacing={2} padding={3}>
                        <DetailItem
                            textAlign={'left'}
                            title={'Serial No.'}
                            content={hardware.serial_no}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Assigned To'}
                            content={employeesAssigned?.employee.lk_emp_id || ''}
                            isLink
                            linkTo={`/employee/${employeesAssigned?.employee.emp_id}`}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Condition'}
                            content={hardware.condition.condition}
                        />
                    </Grid>
                </Paper>

                {/* Hardware Specifications */}
                <Paper
                    variant="outlined"
                    sx={{
                        padding: '1rem',
                        marginTop: '30px',
                    }}
                >
                    <Typography mb={2}>
                        Other Information
                    </Typography>
                    <Grid container spacing={2} padding={3}>
                        <DetailItem
                            textAlign={'left'}
                            title={'Location'}
                            content={hardware.location.location}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Building'}
                            content={hardware.building.building}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Owner'}
                            content={hardware.owner.name}
                        />
                        <DetailItem
                            textAlign={'left'}
                            title={'Type'}
                            content={hardware.type.name}
                        />
                        <DetailItem
                            textAlign={'center'}
                            title={'Purchase Date'}
                            content={hardware.purchased_date}
                        />
                        <DetailItem
                            textAlign={'right'}
                            title={'Age at Inventory'}
                            content={`${calculateHardwareAgeAtInventory(new Date(hardware.purchased_date))} year(s)`}
                        />
                    </Grid>
                </Paper>
                <Stack
                    spacing={3}
                    direction={'row'}
                    justifyContent="space-between"
                    textAlign={'center'}
                >
                    {/* <Paper variant="outlined">
                        <Typography
                            color={darkTheme.palette.text.primary}
                            fontWeight={600}
                            mt={2}
                        >
                            Laptop Spec
                        </Typography>
                        <Grid container spacing={2} padding={3}>
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Brand'}
                                content={laptop?.brand?.brand_name}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Processor'}
                                content={laptop?.processor}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'RAM'}
                                content={laptop?.ram_capacity}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Storage'}
                                content={laptop?.storage_capacity}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Screen Size'}
                                content={laptop?.screen_size}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Screen Type'}
                                content={laptop?.screen_type}
                            />
                        </Grid>
                    </Paper> */}
                    {/* <Paper variant="outlined">
                        <Typography
                            color={darkTheme.palette.text.primary}
                            fontWeight={600}
                            mt={2}
                        >
                            Additional Information
                        </Typography>
                        <Grid container spacing={2} padding={3}>
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Purchase Date'}
                                content={laptop?.laptop_date_purchased}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Owernship'}
                                content={laptop?.laptop_owner_type}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Rental Vendor'}
                                content={laptop?.laptop_rental_vendor}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Location'}
                                content={laptop?.laptop_branch?.location}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Building'}
                                content={laptop?.laptop_building?.building}
                            />
                        </Grid>
                    </Paper> */}
                    {/* <Paper variant="outlined">
                        <Typography
                            color={darkTheme.palette.text.primary}
                            fontWeight={600}
                            mt={2}
                        >
                            Other Information
                        </Typography>
                        <Grid container spacing={2} padding={3}>
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Date Returned'}
                                content={laptop?.laptop_date_returned}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'right'}
                                title={'Latest Remarks'}
                                content={laptop?.laptop_return_remarks}
                            />
                            <DetailItem
                                breakPoint={6}
                                textAlign={'left'}
                                title={'Date Sold'}
                                content={laptop?.laptop_date_sold}
                            />
                        </Grid>
                    </Paper> */}
                </Stack>
            </>
        )
    }
}