import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from '@mui/system';

export default function Notification() {
    return (
        <NotificationsIcon 
            sx={{
                background: "grey",
                padding: "0.125rem",
                border: "1px solid white",
                borderRadius: "0.25rem"
            }}
        />
    )
}