import fractionCards from './card';

export const fractionId = 'wizards';
const {
  Base,
  Action,
  Minion,
} = fractionCards(fractionId);

export const bases = [
  Base({
    title: 'Школа волшебства',
    power: 20,
    score: [3, 2, 1],
    // onCapture: () => {},
  }),
  Base({
    title: 'Великая библиотека',
    power: 22,
    score: [4, 2, 1],
    // onCapture: () => {},
  }),
];
  
export const cards = [
  Action({
    title: 'Ветер перемен',
  }),
  Action({
    title: 'Жертва',
  }),
  Action({
    title: 'Массовые чары',
  }),
  Action({
    title: 'Петля времени',
  }),
  Action({
    title: 'Портал',
  }),
  Action({
    title: 'Призывание',
  }),
  Action({
    title: 'Призывание',
  }),
  Action({
    title: 'Тайные знания',
  }),
  Action({
    title: 'Тайные знания',
  }),
  Action({
    title: 'Ясновидение',
  }),

  Minion({
    title: 'Неофит',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .viewCards(1)
        .forEach((card) => {
          console.log(card);
          if (card.type !== 'action') {
            return;
          }
          player
            .deck
            .getCards(1)
            .forEach((card) => player.hand.push(card));
        });
    },
    */
  }),
  Minion({
    title: 'Неофит',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .viewCards(1)
        .forEach((card) => {
          console.log(card);
          if (card.type !== 'action') {
            return;
          }
          player
            .deck
            .getCards(1)
            .forEach((card) => player.hand.push(card));
        });
    },
    */
  }),
  Minion({
    title: 'Неофит',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .viewCards(1)
        .forEach((card) => {
          console.log(card);
          if (card.type !== 'action') {
            return;
          }
          player
            .deck
            .getCards(1)
            .forEach((card) => player.hand.push(card));
        });
    },
    */
  }),
  Minion({
    title: 'Неофит',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .viewCards(1)
        .forEach((card) => {
          console.log(card);
          if (card.type !== 'action') {
            return;
          }
          player
            .deck
            .getCards(1)
            .forEach((card) => player.hand.push(card));
        });
    },
    */
  }),
  Minion({
    title: 'Чародейка',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .getCards(1)
        .forEach((card) => player.hand.push(card));
    },
    */
  }),
  Minion({
    title: 'Чародейка',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .getCards(1)
        .forEach((card) => player.hand.push(card));
    },
    */
  }),
  Minion({
    title: 'Чародейка',
    power: 2,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      player
        .deck
        .getCards(1)
        .forEach((card) => player.hand.push(card));
    },
    */
  }),
  Minion({
    title: 'Хрономаг',
    power: 3,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      console.log(player);
      player.setCanPlayActions(player.getCanPlayActions() + 1);
    },
    */
  }),
  Minion({
    title: 'Хрономаг',
    power: 3,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      console.log(player);
      player.setCanPlayActions(player.getCanPlayActions() + 1);
    },
    */
  }),
  Minion({
    title: 'Архимаг',
    power: 4,
    /*
    onSummon: (data) => {
      const {
        player,
      } = data;
      console.log(player);
      player.setCanPlayActions(player.getCanPlayActions() + 1);
    },
    onTurnStarts: (data) => {
      const {
        player,
      } = data;
      player.setCanPlayActions(player.getCanPlayActions() + 1);
    },
    */
  }),
];
