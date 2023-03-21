import * as dinos from './dinos';
import * as ninjas from './ninjas';
// import * as pirates from './pirates';
import * as wizards from './wizards';
import * as zombies from './zombies';

const enumerate = (data) => data.map((item, id) => ({
  ...item,
  id: id + 1,
}));

const fractionsData = [
  dinos,
  ninjas,
  // pirates,
  wizards,
  zombies,
];
const data = fractionsData.reduce(
  (result, fraction) => ({
    bases: [
      ...result.bases,
      ...fraction.bases,
    ],
    cards: [
      ...result.cards,
      ...fraction.cards,
    ],
  }),
  {
    bases: [],
    cards: [],
  },
);

const bases = enumerate(data.bases);
const cards = enumerate(data.cards);

const fractions = {
  bases,
  cards,
};

export default fractions;
