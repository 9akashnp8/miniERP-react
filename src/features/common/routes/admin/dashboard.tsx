// Material UI Components
import Typography from "@mui/material/Typography"

// Internal UI Components
import Card from "../../../employee/components/Card"
import Grid from "../../components/Grid"

const adminCards = [
    {
        title: "Departments",
        url: "/admin/departments"
    },
    {
        title: "Designations",
        url: "/admin/designations"
    },
    {
        title: "Locations",
        url: "/admin/branches"
    },
    {
        title: "Settings",
        url: "/admin/settings"
    },
    {
        title: "Buildings",
        url: "/admin/building"
    },
    {
        title: "Laptop Brands",
        url: "/admin/laptop-brands"
    },
    {
        title: "Settings",
        url: "/admin/settings"
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