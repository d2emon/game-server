import gameAPI from './game';
import playerAPI, {
  createPlayerAPI,
} from './player';
import Game from './models/game';
import Player from './models/player';

const gameModel = Game({
  getGame: gameAPI.getGame,
  getBases: gameAPI.getBases,
  getFractions: gameAPI.getFractions,

  getPlayers: playerAPI.getPlayers,
  setPlayers: playerAPI.setPlayers,
});
const playerModel = Player({
  game: gameModel,
});

const startGame = async (query) => {
  const {
    players,
  } = query;

  const data = await gameModel.start(players.map(
    playerModel.create,
  ));

  return {
    data,
  };
}

const gamePlayerAPI = createPlayerAPI;

const startTurn = async (playerId) => {
  gamePlayerAPI.startTurn(playerId);
  const data = gameModel.load();
  return {
    data,
  };
}

const endTurn = async (playerId) => {
  gamePlayerAPI.endTurn(playerId);
  const data = gameModel.load();
  return {
    data,
  };
}

const playCardById = async (playerId, query) => {
  gamePlayerAPI.playCardById(playerId, query);
  const data = gameModel.load();
  return {
    data,
  };
}

const currentGameAPI = {
  startGame,

  startTurn,
  endTurn,
  playCardById,
};

export default currentGameAPI;
