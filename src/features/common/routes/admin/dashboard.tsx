// Material UI Components
import Divider from '@mui/material/Divider';
import LanIcon from '@mui/icons-material/Lan';
import Typography from "@mui/material/Typography"
import LaptopIcon from '@mui/icons-material/Laptop';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

// Internal UI Components
import Grid from "../../components/Grid"
import Card from "../../../employee/components/Card"

const adminCards = [
    {
        title: "Departments",
        url: "/admin/departments",
        icon: <CorporateFareIcon />
    },
    {
        title: "Designations",
        url: "/admin/designations",
        icon: <LanIcon />

    },
    {
        title: "Locations",
        url: "/admin/branches",
        icon: <LocationCityIcon />
    },
    {
        title: "Employee Settings",
        url: "/admin/employee-settings",
        icon: <SettingsApplicationsIcon />
    },
    {
        title: "Buildings",
        url: "/admin/building",
        icon: <LocationCityIcon />
    },
    {
        title: "Laptop Brands",
        url: "/admin/laptop-brands",
        icon: <LaptopIcon />
    },
    {
        title: "Hardware Settings",
        url: "/admin/hardware-settings",
        icon: <SettingsApplicationsIcon />
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: <PeopleIcon />
    },
]

export default function AdminDasboardRoute() {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel
            </Typography>
            <Divider />
            <Grid container spacing={3} pt={3}>
                {adminCards.map((cardDetail) => {
                    return (
                        <Grid item xs={4}>
                           <Card
                                title={cardDetail.title}
                                url={cardDetail.url}
                                icon={cardDetail.icon}
                            />
                        </ Grid>
                    )
                })}
            </Grid>
        </>
    )
}