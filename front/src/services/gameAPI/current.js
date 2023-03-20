import GAME from './game';
import PLAYERS from './players';
import Deck from './deck';

const CURRENT_GAME = {
  bases: [],
  basesDeck: [],
};

const getCurrentGame = () => ({
  bases: CURRENT_GAME.bases,
  players: [...PLAYERS.getPlayers()],
  basesDeck: CURRENT_GAME.basesDeck.serialize(),
});

const addMinionToBase = (minion, base) => {
  base.minions.push(minion);
};

const checkBases = () => {
  CURRENT_GAME.bases.forEach((base) => {
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

const startGame = (data) => {
  const {
    players,
  } = data;

  PLAYERS.setPlayers({
    players: players.map((player, id) => ({
      id,
      ...player,
      addMinionToBase,
      checkBases,
    })),
  });

  CURRENT_GAME.basesDeck = Deck(GAME.getBases());
  CURRENT_GAME.basesDeck.shuffle();

  CURRENT_GAME.bases = CURRENT_GAME
    .basesDeck
    .getCards(players.length + 1)
    .map((card) => ({
      ...card,
      minions: [],
      captured: false,
    }));

  return getCurrentGame();
}

const currentGameAPI = {
  getCurrentGame,
  startGame,
};

export default currentGameAPI;
