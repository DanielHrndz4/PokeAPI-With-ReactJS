import { useEffect, useState } from 'react';
import Card from './assets/modules/components/Card';
import { Pagination } from '@mui/material';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${index}`)
      .then(response => response.json())
      .then(json => {
        const fetchImages = json.results.map(pokemon => {
          return fetch(pokemon.url)
            .then(response => response.json())
            .then(data => ({ ...pokemon, ...data })); // Combinar datos del Pokémon original con datos adicionales
        });
        Promise.all(fetchImages).then(data => {
          setPokemons(data);
        });
      });
  }, [index]);

  const handleNextPage = () => {
    setIndex(index + 20);
  };

  const handlePrevPage = () => {
    setIndex(index <= 1 ? 1 : index - 20);
  };

  console.log(pokemons);

  return (
    <main className='h-full w-full'>
      <h1 className='text-center'>Pokémon</h1>
      <div className='grid grid-cols-5 m-auto gap-8'>
        {pokemons.map((pokemon, index) => (
          <Card key={index} name={pokemon.name} img={pokemon.sprites.front_default}></Card>
        ))}
      </div>
      <Pagination></Pagination>
    </main>
  );
}

export default App;
