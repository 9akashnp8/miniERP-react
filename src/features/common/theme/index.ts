import { createTheme } from "@mui/material";
import { colors } from "./colors";

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.teal[20],
            light: colors.teal[10],
            dark: colors.teal[40],
            contrastText: colors.black[100]
        },
        background: {
            default: colors.black[100],
            paper: colors.cinder[90]
        },
        text: {
            primary: colors.white[0],
            secondary: colors.cinder[50],
        },
        success: {
            main: colors.olive[60]
        },
        error: {
            main: colors.rouge[60]
        },
    },
});
