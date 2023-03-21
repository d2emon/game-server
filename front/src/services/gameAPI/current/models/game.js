import Deck from './deck';

const Game = (data) => {
  const {
    getGame,
    getBases,
    getPlayers,
    setPlayers,
  } = data;

  let game;
  let bases;
  let basesDeck;

  const settings = () => getGame();

  const load = () => ({
    game,
    bases,
    basesDeck: basesDeck ? basesDeck.serialize() : null,
    players: [...getPlayers()],
  });

  const start = async (players) => {
    await setPlayers({ players });

    const gameResponse = await getGame();
    game = gameResponse.data;

    const availableBases = getBases();
    basesDeck = Deck(availableBases);
    basesDeck.shuffle();

    bases = basesDeck
      .getCards(players.length + 1)
      .map((card) => ({
        ...card,
        minions: [],
        captured: false,
      }));

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
    start,
    load,
    checkBases,
  };
};

export default Game;
