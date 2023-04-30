import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { darkTheme, StyledLink } from '../lib/theme';

export default function DetailItem({ breakPoint = 4, textAlign, title, content, isLink, linkTo}) {
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