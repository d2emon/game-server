import fractionCards from './card';

export const fractionId = 'zombies';
const {
  Base,
  Action,
  Minion,
} = fractionCards(fractionId);

export const bases = [
  Base({
    title: 'Торговый центр "Родос-Плаза"',
    power: 24,
    score: [0, 0, 0],
    // onCapture: () => {},
  }),
  Base({
    title: 'Кладбище Эванс-Сити',
    power: 20,
    score: [5, 3, 2],
    // onCapture: () => {},
  }),
];
  
export const cards = [
  Action({
    title: 'action 1',
  }),
  Action({
    title: 'action 2',
  }),
  Action({
    title: 'action 3',
  }),
  Action({
    title: 'action 4',
  }),
  Action({
    title: 'action 5',
  }),
  Action({
    title: 'action 6',
  }),
  Action({
    title: 'action 7',
  }),
  Action({
    title: 'action 8',
  }),
  Action({
    title: 'action 9',
  }),
  Action({
    title: 'action 10',
  }),

  Minion({
    title: 'minion 1',
  }),
  Minion({
    title: 'minion 2',
  }),
  Minion({
    title: 'minion 3',
  }),
  Minion({
    title: 'minion 4',
  }),
  Minion({
    title: 'minion 5',
  }),
  Minion({
    title: 'minion 6',
  }),
  Minion({
    title: 'minion 7',
  }),
  Minion({
    title: 'minion 8',
  }),
  Minion({
    title: 'minion 9',
  }),
  Minion({
    title: 'minion 10',
  }),
];
