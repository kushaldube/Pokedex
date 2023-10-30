import classes from './PokemonEvolutionChain.module.css';
import PokemonEvolutionChainItem from '../PokemonEvolutionChainItem';
import { Fragment } from 'react';

const PokemonEvolutionChain = props => {
  const evolutionItemComponents = props.evolutions.map((evolution, index) => (
    <PokemonEvolutionChainItem
      name={evolution}
      key={evolution}
      onModalSwap={props.onModalSwap}
      index={index}
    />
  ));
  const content = evolutionItemComponents.map((component, index) => {
    const showRightArrow = index < evolutionItemComponents.length - 1;
    return (
      <Fragment key={index}>
        {component}
        {showRightArrow && <div className={classes['right-arrow']}></div>}
      </Fragment>
    );
  });

  return <div className={classes.PokemonEvolutionChain}>{content}</div>;
};

export default PokemonEvolutionChain;
