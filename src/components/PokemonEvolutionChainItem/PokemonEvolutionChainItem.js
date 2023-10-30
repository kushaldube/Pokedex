import classes from './PokemonEvolutionChainItem.module.css';
import DataContext from '../../store/data-context';

import { titleize } from '../../utils';
import { useContext } from 'react';

const PokemonEvolutionChainItem = props => {
  const ctx = useContext(DataContext);
  const data = ctx.pokemonDataFromName(props.name);
  const spriteUrl = data?.sprites?.front_default;

  // calculate animation delay based on index
  const delay = `${props.index * 0.2}s`;

  return (
    <div className={classes.PokemonEvolutionChainItem}>
      {spriteUrl && (
        <img
          className={classes['pokemon-sprite']}
          src={spriteUrl}
          alt={props.name}
          onClick={() => props.onModalSwap(data)}
          style={{ animationDelay: delay }}
        />
      )}
      <p className={classes['sprite-label']}>{titleize(props.name)}</p>
    </div>
  );
};

export default PokemonEvolutionChainItem;
