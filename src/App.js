import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const pokeNames = [];

  const getData = async () => {
    const data = await axios.get(
      "https://raw.githubusercontent.com/ramclen/Poke-Server/master/pokedex.json"
    );
    setData(
      data.data.map((entry) => {
        return <p> {entry.profile.name}</p>;
      })
    );
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
    console.log(data)
  };

  useEffect(() => {
  console.log(getData);
  }, []);

 
  return (
    <div className="App">
      <h1>pokimon</h1>
      <input type="search" width="150px" onChange={onSearchChange} />
      <button></button>
    </div>
  );
}

export default App;
