import ReactDOM from 'react-dom';
import classes from './PokemonModal.module.css';
import Backdrop from '../UI/Backdrop';
import Overlay from '../UI/Overlay';
import Card from '../UI/Card';
import PokemonStatBar from '../PokemonStatBar';
import PokemonEvolutionChain from '../PokemonEvolutionChain';
import DataContext from '../../store/data-context';

import { useState, useEffect, useContext } from 'react';
import {
  titleize,
  formatId,
  decimetersToMeters,
  decimetersToFeetAndInches,
  hectogramsToPounds,
  hectogramsToKilograms,
  normalizeCaptureRate
} from '../../utils';

const portalElement = document.getElementById('overlays');

const generateTableRow = (pokemonId, label, ...args) => {
  return (
    <tr>
      <td className={classes['row-label']}>{label}</td>
      {args.map(arg => (
        <td
          key={`${pokemonId}-${arg}`}
          className={classes['row-data']}>
          {arg}
        </td>
      ))}
    </tr>
  );
};

const computeHeightText = decimeters => {
  const [feet, inches] = decimetersToFeetAndInches(decimeters);
  return `${feet}' ${inches}" (${decimetersToMeters(decimeters)}m)`;
};

const computeWeightText = hectograms => {
  const pounds = hectogramsToPounds(hectograms).toFixed(1);
  const kilograms = hectogramsToKilograms(hectograms).toFixed(1);
  return `${pounds} lbs (${kilograms} kg)`;
};

