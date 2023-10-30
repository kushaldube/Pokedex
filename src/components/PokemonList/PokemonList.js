import classes from './PokemonList.module.css';
import PokemonCard from '../PokemonCard';
import DataContext from '../../store/data-context';

import { useContext } from 'react';

const PokemonList = props => {
  const ctx = useContext(DataContext);
  const bounds = ctx.pokemonRegionBounds;

  const data = [];
  for (let i = bounds.regionStartNumber; i <= bounds.regionEndNumber; i++) {
    data.push(
      <PokemonCard
        onShowModal={props.onShowModal}
        id={i}
        key={i}
      />
    );
  }

  return <main className={classes.PokemonList}>{data}</main>;
};

export default PokemonList;
