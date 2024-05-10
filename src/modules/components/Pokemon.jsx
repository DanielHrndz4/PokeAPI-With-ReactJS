import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../data/Colors";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const params = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
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
  }, []);

  // Verifica si 'pokemon' es null antes de intentar acceder a sus propiedades
  if (!pokemon) {
    return <div>Cargando...</div>; // Puedes mostrar un mensaje de carga o un spinner mientras se carga el dato
  }
  const color = pokemon.types[0].type.name;
  
  return (
    <main className="w-full h-full">
      <div className="flex flex-row">
        <div
          className={`w-1/2 pt-10`}
          style={{ backgroundColor: colors[color], color: "white" }}
        >
          <h1 className="text-center text-5xl text-white font-bold capitalize">
            {pokemon.name}
          </h1>
          {pokemon.sprites && (
            <img
              src={pokemon.sprites.other.home.front_default}
              alt={pokemon.name}
              className="w-[30rem] m-auto drop-shadow-3xl pb-6"
            />
          )}
        </div>
        <div className="w-1/2 p-10">
        <h1 className={`w-full pb-8 font-semibold text-4xl text-center`}><strong className={`capitalize`} style={{color: colors[color]}}>{pokemon.name}</strong> Information</h1>
        <h1 className={`w-full pb-8 font-semibold text-3xl text-center`}><strong className={`capitalize`}>Stats</strong></h1>
          {pokemon.stats.map((statPerPokemon, index) => {
            return (
              <div key={index} className="flex w-full capitalize m-auto px-1">
                <div className="min-w-1/5 w-[30%]">
                  <h1>{statPerPokemon.stat.name}:</h1>
                </div>
                <div className="w-full flex px-6">
                  <ProgressBar
                    className="flex-grow"
                    borderRadius="10px"
                    customLabel={`${statPerPokemon.base_stat}`}
                    bgColor={colors[color]}
                    animateOnRender={true}
                    completed={statPerPokemon.base_stat}
                    maxCompleted={255}
                  />
                  <strong className="px-2"> / 255</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
