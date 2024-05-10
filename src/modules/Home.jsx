import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import CardBody from "./components/CardBody";

export default function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; 
  
    useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`)
        .then((response) => response.json())
        .then((json) => {
          const fetchImages = json.results.map((pokemon) => {
            return fetch(pokemon.url)
              .then((response) => response.json())
              .then((data) => ({ ...pokemon, ...data }));
          });
          Promise.all(fetchImages).then((data) => {
            setPokemons(data);
          });
          setTotalResults(json.count);
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    console.log(pokemons)
  
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
  
    return (
      <main className="h-full w-full">
        <h1 className="text-center">Pokémon</h1>
        <div className="grid grid-cols-5 m-auto gap-8">
          {pokemons.map((pokemon, index) => (
            <CardBody
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              img={pokemon.sprites.front_default}
            ></CardBody>
          ))}
        </div>
        <Pagination
          count={Math.ceil(totalResults / itemsPerPage)}
          page={currentPage}
          color="secondary" 
          onChange={handlePageChange}
        />
      </main>
    );
  }
  