const PokemonModal = props => {
  const data = props.data;
  const ctx = useContext(DataContext);

  const speciesData = ctx.pokemonSpeciesData(data.id);
  const evolutionData = ctx.pokemonEvolutionData(data.name);
  const showEvolutionsData = evolutionData?.length > 1;

  const [showShinySprite, setShowShinySprite] = useState(false);

  useEffect(() => {
    if (evolutionData) {
      console.log('cache hit! - /evolution-chain');
    } else if (speciesData) {
      if (speciesData.evolves_from_species?.name === 'eevee') {
        ctx.insertPokemonEvolutionsData(['eevee', data.name]);
      } else {
        fetch(speciesData?.evolution_chain.url)
          .then(response => response.json())
          .then(data => {
            console.log('fetched data from API! - /evolution-chain');
            const evolutions = [];
            let chain = data.chain;
            while (chain) {
              if (chain.species.name === 'eevee') {
                break;
              }
              evolutions.push(chain.species.name);
              chain = chain.evolves_to[0];
            }
            ctx.insertPokemonEvolutionsData(evolutions);
          })
          .catch(console.log);
      }
    }
  }, [speciesData]);

  useEffect(() => {
    if (speciesData) {
      console.log('cache hit! - /pokemon-species');
    } else {
      fetch(data.species.url)
        .then(response => response.json())
        .then(data => {
          console.log('fetched data from API! - /pokemon-species');
          ctx.insertPokemonSpeciesData(data);
        })
        .catch(console.log);
    }
  }, [data]);

  let imageUrl = showShinySprite
    ? data.sprites.other['official-artwork'].front_shiny
    : data.sprites.other['official-artwork'].front_default;
  if (!imageUrl) {
    imageUrl = data.sprites.other['official-artwork'].front_default;
  }
  const abilities = data.abilities
    .map(ability => titleize(ability.ability.name))
    .join(', ');
  const types = data.types.map(type => titleize(type.type.name)).join(', ');
  const stats = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    'special-attack': data.stats[3].base_stat,
    'special-defense': data.stats[4].base_stat,
    speed: data.stats[5].base_stat
  };
  const totalStats = Object.values(stats).reduce((a, b) => a + b, 0);

  let color = null;
  let habitat = null;
  let shape = null;
  let captureRate = null;
  let japaneseName = null;
  let romajiName = null;
  let description = null;
  if (speciesData) {
    color = speciesData.color.name;
    habitat = speciesData.habitat?.name;
    captureRate = normalizeCaptureRate(speciesData.capture_rate);
    shape = speciesData.shape?.name;
    japaneseName = speciesData.names.find(
      entry => entry.language.name === 'ja'
    ).name;
    romajiName = speciesData.names.find(
      entry => entry.language.name === 'roomaji'
    ).name;
    description = speciesData?.flavor_text_entries
      ?.filter(entry => entry.language.name === 'en')
      ?.pop()?.flavor_text;
  }

  const modalOverlayContent = (
    <>
      <div className={classes.sprite}>
        <p className={classes['pokemon-id']}>{formatId(data.id)}</p>
        <img
          onClick={() => setShowShinySprite(previousState => !previousState)}
          className={classes['pokemon-sprite']}
          src={imageUrl}
          alt={`${data.name} sprite`}
        />
        <h1>{titleize(data.species.name)}</h1>
        {japaneseName && (
          <h2 className={classes['japanese-name']}>{japaneseName}</h2>
        )}
        {romajiName && <p className={classes['romaji-name']}>{romajiName}</p>}
      </div>
      <div className={classes.information}>
        <section className={classes.section}>
          <h3 className={classes['section-header']}>About</h3>
          <table>
            <tbody>
              {generateTableRow(
                data.id,
                'Species',
                titleize(data.species.name)
              )}
              {color && generateTableRow(data.id, 'Color', titleize(color))}
              {habitat &&
                generateTableRow(data.id, 'Habitat', titleize(habitat))}
              {shape && generateTableRow(data.id, 'Shape', titleize(shape))}
              {generateTableRow(data.id, 'Types', types)}
              {generateTableRow(data.id, 'Abilities', abilities)}
              {generateTableRow(
                data.id,
                'Height',
                computeHeightText(data.height)
              )}
              {generateTableRow(
                data.id,
                'Weight',
                computeWeightText(data.weight)
              )}
              {captureRate &&
                generateTableRow(data.id, 'Capture Rate', `${captureRate}%`)}
            </tbody>
          </table>
        </section>
        <section className={classes.section}>
          <h3 className={classes['section-header']}>Base Stats</h3>
          <table>
            <tbody>
              {generateTableRow(
                data.id,
                'HP',
                stats.hp,
                <PokemonStatBar value={stats.hp} />
              )}
              {generateTableRow(
                data.id,
                'Attack',
                stats.attack,
                <PokemonStatBar value={stats.attack} />
              )}
              {generateTableRow(
                data.id,
                'Defense',
                stats.defense,
                <PokemonStatBar value={stats.defense} />
              )}
              {generateTableRow(
                data.id,
                'Special Attack',
                stats['special-attack'],
                <PokemonStatBar value={stats['special-attack']} />
              )}
              {generateTableRow(
                data.id,
                'Special Defense',
                stats['special-defense'],
                <PokemonStatBar value={stats['special-defense']} />
              )}
              {generateTableRow(
                data.id,
                'Speed',
                stats.speed,
                <PokemonStatBar value={stats.speed} />
              )}
              {generateTableRow(
                data.id,
                'Total',
                <p>
                  <strong>{totalStats}</strong>
                </p>
              )}
            </tbody>
          </table>
        </section>
        {description && (
          <section className={classes.section}>
            <p className={classes.description}>{description}</p>
          </section>
        )}
        {showEvolutionsData && (
          <section className={classes.section}>
            <h3 className={classes['section-header']}>Evolutions</h3>
            {
              <PokemonEvolutionChain
                onModalSwap={props.onModalSwap}
                evolutions={evolutionData}
              />
            }
          </section>
        )}
      </div>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Overlay>
          <Card className={classes.PokemonModal}>{modalOverlayContent}</Card>
        </Overlay>,
        portalElement
      )}
    </>
  );
};

export default PokemonModal;
