import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

interface StatusInfoProps {
    isActive: boolean
}

export default function ({ isActive }: StatusInfoProps) {
    const theme = useTheme();

    let backgroundColor = theme.palette.error.main;
    if (isActive) {
        backgroundColor = theme.palette.success.main
    }

    return (
        <Box
            sx={{
                backgroundColor: {backgroundColor},
                borderRadius: '5px',
                paddingX: '4px',
                paddingY: '2px'
            }}
            data-testid='statusInfoContainer'
        >
            <Typography fontSize={"small"}>
                { isActive ? 'Active' : 'Inactive'  }
            </Typography>
        </Box>
    )
}