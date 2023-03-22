import Deck from './deck';

const Players = (data) => {
  const {
    setPlayers,
    getPlayers,
  } = data;

  let ITEMS = [];

  const all = () => {
    return [...getPlayers()];
  }

  const count = async () => ITEMS.length;

  const init = async (values) => {
    ITEMS = [...values];
    await setPlayers({ players: values });
  };

  return {
    all,
    count,
    init,
  }
}

const Game = (data) => {
  const {
    getGame,
    getBases,
    getFractions,
  } = data;
  const playersDb = Players(data);

  let game;
  let bases;
  let basesDeck;

  const settings = () => getGame();

  const load = () => ({
    game,
    bases,
    basesDeck: basesDeck ? basesDeck.serialize() : null,
    players: playersDb ? playersDb.all() : [],
  });

  const buildDeck = (fractions) => {
    const cards = getFractions(fractions);
    const deck = Deck(cards);
    deck.shuffle();
    return deck;
  };

  const start = async (players) => {
    await playersDb.init(players);

    const gameResponse = await getGame();
    game = gameResponse.data;

    const availableBases = getBases();
    basesDeck = Deck(availableBases);
    basesDeck.shuffle();

    const playersCount = await playersDb.count();
    bases = basesDeck
      .getCards(playersCount + 1)
      .map((card) => ({
        ...card,
        minions: [],
        captured: false,
      }));

    players.forEach(player => player.start());

    return load();
  };

  const checkBases = () => {
    bases.forEach((base) => {
      if (base.captured) {
        return;
      }

      const totalPower = base.minions.reduce(
        (power, minion) => power + minion.power,
        0,
      );
  
      if (totalPower >= base.power) {
        base.captured = true;
      }
  
      // checkWin
    });
  };
  
  return {
    settings,
    buildDeck,
    start,
    load,
    checkBases,
  };
};

export default Game;
