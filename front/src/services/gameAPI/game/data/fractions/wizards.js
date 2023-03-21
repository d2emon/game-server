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
    text: 'Замешай все карты с руки в свою колоду и возьми пять карт. Можешь сыграть экстра-действие.',
    onPlay: {
      actions: [
        { action: 'returnFullHand' },
        { action: 'getCard', count: 5 },
        { action: 'playExtraAction', count: 1 },
      ],
    },
  }),
  Action({
    title: 'Жертва',
    text: 'Выбери приспешника. Возьми столько карт, какова его сила. Уничтожь этого приспешника.',
    onPlay: {
      target: 'minion',
      actions: [
        { action: 'getCard', count: 'targetPower' },
        { action: 'discardTarget' },
      ],
    },
  }),
  Action({
    title: 'Массовые чары',
    text: 'Раскрой верхнюю карту в колоде каждого соперника. Сыграй одно открытое действие как экстра-действие. '
      + 'Остальные карты верни наверх колод владельцев.',
    onPlay: {
      actions: [
        { action: 'showFromEveryDeck', count: 1 },
        { action: 'playExtraAction', source: 'open' },
      ],
    },
  }),
  Action({
    title: 'Петля времени',
    text: 'Сыграй два экстра-действия.',
    onPlay: {
      actions: [
        { action: 'playExtraAction', count: 2 },
      ],
    },
  }),
  Action({
    title: 'Портал',
    text: 'Раскрой пять верхних карт своей колоды. Забери на руку сколько угодно открытых приспешников. '
      + 'Остальные карты верни наверх своей колоды в любом порядке.',
    onPlay: {
      actions: [
        { action: 'showDeck', count: 5 },
        { action: 'getMinion' },
        { action: 'sortVisible' },
      ],
    },
  }),
  Action({
    title: 'Призывание',
    text: 'Сыграй экстра-приспешника.',
    onPlay: {
      actions: [
        { action: 'playExtraMinion', count: 1 },
      ],
    },
  }),
  Action({
    title: 'Призывание',
    text: 'Сыграй экстра-приспешника.',
    onPlay: {
      actions: [
        { action: 'playExtraMinion', count: 1 },
      ],
    },
  }),
  Action({
    title: 'Тайные знания',
    text: 'Возьми две карты.',
    onPlay: {
      actions: [
        { action: 'getCard', count: 2 },
      ],
    },
  }),
  Action({
    title: 'Тайные знания',
    text: 'Возьми две карты.',
    onPlay: {
      actions: [
        { action: 'getCard', count: 2 },
      ],
    },
  }),
  Action({
    title: 'Ясновидение',
    text: 'Выбери из своей колоды любое действие и покажи его всем игрокам. Забери его на руку и перетасуй колоду.',
    onPlay: {
      actions: [
        { action: 'findAction' },
        { action: 'showToAll' },
        { action: 'getSelected' },
        { action: 'shuffle' },
      ],
    },
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
