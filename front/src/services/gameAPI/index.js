import CURRENT_GAME from './current';
import GAME from './game';
import PLAYERS from './players';

const gameAPI = {
  getCurrentGame: CURRENT_GAME.getCurrentGame,
  getGame: GAME.getGame,
  getPlayers: PLAYERS.getPlayers,
  startGame: CURRENT_GAME.startGame,
  startTurn: (playerId) => {
    PLAYERS.startTurn(playerId);
    return CURRENT_GAME.getCurrentGame();
  },
  playCard: (playerId, data) => {
    PLAYERS.playCard(playerId, data);
    return CURRENT_GAME.getCurrentGame();
  },
  endTurn: (playerId) => {
    PLAYERS.endTurn(playerId);
    return CURRENT_GAME.getCurrentGame();
  },
};

export default gameAPI;
