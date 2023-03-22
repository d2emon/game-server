import gameAPI from '../game';
import playerAPI, {
  createPlayerAPI,
} from '../player';
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

const getCurrentGame = () => gameModel.load();

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

const playCard = (playerId, data) => {
  gamePlayerAPI.playCard(playerId, data);
  return gameModel.load();
}

const currentGameAPI = {
  getCurrentGame,
  startGame,

  startTurn,
  endTurn,
  playCardById,

  playCard,
};

export default currentGameAPI;
