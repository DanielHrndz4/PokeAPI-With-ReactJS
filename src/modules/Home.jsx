import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useParams, Link } from "react-router-dom"; // Importa Link
import { Pagination, PaginationItem } from "@mui/material"; // Importa PaginationItem
import CardBody from "./components/CardBody";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const page = params.page <= 44 ? params.page : 44
  const itemsPerPage = 30;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);

    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${
        (page - 1) * itemsPerPage
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
  }, [params.page, currentPage]);

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
          <div className="flex items-center justify-center w-full h-screen">
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
            <div className="flex justify-center py-16">
              <Pagination
                count={Math.ceil(totalResults / itemsPerPage)}
                page={parseInt(page)}
                color="secondary"
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/page/${item.page}`}
                    {...item}
                  />
                )}
              />
            </div>
          </div>
        </Fade>
      )}
    </main>
  );
}
