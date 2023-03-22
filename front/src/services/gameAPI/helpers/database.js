const Database = () => {
  let ITEMS = [];
  
  const all = () => ITEMS
    .map(item => item.serialize());
  
  const byId = (itemId) => ITEMS[itemId];
  
  const fill = async (items) => {
    ITEMS = [...items];
    return [...ITEMS];
  };
  
  return {
    all,
    byId,
    fill,
  }
};

export default Database;
