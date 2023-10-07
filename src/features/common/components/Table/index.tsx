import Paper from "@mui/material/Paper"
import TableRow from "@mui/material/TableRow"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableHead"
import { Table as MaterialTable } from "@mui/material"
import TableContainer from "@mui/material/TableContainer"

import { StyledTableCell } from "../../../../lib/theme"

type TableColumnProps = {
    columnNames: string[]
}

function TableColumns({ columnNames }: TableColumnProps) {
    return (
        <TableHead>
            <TableRow>
                {columnNames.map((name) => (
                    <StyledTableCell align="center">
                        {name}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

type TableProps = {
    columns: string[],
    children: React.ReactNode
}

export default function Table({ columns, children: tableRows }: TableProps) {
    return (
        <TableContainer component={Paper}>
            <MaterialTable
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableColumns columnNames={columns} />
                <TableBody>
                    {tableRows}
                </TableBody>
            </MaterialTable>
        </TableContainer>
    )
}
