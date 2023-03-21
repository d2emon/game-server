const Deck = (cards) => {
  let DATA = [...cards];
  
  const shuffle = () => {
    const count = DATA.length;
    for(let id1 = 0; id1 < count; id1 += 1) {
      const id2 = Math.floor(Math.random() * (count -1));
      const card =  DATA[id1];
      DATA[id1] =  DATA[id2];
      DATA[id2] = card;
    }
  };
  
  const viewCards = (count) => DATA.slice(0, count);
  
  const getCards = (count) => {
    const cards = viewCards(count);
    DATA = DATA.slice(count);
    return cards;
  };
  
  const removeCard = (id) => {
    DATA = DATA.filter(card => (card.id !== id));
  };
  
  return {
    serialize: () => [...DATA],
    getCards,
    removeCard,
    shuffle,
    viewCards,
  };
};
  
export default Deck;
