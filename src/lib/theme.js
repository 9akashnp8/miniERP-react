import TableCell from '@mui/material/TableCell';
import InputBase from '@mui/material/InputBase';

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
export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
}))