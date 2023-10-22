import Typography from "@mui/material/Typography"

import { FCWithChildren } from "../../../../types/common"

export default function PageTitle({ children }: FCWithChildren) {
    return (
        <Typography variant="h4" component="h1">
            {children}
        </Typography>
    )
}
