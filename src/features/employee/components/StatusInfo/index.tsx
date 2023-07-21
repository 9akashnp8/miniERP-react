import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface StatusInfoProps {
    isActive: boolean
}

export default function ({ isActive }: StatusInfoProps) {

    let backgroundColor = 'red';
    if (isActive) {
        backgroundColor = 'green'
    }

    return (
        <Box
            sx={{
                backgroundColor: {backgroundColor},
                borderRadius: '5px',
                paddingX: '4px',
                paddingY: '2px'
            }}
        >
            <Typography fontSize={"small"}>
                { isActive ? 'Active' : 'Inactive'  }
            </Typography>
        </Box>
    )
}