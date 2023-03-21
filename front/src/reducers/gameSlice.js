import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameAPI from '../services/gameAPI';

export const STATUS_GAME_READY = 'STATUS_GAME_READY';
export const STATUS_GAME_LOADING = 'STATUS_GAME_LOADING';
export const STATUS_GAME_SUCCESS = 'STATUS_GAME_SUCCESS';
export const STATUS_GAME_ERROR = 'STATUS_GAME_ERROR';

const initialState = {
  basesData: [],
  cardsData: [],
  maxScore: 0,
  hasStarted: false,
  bases: [],
  players: [],
  error: null,
  status: STATUS_GAME_READY,
};

export const fetchGame = createAsyncThunk(
  'game/fetchGame',
  async () => {
    const response = await gameAPI.getGame();
    console.log('/api/v1/game', response);
    return response.data;
  },
);

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
      .addCase(fetchGame.pending, (state) => ({
        ...state,
        status: STATUS_GAME_LOADING,
      }))
      .addCase(fetchGame.fulfilled, (state, action) => ({
        ...state,
        basesData: action.payload.bases,
        cardsData: action.payload.cards,
        maxScore: action.payload.maxScore,
        status: STATUS_GAME_SUCCESS,
      }))
      .addCase(fetchGame.rejected, (state) => ({
        ...state,
        status: STATUS_GAME_ERROR,
      }))

      .addCase(startGame.pending, (state) => ({
        ...state,
        hasStarted: false,
        bases: [],
        players: [],
      }))
      .addCase(startGame.fulfilled, (state, action) => ({
        ...state,
        hasStarted: true,
        bases: action.payload.bases,
        players: action.payload.players,
      }))
  },
});

export const { updateGame } = gameSlice.actions;

// Selectors

export const selectGameStatus = (state) => state.game.status;

export const selectBasesData = (state) => state.game.basesData;
export const selectCardsData = (state) => state.game.cardsData;
export const selectMaxScore = (state) => state.game.maxScore;
export const selectBases = (state) => state.game.bases;
export const selectPlayers = (state) => state.game.players;

export default gameSlice.reducer; 
