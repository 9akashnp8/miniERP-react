import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { darkTheme } from '../lib/theme';

export default function DetailItem({textAlign, title, content}) {
    return (
        <Grid item xs={4} textAlign={textAlign}>
            <Typography
                fontSize={'0.75rem'}
                color={darkTheme.palette.text.secondary}
            >
                {title}
            </Typography>
            <Typography
                fontWeight={'bold'}
            >
                {content}
            </Typography>
        </Grid>
    )
}