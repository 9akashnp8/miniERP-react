import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { colors } from '../../../theme/colors';
import { ButtonProps } from '@mui/material';

const GhostButtonBase = styled(ButtonBase)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&:hover': {
        color: theme.palette.primary.dark
    },
    '&:active': {
        color: colors.teal[50],
    },
    '&:disabled': {
        color: colors.cinder[30],
    },
    fontSize: '1rem',
    padding: '0.625rem',
    borderRadius: '0.25rem',
}))

export default function({ children, ...props }: ButtonProps) {
    return (
        <GhostButtonBase disableRipple {...props}>
            {children}
        </GhostButtonBase>
    )
}