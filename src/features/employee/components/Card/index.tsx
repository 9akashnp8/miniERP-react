import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Card as MaterialCard } from "@mui/material";

import { Link } from "react-router-dom";

type Props = {
    title: string,
    url: string
}

export default function Card({title, url}: Props) {
  return (
    <Link to={url} style={{ textDecoration: "none"}} >
      <MaterialCard sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </MaterialCard>
    </Link>
  );
}
