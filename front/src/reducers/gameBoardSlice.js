import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import gameBoardApi from '../services/gameBoardAPI';
import { endRoll, startRoll } from './turnSlice';

export const STATUS_FIELD_UNLOADED = 'STATUS_FIELD_UNLOADED';
export const STATUS_FIELD_IDLE = 'STATUS_FIELD_IDLE';
export const STATUS_FIELD_LOADING = 'STATUS_FIELD_LOADING';

export const STATUS_UNROLLED = 'STATUS_UNROLLED';
export const STATUS_ROLLING = 'STATUS_ROLLING';
export const STATUS_ROLLED = 'STATUS_ROLLED';

const initialState = {
  field: null,
  fieldStatus: STATUS_FIELD_UNLOADED,

  roll: 0,
  rollStatus: STATUS_UNROLLED,

  position: 0,
};

export const fetchBoardAsync = createAsyncThunk(
  'gameBoard/fetchBoard',
  async () => {
    const response = {}; // await gameBoardApi.fetchData();
    return response.data;
  },
);

export const fetchRollAsync = createAsyncThunk(
  'gameBoard/fetchRoll',
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(startRoll());
    const response = {}; // await gameBoardApi.fetchRoll();
    thunkAPI.dispatch(endRoll());
    return response.data;
  },
);

export const gameBoardSlice = createSlice({
  name: 'gameBoard',
  initialState,
  extraReducers: (builder) => {
    builder
      // Field
      .addCase(fetchBoardAsync.pending, (state) => ({
        ...state,
        fieldStatus: STATUS_FIELD_LOADING,
      }))
      .addCase(fetchBoardAsync.fulfilled, (state, action) => ({
        ...state,
        field: action.payload.field,
        fieldStatus: STATUS_FIELD_IDLE,
      }))
      // Roll
      .addCase(fetchRollAsync.pending, (state) => ({
        ...state,
        roll: null,
        rollStatus: STATUS_ROLLING,
      }))
      .addCase(fetchRollAsync.fulfilled, (state, action) => ({
        ...state,
        field: action.payload.field,
        position: action.payload.position,
        roll: action.payload.roll,
        rollStatus: STATUS_ROLLED,
      }));
  },
});

// Selectors

export const selectFieldStatus = (state) => state.gameBoard.fieldStatus;
export const selectRollStatus = (state) => state.gameBoard.rollStatus;

export const selectField = (state) => state.gameBoard.field;
export const selectPlayer = (state) => ({
  position: state.gameBoard.position,
  roll: state.gameBoard.roll,
});

export default gameBoardSlice.reducer; 
