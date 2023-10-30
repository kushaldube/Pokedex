import classes from './App.module.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal/PokemonModal';
import DataProvider from './store/DataProvider';

import { useState } from 'react';

const App = () => {
  const [modalData, setModalData] = useState({});

  const showModalHandler = pokemonData => {
    setModalData(pokemonData);
  };

  const dismissModalHandler = () => {
    setModalData({});
  };

  const showModal = Object.keys(modalData).length > 0;

  return (
    <DataProvider>
      <div className={classes.App}>
        {showModal && (
          <PokemonModal
            data={modalData}
            onClose={dismissModalHandler}
            onModalSwap={showModalHandler}
          />
        )}
        <Header />
        <PokemonList onShowModal={showModalHandler} />
      </div>
    </DataProvider>
  );
};

export default App;
