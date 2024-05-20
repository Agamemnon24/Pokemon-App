import { useState, useEffect } from "react";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function PokemonGen() {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [defaultPoke, setDefaultPoke] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${defaultPoke}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) =>
        console.error("There was an error while fetching:", error)
      );
  }, [defaultPoke]);

  function prevPoke() {
    if (defaultPoke <= 1) {
      return;
    }
    setDefaultPoke(defaultPoke - 1);
    if (isNaN(defaultPoke)) {
      setDefaultPoke(1);
    }
  }

  function nextPoke() {
    setDefaultPoke(defaultPoke + 1);
    if (isNaN(defaultPoke)) {
      setDefaultPoke(1);
    }
  }

  function searchPoke() {
    if (searchInput === "") {
      return;
    }
    setDefaultPoke(searchInput);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <input
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
      <button onClick={searchPoke}>Search</button>
      <h2>{pokemon.name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        style={{ width: "300px", height: "250px" }}
      />
      <p>
        <h4>Type:</h4>
        {pokemon.types.map((item) => (
          <li key={item.type.name}>{item.type.name}</li>
        ))}
      </p>
      <h4>Abilities: </h4>
      <p>
        {pokemon.abilities.map((item) => (
          <li key={item.ability.name}>{item.ability.name}</li>
        ))}
      </p>
      <h4>Some Moves:</h4>
      <p>
        {pokemon.moves.slice(0, 5).map((item) => (
          <span key={item.move.name}>{item.move.name}, </span>
        ))}
      </p>
      <div>
        <button onClick={prevPoke} className="btn btn-primary">
          Previous
        </button>
        <button onClick={nextPoke} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonGen;
