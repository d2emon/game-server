import gameAPI from '../../game';
import Deck from '../../current/models/deck';
import Database from '../../helpers/database';

const Player = (player) => {
    const {
      id,
      fractions,
      addMinionToBase,
      checkBases,
    } = player;

    const getCurrentPlayer = () => database.byId(id);

    const cards = gameAPI.getFractions(fractions);
    const deck = Deck(cards);
    deck.shuffle();
  
    let discard = [];
  
    let hand = deck.getCards(5);
    const getActions = () => hand.filter((card) => (card.type === 'action'));
    const getMinions = () => hand.filter((card) => (card.type === 'minion'));
  
    if (!hand.some((card) => (card.type === 'minion'))) {
      discard = [
        ...discard,
        ...hand,
      ];
      hand = deck.getCards(5);
    }
  
    let inGame = [];
  
    let canPlayActions = 0;
    const getCanPlayActions = () => canPlayActions;
    const setCanPlayActions = (value) => {
      canPlayActions = value;
    }
  
    let canPlayMinions = 0;
    const getCanPlayMinions = () => canPlayMinions;
    const setCanPlayMinions = (value) => {
      canPlayMinions = value;
    }
  
    const startTurn = () => {
      const currentPlayer = getCurrentPlayer();
  
      setCanPlayActions(1);
      setCanPlayMinions(1);
      inGame.forEach((card) => {
        console.log('ON TURN START', card, { player: currentPlayer });
        /*
        card.onTurnStarts({
          player: currentPlayer,
        });
        */
      });
    };
  
    const endTurn = () => {
      const currentPlayer = getCurrentPlayer();
  
      checkBases();
  
      deck
        .getCards(2)
        .forEach((card) => hand.push(card));
  
      // check for 10 cards
        
      inGame.forEach((card) => {
        console.log('ON TURN END', card, { player: currentPlayer });
        /*
        card.onTurnEnds({
          player: currentPlayer,
        });
        */
      });
    };
  
    const playCard = (data) => {
      const {
        card,
        target,
      } = data;

      const currentPlayer = getCurrentPlayer();
  
      hand = hand.filter(item => (item.id !== card.id));
  
      if ((card.type === 'action') && (canPlayActions > 0)) {
        canPlayActions -= 1;
      }
  
      if ((card.type === 'minion') && (canPlayMinions > 0)) {
        canPlayMinions -= 1;
        addMinionToBase(card, target);
        inGame.push(card);
        console.log(canPlayActions);
        console.log('ON SUMMON', card, { player: currentPlayer });
        /*
        card.onSummon({
          player: currentPlayer,
        });
        */
        console.log(canPlayActions);
      }
    };
  
    return {
      serialize: () => ({
        id,
        canPlayActions: getCanPlayActions(),
        canPlayMinions: getCanPlayMinions(),
        deck: deck.serialize(),
        discard: [...discard],
        fractions: [...fractions],
        hand: [...hand],
        actions: getActions(),
        minions: getMinions(),
        inGame: [...inGame],
      }),
      startTurn,
      playCard,
      endTurn,
  
      getCanPlayActions,
      setCanPlayActions,
  
      getCanPlayMinions,
      setCanPlayMinions,
  
      deck,
      hand,
    }
};

const database = Database(Player);

export const getPlayer = (playerId) => database.byId(playerId);
export const getPlayers = () => database.all();
export const setPlayers = (players) => database.fill(players);

export default Player;
