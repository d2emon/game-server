import {
  getPlayer,
  getPlayers,
  setPlayers,
} from './models/player';

const playerAction = (playerId, callback) => {
  const player = getPlayer(playerId);
  return callback(player);
};

export const createPlayerAPI = {
  startTurn: (playerId) => playerAction(
    playerId,
    player => player.startTurn(),
  ),
  playCardById: (playerId, data) => playerAction(
    playerId,
    player => player.playCardById(data),
  ),
  playCard: (playerId, data) => playerAction(
    playerId,
    player => player.playCard(data),
  ),
  endTurn: (playerId) => playerAction(
    playerId,
    player => player.endTurn(),
  ),
};

const playerAPI = {
  getPlayers,
  setPlayers: (data) => {
    const {
      players,
    } = data;

    return setPlayers(players);
  },
};

export default playerAPI;
