const Card = (data) => ({
    id: null,
    fractionId: null,
    title: '',
    type: null,
    onTurnStarts: () => {},
    onTurnEnds: () => {},
    ...data,
  });
  
  const Base = (data) => ({
    id: null,
    fractionId: null,
    power: 0,
    score: [0, 0, 0],
    title: '',
    type: 'base',
    onCapture: () => {},
  ...data,
  });
    
  const Action = (data) => Card({
    type: 'action',
    ...data,
  });
  
  const Minion = (data) => Card({
    power: 0,
    type: 'minion',
    onSummon: () => {},
    ...data,
  });
  
  const fractionCards = (fractionId) => ({
    Base: (data) => Base({ fractionId, ...data }),
    Action: (data) => Action({ fractionId, ...data }),
    Minion: (data) => Minion({ fractionId, ...data }),
  });
  
  export default fractionCards;
  