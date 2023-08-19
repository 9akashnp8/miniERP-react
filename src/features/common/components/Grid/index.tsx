import * as React from 'react';
import { Grid as MaterialGrid } from "@mui/material";
import { GridProps } from '@mui/material/Grid';

interface CustomGridProps extends GridProps {
    hidden?: boolean,
}

export default function ({ hidden, ...props}: CustomGridProps) {

    if (hidden) {
        return (
            <MaterialGrid sx={{ display: 'none' }} {...props}>
                {props.children}
            </MaterialGrid>
        )
    }

    return (
        <MaterialGrid {...props}>
            {props.children}
        </MaterialGrid>
    )
}