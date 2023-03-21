const Database = (model) => {
  let ITEMS = [];
  
  const all = () => ITEMS
    .map(item => item.serialize());
  
  const byId = (itemId) => ITEMS[itemId];
  
  const fill = async (items) => {
    ITEMS = items.map(model);
    return [...ITEMS];
  };
  
  return {
    all,
    byId,
    fill,
  }
};

export default Database;
