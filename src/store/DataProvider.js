import { useEffect, useReducer, useState } from 'react';
import DataContext from './data-context';

/* API Response Cache Structure
{
  regionData: {
    REGION_NAME: {
      POKEMON_ID: {
        POKEMON_NAME: "",
        // /pokemon/{id or name}
        POKEMON_DATA: { ... },
        // /pokemon-species/{id or name}
        POKEMON_SPECIES_DATA: { ... },
      },
      ...
    },
    ...
  },
  evolutionChains: [
    [POKEMON_NAME, POKEMON_NAME, ...],
    ...
  ]
}
*/
const initialDataState = {
  regionData: {
    kanto: {},
    johto: {},
    hoenn: {},
    sinnoh: {},
    unova: {},
    kalos: {},
    alola: {},
    galar: {},
    hisui: {}
  },
  evolutionChains: []
};

const dataReducer = (state, action) => {
  const region = action.region;
  const data = action.data;
  let updatedState = { ...state };

  switch (action.type) {
    case 'INSERT_POKEMON_DATA':
      updatedState.regionData[region][data.id] = {};
      updatedState.regionData[region][data.id].name = data.species.name;
      updatedState.regionData[region][data.id].pokemon_data = data;

      return updatedState;
    case 'INSERT_POKEMON_SPECIES_DATA':
      updatedState.regionData[region][data.id].pokemon_species_data = data;
      return updatedState;
    case 'INSERT_POKEMON_EVOLUTION_DATA':
      updatedState.evolutionChains.push(data);
      return updatedState;
  }

  return initialDataState;
};

const DataProvider = props => {
  const [data, dispatch] = useReducer(dataReducer, initialDataState);
  const [region, setRegion] = useState('kanto');
  const [pokemonRegionBounds, setPokemonRegionBounds] = useState({
    regionStartNumber: 1,
    regionEndNumber: 151
  });

  useEffect(() => {
    switch (region) {
      case 'kanto':
        setPokemonRegionBounds({
          regionStartNumber: 1,
          regionEndNumber: 151
        });
        break;
      case 'johto':
        setPokemonRegionBounds({
          regionStartNumber: 152,
          regionEndNumber: 251
        });
        break;
      case 'hoenn':
        setPokemonRegionBounds({
          regionStartNumber: 252,
          regionEndNumber: 386
        });
        break;
      case 'sinnoh':
        setPokemonRegionBounds({
          regionStartNumber: 387,
          regionEndNumber: 493
        });
        break;
      case 'unova':
        setPokemonRegionBounds({
          regionStartNumber: 494,
          regionEndNumber: 649
        });
        break;
      case 'kalos':
        setPokemonRegionBounds({
          regionStartNumber: 650,
          regionEndNumber: 721
        });
        break;
      case 'alola':
        setPokemonRegionBounds({
          regionStartNumber: 722,
          regionEndNumber: 809
        });
        break;
      case 'galar':
        setPokemonRegionBounds({
          regionStartNumber: 810,
          regionEndNumber: 898
        });
        break;
      case 'hisui':
        setPokemonRegionBounds({
          regionStartNumber: 899,
          regionEndNumber: 1010
        });
        break;
    }
  }, [region]);

  const regionChangeHandler = region => {
    setRegion(region);
  };

  const insertPokemonDataHandler = data => {
    dispatch({ type: 'INSERT_POKEMON_DATA', region: region, data: data });
  };

  const insertPokemonSpeciesDataHandler = data => {
    dispatch({
      type: 'INSERT_POKEMON_SPECIES_DATA',
      region: getRegionFromPokemonId(data.id),
      data: data
    });
  };

  const getRegionFromPokemonId = id => {
    if (id >= 1 && id <= 151) {
      return 'kanto';
    } else if (id >= 152 && id <= 251) {
      return 'johto';
    } else if (id >= 252 && id <= 386) {
      return 'hoenn';
    } else if (id >= 387 && id <= 493) {
      return 'sinnoh';
    } else if (id >= 494 && id <= 649) {
      return 'unova';
    } else if (id >= 650 && id <= 721) {
      return 'kalos';
    } else if (id >= 722 && id <= 809) {
      return 'alola';
    } else if (id >= 810 && id <= 898) {
      return 'galar';
    } else if (id >= 899 && id <= 1010) {
      return 'hisui';
    }
    return null; // should never happen
  };

  const insertPokemonEvolutionsDataHandler = data => {
    dispatch({ type: 'INSERT_POKEMON_EVOLUTION_DATA', data: data });
  };

  const evolutionChainForPokemon = name => {
    if (name === 'eevee') {
      return [];
    }
    return data.evolutionChains.find(chain => chain.includes(name));
  };

  const regionData = data.regionData;

  const find = value => {
    // if key is a number, search by id, else search by name
    const isKey = +value ? true : false;

    for (const regionName in regionData) {
      const region = regionData[regionName];
      for (const pokemonId in region) {
        if (isKey) {
          if (+pokemonId === +value) {
            return region[pokemonId];
          }
        } else {
          if (region[pokemonId].name === value) {
            return region[pokemonId];
          }
        }
      }
    }
    return null;
  };

  const pokemonDataFromId = id => {
    return find(id)?.pokemon_data || null;
  };

  const pokemonDataFromName = name => {
    return find(name)?.pokemon_data || null;
  };

  const speciesDataFromId = id => {
    return find(id)?.pokemon_species_data || null;
  };

  const ctx = {
    data: data,
    region: region,
    pokemonRegionBounds: pokemonRegionBounds,
    updateRegion: regionChangeHandler,
    pokemonDataFromId: pokemonDataFromId,
    pokemonDataFromName: pokemonDataFromName,
    pokemonEvolutionData: evolutionChainForPokemon,
    pokemonSpeciesData: speciesDataFromId,
    insertPokemonData: insertPokemonDataHandler,
    insertPokemonSpeciesData: insertPokemonSpeciesDataHandler,
    insertPokemonEvolutionsData: insertPokemonEvolutionsDataHandler
  };

  return (
    <DataContext.Provider value={ctx}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
