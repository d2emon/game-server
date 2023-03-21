const Player = (data) => {
  const {
    game,
  } = data;

  const addMinionToBase = (minion, base) => {
    base.minions.push(minion);
  };
  
  const create = (player, id) => ({
    id,
    ...player,
    addMinionToBase,
    checkBases: game.checkBases,
    loadGame: game.load,
  });
  
  return {
    create,
  };
};

export default Player;
