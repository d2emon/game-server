import * as GAME_DATA from './data/game';
import Deck from '../deck';

const GAME = {
  bases: Deck(GAME_DATA.bases),
  cards: Deck(GAME_DATA.cards),
  maxScore: GAME_DATA.maxScore,
};

const getBases = () => GAME.bases.serialize();
const getFractions = (fractions) => GAME
  .cards
  .serialize()
  .filter((card) => (fractions.indexOf(card.fractionId) >= 0));
const getGame = () => ({
  bases: GAME.bases.serialize(),
  cards: GAME.cards.serialize(),
  maxScore: GAME.maxScore,     
});

const gameAPI = {
  getBases,
  getFractions,
  getGame,
};

export default gameAPI;
