import { createTheme } from "@mui/material/styles";

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