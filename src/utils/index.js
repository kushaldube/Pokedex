// This file contains utility functions that are used throughout
// the application.

// list of all the regions in the pokemon universe.
const REGIONS = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'alola',
  'galar',
  'hisui'
];

// returns a color that corresponds to the type of the pokemon
// provided.
//
// @param {string} type - the type of the pokemon
const getTypeColor = type => {
  switch (type.toLowerCase()) {
    case 'grass':
      return '#78c850';
    case 'poison':
      return '#a040a0';
    case 'fire':
      return '#f08030';
    case 'flying':
      return '#a890f0';
    case 'water':
      return '#6890f0';
    case 'bug':
      return '#a8b820';
    case 'normal':
      return '#a8a878';
    case 'electric':
      return '#f8d030';
    case 'ground':
      return '#e0c068';
    case 'fairy':
      return '#ee99ac';
    case 'fighting':
      return '#c03028';
    case 'psychic':
      return '#f85888';
    case 'rock':
      return '#b8a038';
    case 'steel':
      return '#b8b8d0';
    case 'ice':
      return '#98d8d8';
    case 'ghost':
      return '#705898';
    case 'dragon':
      return '#7038f8';
    default:
      return '#000';
  }
};

// converts hectograms to pounds
//
// @param {number} hectograms - the weight in hectograms
const hectogramsToPounds = hectograms => {
  return hectograms / 4.536;
};

// converts hectograms to kilograms
//
// @param {number} hectograms - the weight in hectograms
const hectogramsToKilograms = hectograms => {
  return hectograms / 10;
};

// converts decimeters to feet
//
// @param {number} decimeters - the height in decimeters
const decimetersToFeet = decimeters => {
  return decimeters / 3.048;
};

// converts decimeters to inches
//
// @param {number} decimeters - the height in decimeters
const decimetersToInches = decimeters => {
  return decimeters / 2.54;
};

// converts decimeters to feet and inches and returns an array
//
// @param {number} decimeters - the height in decimeters
const decimetersToFeetAndInches = decimeters => {
  const feet = Math.round(decimetersToFeet(decimeters));
  const inches = Math.round(decimetersToInches(decimeters));

  return [feet, inches];
};

// containing the feet and inches.
//
// @param {number} decimeters - the height in decimeters
const decimetersToMeters = decimeters => {
  return decimeters / 10;
};

// determines if the word provided is an honorific, if it is
// it returns true, otherwise it returns false.
// generational honorifics are titles like Mr., Mrs., Ms., Jr., and Miss.
//
// @param {string} word - the word to check
const isGenerationalHonorific = word => {
  word = word.toLowerCase();
  return (
    word === 'mr' ||
    word === 'mrs' ||
    word === 'ms' ||
    word === 'miss' ||
    word === 'jr'
  );
};

// capitalizes the first letter of the given text.
//
// @param {string} text - the text to capitalize
const titleize = text => {
  if (text === '') {
    return text;
  }
  return text
    .split('-')
    .map(word => {
      let titleizedWord = word[0].toUpperCase() + word.slice(1);
      if (isGenerationalHonorific(titleizedWord)) {
        titleizedWord += '.';
      }
      return titleizedWord;
    })
    .join(' ');
};

// formats the id of the pokemon to be 4 digits long.
//
// @param {number} id - the id of the pokemon
const formatId = id => `#${('' + id).padStart(4, '0')}`;

// this function normalizes the capture rate to a percentage.
// for the given capture rate, 255 is the highest capture rate, and
// 0 is the lowest.
//
// @param {number} captureRate - the capture rate of the pokemon
const normalizeCaptureRate = captureRate => {
  return ((captureRate / 255) * 100).toFixed(1);
};

export {
  REGIONS,
  getTypeColor,
  titleize,
  formatId,
  hectogramsToPounds,
  hectogramsToKilograms,
  decimetersToFeet,
  decimetersToMeters,
  decimetersToFeetAndInches,
  normalizeCaptureRate
};
