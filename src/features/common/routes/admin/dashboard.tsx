// Material UI Components
import Typography from "@mui/material/Typography"

// Internal UI Components
import Card from "../../../employee/components/Card"
import Grid from "../../components/Grid"

const adminCards = [
    {
        title: "Departments",
        url: "/admin/employee/departments"
    },
    {
        title: "Designations",
        url: "/admin/employee/designations"
    },
    {
        title: "Locations",
        url: "/admin/employee/locations"
    },
    {
        title: "Settings",
        url: "/admin/employee/settings"
    },
    {
        title: "Buildings",
        url: "/admin/hardware/building"
    },
    {
        title: "Brands",
        url: "/admin/hardware/brand"
    },
    {
        title: "Settings",
        url: "/admin/hardware/settings"
    },
    {
        title: "Users",
        url: "/admin/users"
    },
]

export default function AdminDasboardRoute() {
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Panel
            </Typography>
            <Grid container spacing={3}>
                {adminCards.map((cardDetail) => {
                    return (
                        <Grid item xs={4}>
                           <Card
                                title={cardDetail.title}
                                url={cardDetail.url}
                            />
                        </ Grid>
                    )
                })}
            </Grid>
        </>
    )
}