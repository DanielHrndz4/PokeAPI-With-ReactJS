import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../data/Colors";

export default function CardBody({ name, img, id, types }) {
  const typeCard = types[0].type.name
  const color = colors[typeCard]
  return (
    <Link to={`/pokemon/${name}`}>
      <Card sx={{ maxWidth: 345 }} className="m-auto">
        <CardActionArea>
          <div className="w-full py-6" style={{backgroundColor:color}}>
          <CardMedia
            sx={{ width: 170 }}
            className="m-auto w-[30px]"
            component="img"
            height="140"
            image={img}
            alt={name}
          />
          </div>
          <CardContent className="p-[10px !important] text-center">
            <h1 className="text-gray-500 py-2">
              # {id.toString().padStart(5, "0")}
            </h1>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="capitalize text-center"
            >
              {name}
            </Typography>
            <CardActions className="flex flex-row justify-center">
              {types.map((typePerPokemon) => {
                const type = typePerPokemon.type.name;
                const color = colors[type] || "gray";
                return (
                  <div
                    className="w-1/2 justify-center flex rounded-sm capitalize"
                    style={{ backgroundColor: color, color: "white" }}
                  >
                    {type}
                  </div>
                );
              })}
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
