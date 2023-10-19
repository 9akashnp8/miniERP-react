import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card as MaterialCard } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

type Props = {
    title: string,
    url: string,
    icon: React.ReactNode
}

export default function Card({title, url, icon}: Props) {
  return (
    <Link to={url} style={{ textDecoration: "none"}} >
      <MaterialCard sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <CardContent>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {icon}
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </Stack>
        </CardContent>
      </MaterialCard>
    </Link>
  );
}
