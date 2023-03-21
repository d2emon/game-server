import currentGameAPI from './current';
import PLAYERS from './players';

const gameAPI = {
  ...currentGameAPI,
  // getGame: CURRENT_GAME.getGame,
  // getCurrentGame: CURRENT_GAME.getCurrentGame,
  getPlayers: PLAYERS.getPlayers,
  // startGame: CURRENT_GAME.startGame,
  startTurn: (playerId) => {
    PLAYERS.startTurn(playerId);
    return currentGameAPI.getCurrentGame();
  },
  playCard: (playerId, data) => {
    PLAYERS.playCard(playerId, data);
    return currentGameAPI.getCurrentGame();
  },
  endTurn: (playerId) => {
    PLAYERS.endTurn(playerId);
    return currentGameAPI.getCurrentGame();
  },
};

export default gameAPI;
