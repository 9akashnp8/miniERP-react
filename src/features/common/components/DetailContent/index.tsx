import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { darkTheme, StyledLink } from '../../../../lib/theme';

interface DetailItemProps {
    breakPoint?: number,
    textAlign: any, // TODO: change this
    title: string,
    content: string,
    isLink?: boolean,
    linkTo?: string
}

export default function ({
    breakPoint = 4,
    textAlign,
    title,
    content,
    isLink = false,
    linkTo = ''
}: DetailItemProps) {
    return (
        <Grid item xs={breakPoint} textAlign={textAlign}>
            <Typography
                fontSize={'0.75rem'}
                color={darkTheme.palette.text.secondary}
            >
                {title}
            </Typography>
            { 
                isLink
                ? (
                    <StyledLink to={linkTo}>
                        {content}
                    </StyledLink>
                )
                : (
                    <Typography
                        fontWeight={'bold'}
                    >
                        {content}
                    </Typography>
                )
            }
        </Grid>
    )
}