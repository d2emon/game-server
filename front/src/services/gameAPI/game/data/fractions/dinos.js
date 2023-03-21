import fractionCards from './card';

export const fractionId = 'dinos';
const {
  Base,
  Action,
  Minion,
} = fractionCards(fractionId);

export const bases = [
  Base({
    title: 'Смоляные ямы',
    power: 16,
    score: [4, 3, 2],
    // onCapture: () => {},
  }),
  Base({
    title: 'Оазис в джунглях',
    power: 12,
    score: [2, 0, 0],
    // onCapture: () => {},
  }),
];
  
export const cards = [
  Action({
    title: 'Буйство',
  }),
  Action({
    title: 'Вой',
  }),
  Action({
    title: 'Вой',
  }),
  Action({
    title: 'Выживает сильнейший',
  }),
  Action({
    title: 'Естественный отбор',
  }),
  Action({
    title: 'Заповедник',
  }),
  Action({
    title: 'Зубы, когти, два ствола',
  }),
  Action({
    title: 'Модернизация',
  }),
  Action({
    title: 'Улучшение',
  }),
  Action({
    title: 'Улучшение',
  }),

  Minion({
    title: 'Боевой Раптор',
    power: 2,
  }),
  Minion({
    title: 'Боевой Раптор',
    power: 2,
  }),
  Minion({
    title: 'Боевой Раптор',
    power: 2,
  }),
  Minion({
    title: 'Боевой Раптор',
    power: 2,
  }),
  Minion({
    title: 'Бронезавр',
    power: 3,
  }),
  Minion({
    title: 'Бронезавр',
    power: 3,
  }),
  Minion({
    title: 'Бронезавр',
    power: 3,
  }),
  Minion({
    title: 'Лазератопс',
    power: 4,
  }),
  Minion({
    title: 'Лазератопс',
    power: 4,
  }),
  Minion({
    title: 'Царь-Ящер',
    power: 7,
  }),
];
