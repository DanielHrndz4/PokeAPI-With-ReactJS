import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import CardBody from "./components/CardBody";
import { Fade } from "react-awesome-reveal";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 30;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);

    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
        (currentPage - 1) * itemsPerPage
      }`
    )
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

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <main className="h-full w-full">
      {isLoading ? (
        <Fade className="w-full">
          <h1 className="text-center py-12 text-4xl uppercase font-bold text-[#B22222]">
            Pokémon
          </h1>
          <div className="flex items-center justify-center w-full h-creen py-32">
            {/* <h1 className="text-center text-4xl font-bold">Loading...</h1> */}
          </div>
        </Fade>
      ) : (
        <Fade>
          <h1 className="text-center py-12 text-4xl uppercase font-bold text-[#B22222]">
            Pokémon
          </h1>
          <div className="w-[90%] m-auto h-full">
            <Fade>
              <div className="grid grid-cols-5 m-auto gap-4 ">
                {pokemons.map((pokemon, index) => (
                  <CardBody
                    key={index}
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types}
                    img={
                      pokemon.sprites.other.home.front_default != null
                        ? pokemon.sprites.other.home.front_default
                        : pokemon.sprites.front_default != null
                        ? pokemon.sprites.front_default
                        : "/img/pokeb.png"
                    }
                  ></CardBody>
                ))}
              </div>
            </Fade>
            <Pagination
              className="py-12 w-full m-auto basis-1"
              count={Math.ceil(totalResults / itemsPerPage)}
              page={currentPage}
              color="secondary"
              onChange={handlePageChange}
            />
          </div>
        </Fade>
      )}
    </main>
  );
}
