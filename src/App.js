import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const getData = async () => {
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/ramclen/Poke-Server/master/pokedex.json"
    );
    const { data: pokemonInfoList } = await axios.get(
      "https://raw.githubusercontent.com/ramclen/Poke-Server/master/descriptions.json"
    );

    const { Pokedex } = data.find(
      ({ id }) => id === "6310df942f0f59918a5c3201"
    );

    const pokedexFullDetails = Pokedex.map((data) => {
      const pokemonData = pokemonInfoList.find(({ id }) => id === data.id);
      return {
        ...data,
        ...pokemonData,
      };
    });

    setData(pokedexFullDetails);
  };

  const onSearchChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filter = data.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPokemon(filter);
  }, [searchValue]);

  return (
    <div className="App">
      <h1>pokimon</h1>
      <input
        type="search"
        width="150px"
        value={searchValue}
        onChange={onSearchChange}
      />
      {filteredPokemon && (
        <ul>
          {filteredPokemon.map((pokemon) => {
            return (
              <li onClick={() => handleClick(pokemon)}>
                <img
                  src={`https://raw.githubusercontent.com/ramclen/Poke-Server/master/${pokemon.image.thumbnail}`}
                  width="15px"
                />
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      )}

      {selectedPokemon && (
        <div>
          <h1>{selectedPokemon.name}</h1>
          <p>{selectedPokemon.description}</p>

          <div>
            {selectedPokemon.type.map((type) => (
              <>
                <span>{type}</span>
                <br />
              </>
            ))}
          </div>
          <br />

          <div>
            HP: {selectedPokemon.base.HP}
            <br />
            Attack: {selectedPokemon.base.Attack}
            <br />
            Defence: {selectedPokemon.base.Defense}
            <br />
            Sp Attack: {selectedPokemon.base["Sp. Attack"]}
            <br />
            Sp Defense: {selectedPokemon.base["Sp. Defense"]}
            <br />
            Speed: {selectedPokemon.base["Speed"]}
            <br />
          </div>

          <div>
            <img
              src={`https://raw.githubusercontent.com/ramclen/Poke-Server/master/${selectedPokemon.image.image}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
