import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardBody({ name, img, id}) {
  return (
    <Link to={`/pokemon/${id}`}>
      <Card sx={{ maxWidth: 345 }} className="m-auto">
        <CardActionArea>
          <CardMedia
            sx={{ width: 170 }}
            className="m-auto"
            component="img"
            height="140"
            image={img}
            alt={name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="capitalize text-center"
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
