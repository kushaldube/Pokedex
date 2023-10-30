import React from 'react';

const DataContext = React.createContext({
  data: {},
  region: 'kanto',
  pokemonRegionBounds: { regionStartNumber: 1, regionEndNumber: 151 },
  pokemonDataFromId: id => {},
  pokemonDataFromName: name => {},
  pokemonEvolutionData: name => {},
  pokemonSpeciesData: id => {},
  updateRegion: region => {},
  insertPokemonData: data => {},
  insertPokemonSpeciesData: data => {},
  insertPokemonEvolutionsData: data => {}
});

export default DataContext;
