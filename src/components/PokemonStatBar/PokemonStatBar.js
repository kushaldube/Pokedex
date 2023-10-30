import classes from './PokemonStatBar.module.css';

const MAX = 255; // max stat value
const PokemonStatBar = props => {
  const percentage = (props.value / MAX) * 100;
  return (
    <div className={classes.PokemonStatBar}>
      <div
        className={classes.fill}
        data-value={props.value}
        style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default PokemonStatBar;
