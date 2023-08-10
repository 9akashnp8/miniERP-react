import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { colors } from '../../../theme/colors';
import { ButtonProps } from '@mui/material';

const PrimaryButtonBase = styled(ButtonBase)(({ theme }) => ({
    border: colors.cinder[90],
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        color: colors.white[0],
        backgroundColor: theme.palette.primary.dark,
    },
    '&:active': {
        color: colors.white[0],
        backgroundColor: colors.teal[50],
    },
    '&:disabled': {
        color: colors.cinder[70],
        backgroundColor: colors.cinder[30],
    },
    color: colors.black[100],
    fontSize: '1rem',
    padding: '0.625rem',
    borderRadius: '0.25rem',
}))

export default function({ children, ...props }: ButtonProps) {
    return (
        <PrimaryButtonBase disableRipple {...props}>
            {children}
        </PrimaryButtonBase>
    )
}