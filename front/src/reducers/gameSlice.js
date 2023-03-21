import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameAPI from '../services/gameAPI';

const initialState = {
  basesData: [],
  cardsData: [],
  maxScore: 0,
  playerId: null,
  hasStarted: false,
  isPlayerActive: false,
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

export const startTurn = createAsyncThunk(
  'game/startTurn',
  async (payload, thunkAPI) => {
    const {
      game: {
        playerId,
      },
    } = thunkAPI.getState();

    const response = await gameAPI.startTurn(playerId);
    console.log(`/api/v1/game/player/${playerId}/start`, response);
    return response.data;
  },
);

export const endTurn = createAsyncThunk(
  'game/endTurn',
  async (payload, thunkAPI) => {
    const {
      game: {
        playerId,
      },
    } = thunkAPI.getState();

    const response = await gameAPI.endTurn(playerId);
    console.log(`/api/v1/game/player/${playerId}/end`, response);
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
      isPlayerActive: action.payload.isPlayerActive,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(startGame.pending, (state) => ({
        ...state,
        playerId: null,
        hasStarted: false,
        bases: [],
        players: [],
      }))
      .addCase(startGame.fulfilled, (state, action) => ({
        ...state,
        basesData: action.payload.game.bases,
        cardsData: action.payload.game.cards,
        maxScore: action.payload.game.maxScore,
        playerId: 0,
        hasStarted: true,
        bases: action.payload.bases,
        players: action.payload.players,
      }))

      .addCase(startTurn.fulfilled, (state, action) => ({
        ...state,
        // basesData: action.payload.game.bases,
        // cardsData: action.payload.game.cards,
        // maxScore: action.payload.game.maxScore,
        // hasStarted: true,
        // bases: action.payload.bases,
        players: action.payload.players,
        isPlayerActive: true,
      }))

      .addCase(endTurn.fulfilled, (state, action) => ({
        ...state,
        // basesData: action.payload.game.bases,
        // cardsData: action.payload.game.cards,
        // maxScore: action.payload.game.maxScore,
        // hasStarted: true,
        // bases: action.payload.bases,
        players: action.payload.players,
        isPlayerActive: false,
      }))
  },
});

export const { updateGame } = gameSlice.actions;

// Selectors

export const selectBasesData = (state) => state.game.basesData;
export const selectCardsData = (state) => state.game.cardsData;
export const selectMaxScore = (state) => state.game.maxScore;

export const selectPlayerId = (state) => state.game.playerId;
export const selectPlayer = (state) => (state.game.players.length > state.game.playerId)
  ? state.game.players[state.game.playerId]
  : null;
export const selectHasStarted = (state) => state.game.hasStarted;
export const selectIsPlayerActive = (state) => state.game.isPlayerActive;

export const selectBases = (state) => state.game.bases;
export const selectPlayers = (state) => state.game.players;

export default gameSlice.reducer; 
