import classes from './PokemonCard.module.css';
import Card from '../UI/Card';
import DataContext from '../../store/data-context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useState, useEffect, useContext } from 'react';
import { titleize, formatId, getTypeColor } from '../../utils';

const PokemonCard = props => {
  const ctx = useContext(DataContext);
  const data = ctx.pokemonDataFromId(props.id);

  const [isLoading, setIsLoading] = useState(!data);
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [image_url, setImageUrl] = useState('');

  const setStateFromData = pokemonData => {
    setName(pokemonData.species.name);
    setTypes(pokemonData.types.map(type => type.type.name));
    setImageUrl(pokemonData.sprites.other['official-artwork'].front_default);
  };

  useEffect(() => {
    if (data) {
      console.log('cache hit! - /pokemon');
      setStateFromData(data);
      setIsLoading(false);
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
        .then(response => response.json())
        .then(data => {
          console.log('fetched data from API! - /pokemon');
          ctx.insertPokemonData(data);
          setStateFromData(data);
          setIsLoading(false);
        })
        .catch(console.log);
    }
  }, []);

  const typeCards = types.map(type => (
    <p
      className={classes.type}
      style={{ backgroundColor: getTypeColor(type) }}
      key={type}>
      {type}
    </p>
  ));

  return (
    <Card
      className={classes.PokemonCard}
      onClick={() => {
        props.onShowModal(data);
      }}>
      <div className={classes.information}>
        <p>{isLoading ? <Skeleton width={'25%'} /> : formatId(props.id)}</p>
        <h2>{isLoading ? <Skeleton width={'75%'} /> : titleize(name)}</h2>
        <div className={classes.types}>
          {isLoading ? (
            <Skeleton
              width={100}
              height={25}
            />
          ) : (
            typeCards
          )}
        </div>
      </div>
      <div className={isLoading ? classes['sprite--skeleton'] : classes.sprite}>
        {isLoading ? (
          <Skeleton
            width={115}
            height={115}
            circle={true}
          />
        ) : (
          <img
            className={classes['pokemon-sprite']}
            src={image_url}
            alt={`${name} sprite`}
            loading='lazy'
          />
        )}
      </div>
    </Card>
  );
};

export default PokemonCard;
