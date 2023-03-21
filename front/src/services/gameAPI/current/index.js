import gameAPI from '../game';
import playersAPI from '../players';
import Game from './models/game';
import Player from './models/player';

const gameModel = Game({
  getGame: gameAPI.getGame,
  getBases: gameAPI.getBases,
  getPlayers: playersAPI.getPlayers,
  setPlayers: playersAPI.setPlayers,
});
const playerModel = Player({
  game: gameModel,
});

const getGame = () => gameModel.settings();
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

const currentGameAPI = {
  getGame,
  getCurrentGame,
  startGame,
};

export default currentGameAPI;
