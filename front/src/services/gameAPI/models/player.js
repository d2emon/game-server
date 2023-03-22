const PlayerModel = (values) => {
  const {
    id,
    fractions,

    buildDeck,
    checkBases,
    load,
  } = values;

  const cardActions = {
    discardTarget: (payload) => {
      console.log('DISCARD TARGET', payload);
    },
    findAction: (payload) => {
      console.log('FIND ACTION', payload);
    },
    getCard: (payload) => {
      console.log('GET CARD', payload);
    },
    getMinion: (payload) => {
      console.log('GET MINION', payload);
    },
    getSelected: (payload) => {
      console.log('GET MINION', payload);
    },
    playExtraAction: (payload) => {
      console.log('PLAY EXTRA ACTION', payload);
    },
    playExtraMinion: (payload) => {
      console.log('PLAY EXTRA MINION', payload);
    },
    returnFullHand: (payload) => {
      console.log('RETURN FULL HAND', payload);
    },
    showDeck: (payload) => {
      console.log('SHOW DECK', payload);
    },
    showFromEveryDeck: (payload) => {
      console.log('SHOW FROM EVERY DECK', payload);
    },
    showToAll: (payload) => {
      console.log('SHOW TO ALL', payload);
    },
    shuffle: (payload) => {
      console.log('SHUFFLE', payload);
    },
    sortVisible: (payload) => {
      console.log('SORT VISIBLE', payload);
    },
  };

  let deck = null;
  let discard = [];
  let hand = [];
  let inGame = [];
  
  let canPlayActions = 0;
  let canPlayMinions = 0;

  const serialize = () => ({
    id,
    fractions,

    deck: deck.serialize(),
    discard,
    hand,
    inGame,

    canPlayActions,
    canPlayMinions,

    actions: hand.filter((card) => (card.type === 'action')),
    minions: hand.filter((card) => (card.type === 'minion')),
  });

  const addMinionToBase = (minion, base) => {
    base.minions.push(minion);
  };

  const start = () => {
    deck = buildDeck(fractions);
    discard = [];
    hand = deck.getCards(5);
    inGame = [];

    if (!hand.some((card) => (card.type === 'minion'))) {
      discard = [
        ...discard,
        ...hand,
      ];
      hand = deck.getCards(5);
    }

    return serialize();
  };

  const startTurn = () => {
    canPlayActions = 1;
    canPlayMinions = 1;

    const player = serialize();
    inGame.forEach((card) => {
      console.log('ON TURN START', {
        card,
        player,
      });
    });

    return serialize();
  };

  const endTurn = () => {
    checkBases();
 
    const newCards = deck.getCards(2);
    hand = [
      ...hand,
      ...newCards,
    ];

    if (hand.length > 10) {
      console.log('DISCARD EXTRA CARDS');
    }

    const player = serialize();
    inGame.forEach((card) => {
      console.log('ON TURN END', {
        card,
        player,
      });
    });

    return serialize();
  };

  const handleCardOnPlay = (card) => {
    if (!card.onPlay) {
      return;
    }

    console.log('TARGET:', card.onPlay.target);

    const actions = card.onPlay.actions || [];
    actions.forEach((payload) => {
      const {
        action,
      } = payload;

      const handler = cardActions[action];
      if (handler) {
        handler(payload);
      } else {
        console.log('!!!UNKNOWN:', action, payload);
      }
    });
  }

  const playActionCard = (card) => {
    console.log('ACTION CARD:', card);
    if (canPlayActions <= 0) {
      return;
    }

    canPlayActions -= 1;

    handleCardOnPlay(card);
  };

  const playMinionCard = (card) => {
    console.log('MINION CARD:', card);
    if (canPlayMinions <= 0) {
      return;
    }

    canPlayMinions -= 1;

    /*
    addMinionToBase(card, target);
    inGame.push(card);
    console.log(canPlayActions);
    console.log('ON SUMMON', card, { player: currentPlayer });
    */

    handleCardOnPlay(card);
  };

  const playCardById = (cardId) => {
    if (!cardId) {
      return;
    }

    const card = hand.find((item) => (item.id === cardId));
    console.log('CARD:', card);
    
    if (card.type === 'action') {
      playActionCard(card);
    }
    if (card.type === 'minion') {
      playMinionCard(card);
    }

    hand = hand.filter(item => (item.id !== cardId));  
  };

  return {
    // id,
    // fractions,

    deck,
    // discard,
    hand,
    // inGame,

    cardActions,

    addMinionToBase,

    checkBases,
    load,

    serialize,

    start,
    startTurn,
    endTurn,
    playCardById,
  };
};

const Player = (data) => {
  const {
    game,
  } = data;
  
  const create = (player, id) => PlayerModel({
    id,
    fractions: [],

    // deck: null,
    // discard: [],
    // hand: [],
    // inGame: [],

    ...player,

    // cardActions,

    // addMinionToBase,
    // beforeStart,

    buildDeck: game.buildDeck,
    checkBases: game.checkBases,
    loadGame: game.load,
  });
  
  return {
    create,
  };
};

export default Player;
