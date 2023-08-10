import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { colors } from '../../../theme/colors';
import { ButtonProps } from '@mui/material';

const SecondaryButton = styled(ButtonBase)(({ theme }) => ({
    fontSize: '1rem',
    padding: '0.625rem',
    borderRadius: '0.25rem',
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.light}`,
    '&:hover': {
        color: colors.white[0],
        backgroundColor: theme.palette.primary.dark,
        border: '1px solid black',
    },
    '&:active': {
        color: colors.white[0],
        backgroundColor: colors.teal[50],
        border: '1px solid black',
    },
    '&:disabled': {
        color: colors.cinder[70],
        backgroundColor: colors.cinder[30],
        border: '1px solid black',
    },
}))

export default function({ children, ...props }: ButtonProps) {
    return (
        <SecondaryButton disableRipple {...props}>
            {children}
        </SecondaryButton>
    )
}