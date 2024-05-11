import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colors } from "../data/Colors";
import ProgressBar from "@ramonak/react-progress-bar";
import { Fade } from "react-awesome-reveal";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [abilities, setAbilities] = useState(null);
  const params = useParams();
  let countNotFound = 0;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
      .then((response) => response.json())
      .then((json) => {
        const fetchImages = json.abilities.map((ab) =>
          fetch(ab.ability.url).then((response) => response.json())
        );

        Promise.all(fetchImages).then((abilitiesData) => {
          setAbilities(abilitiesData);
          const pokemonData = { ...json, abilities: abilitiesData };
          setPokemon(pokemonData);
        });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }, []);

  if (!pokemon) {
    return <div></div>;
  }
  const color = pokemon.types[0].type.name;
  return (
    <Fade>
      <main className="w-full h-full">
        <div className="flex flex-row">
          <div className="w-1/2 lg:block none"></div>
          <div
            className={`w-1/2 py-10 lg:fixed h-screen`}
            style={{ backgroundColor: colors[color], color: "white" }}
          >
            <h1 className="text-center text-5xl text-white font-bold capitalize">
              {pokemon.name}
            </h1>
            {pokemon.sprites && (
              <img
                src={
                  pokemon.sprites.other.home.front_default != null
                    ? pokemon.sprites.other.home.front_default
                    : pokemon.sprites.front_default != null
                    ? pokemon.sprites.front_default
                    : "/img/pokeb.png"
                }
                alt={pokemon.name}
                className="w-[30rem] m-auto drop-shadow-3xl py-20"
              />
            )}
          </div>
          <div className="w-1/2 p-10 flex flex-col m-auto">
            <div className="h-auto">
              <h1 className={`w-full pb-8 font-semibold text-4xl text-center`}>
                <strong
                  className={`capitalize`}
                  style={{ color: colors[color] }}
                >
                  {pokemon.name}
                </strong>{" "}
                Information
              </h1>
              <h1 className={`w-full pb-8 font-semibold text-3xl text-center`}>
                <strong className={`capitalize`}>Stats</strong>
              </h1>
              {pokemon.stats.map((statPerPokemon, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full capitalize m-auto px-1"
                  >
                    <div className="min-w-1/5 w-[35%]">
                      <h1 className="font-bold uppercase">
                        {statPerPokemon.stat.name.replace("-", " ")}:
                      </h1>
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
            <div className="h-full py-6">
              <h1 className={`w-full pb-8 font-semibold text-3xl text-center`}>
                <strong className={`capitalize`}>Type</strong>
              </h1>
              <div className="w-full flex flex-col flex-grow gap-4">
                {pokemon.types.map((typePokemon) => {
                  const type = typePokemon.type.name;
                  const color = colors[type] || "gray";
                  return (
                    <div
                      className="w-1/2 justify-center flex m-auto rounded-sm capitalize py-2"
                      style={{ backgroundColor: color, color: "white" }}
                    >
                      <h1 className="text-xl font-bold">{type}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="m-auto py-4">
              <h1 className="text-4xl font-bold py-4 text-center">Abilities</h1>
              {abilities.map((ab, index) => {
                if (ab.effect_entries.length > 0) {
                  return (
                    <div key={index} className="flex flex-col pb-4">
                      {ab.effect_entries.map((abeffect, subIndex) => {
                        if (abeffect.language.name === "en") {
                          return (
                            <h1 key={subIndex}>
                              <strong className="capitalize">
                                {ab.name.replace("-", " ")}:
                              </strong>{" "}
                              {abeffect.effect}
                            </h1>
                          );
                        }
                        return null;
                      })}
                    </div>
                  );
                } else {
                  if (countNotFound === 0) {
                    countNotFound++;
                    return <h1 key={index}>Information not found</h1>;
                  } else {
                    return null;
                  }
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </Fade>
  );
}
