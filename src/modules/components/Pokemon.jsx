import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const params = useParams();
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((response) => response.json())
      .then((json) => {
        const fetchImages = () => {
          return fetch(json.location_area_encounters)
            .then((response) => response.json())
            .then((data) => ({ ...json, ...data }));
        };

        Promise.all([fetchImages()]).then((data) => {
          setPokemon(data[0]);
        });
      });
  }, [params.id]);

  console.log(pokemon);
  return (
    <main className="w-full h-full">
      <h1>{params.id}</h1>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className="w-[20rem]"/>
    </main>
  );
}
