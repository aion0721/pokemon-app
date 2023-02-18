import "./App.css";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // Get all pokemon data
      let res = await getAllPokemon(initialURL);
      // get detail data.
      loadPokemon(res.results);
      //console.log(res.results);
      //console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        //console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);
  return (
    <div className="App">
      {loading ? (
        <h1>Now loading...</h1>
      ) : (
        <div className="pokemonCardContainer">
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
