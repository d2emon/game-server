import Database from '../helpers/database';

const database = Database();

const playerAction = (playerId, callback) => {
  const player = database.byId(playerId);
  return callback(player);
};

export const createPlayerAPI = {
  startTurn: (playerId) => playerAction(
    playerId,
    player => player.startTurn(),
  ),
  endTurn: (playerId) => playerAction(
    playerId,
    player => player.endTurn(),
  ),
  playCardById: (playerId, data) => playerAction(
    playerId,
    player => player.playCardById(data.cardId),
  ),
};

const playerAPI = {
  getPlayers: () => database.all(),
  setPlayers: (data) => {
    const {
      players,
    } = data;

    return database.fill(players);
  },
};

export default playerAPI;
