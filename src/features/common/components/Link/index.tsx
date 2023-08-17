import { Link as RouterLink } from 'react-router-dom';
import { Link as MaterialLink } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Matcher } from '@reduxjs/toolkit/dist/tsHelpers';

interface LinkProps {
    children: any; // TODO: change this
    to: string;
    style?: any // TODO: change this
}

function Link({ children, to, ...props }: LinkProps) {
    return (
        <MaterialLink component={RouterLink} to={to} {...props} >
            {children}
        </MaterialLink>
    )
}

export default styled(Link)(({ theme }) => ({
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    textDecorationThickness: '0.5px',
    color: 'white',
    '&:hover': {
        color: theme.palette.primary.light
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        width: 'auto',
    },
})); 