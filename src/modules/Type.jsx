import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import CardBody from "./components/CardBody";

export default function Type() {
    const [pokemons, setPokemons] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 30; 
  
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/type/grass`)
        .then((response) => response.json())
        .then((json) => console.log(json));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    console.log(pokemons.pokemon)
  
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
  
    return (
      <main className="h-full w-full">
        <h1 className="text-center py-12 text-4xl uppercase font-bold">Pokémon</h1>
        <div className="grid grid-cols-5 m-auto gap-4">
          {pokemons.map((pokemon, index) => (
            <CardBody
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              img={pokemon.sprites.other.home.front_default != null ? pokemon.sprites.other.home.front_default : pokemon.sprites.front_default}
            ></CardBody>
          ))}
        </div>
        <Pagination className="py-12 w-full m-auto basis-1"
          count={Math.ceil(totalResults / itemsPerPage)}
          page={currentPage}
          color="secondary" 
          onChange={handlePageChange}
        />
      </main>
    );
  }
  