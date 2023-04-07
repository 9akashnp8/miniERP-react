import TableCell from '@mui/material/TableCell';

import { createTheme } from "@mui/material/styles";
import { styled, alpha } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'sans-seriff'
        ].join(','),
    }
});

export const darkTheme = createTheme({
    typography: {
        fontFamily: [
            'Inter',
            'sans-seriff'
        ].join(','),
    },
    palette: {
        mode: 'dark',
    },
});

// Custom styled components
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
}))