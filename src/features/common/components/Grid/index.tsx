import * as React from 'react';
import Grid from "@mui/material/Grid";
import { GridProps } from '@mui/material/Grid';

interface CustomGridTypeMap extends GridProps {
    hidden?: boolean,
}

export default function ({ hidden, ...props}: CustomGridTypeMap) {

    if (hidden) {
        return (
            <Grid sx={{ display: 'none' }} {...props}>
                {props.children}
            </Grid>
        )
    }

    return (
        <Grid {...props}>
            {props.children}
        </Grid>
    )
}