import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameAPI from '../services/gameAPI';

const initialState = {
  basesData: [],
  cardsData: [],
  maxScore: 0,
  hasStarted: false,
  bases: [],
  players: [],
  error: null,
};

export const startGame = createAsyncThunk(
  'game/startGame',
  async (data) => {
    const response = await gameAPI.startGame(data);
    console.log('/api/v1/game/start', response);
    return response.data;
  },
);
    
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateGame: (state, action) => ({
      ...state,
      players: action.payload.players,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state) => ({
        ...state,
        hasStarted: false,
        bases: [],
        players: [],
      }))
      .addCase(startGame.fulfilled, (state, action) => ({
        ...state,
        basesData: action.payload.game.bases,
        cardsData: action.payload.game.cards,
        maxScore: action.payload.game.maxScore,
        hasStarted: true,
        bases: action.payload.bases,
        players: action.payload.players,
      }))
  },
});

export const { updateGame } = gameSlice.actions;

// Selectors

export const selectBasesData = (state) => state.game.basesData;
export const selectCardsData = (state) => state.game.cardsData;
export const selectMaxScore = (state) => state.game.maxScore;
export const selectHasStarted = (state) => state.game.hasStarted;

export const selectBases = (state) => state.game.bases;
export const selectPlayers = (state) => state.game.players;

export default gameSlice.reducer; 
