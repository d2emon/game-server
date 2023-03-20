import { createSlice } from '@reduxjs/toolkit';

export const STATE_BEFORE_ROLL = 'STATE_BEFORE_ROLL';
export const STATE_ROLLING = 'STATE_ROLLING';
export const STATE_AFTER_ROLL = 'STATE_AFTER_ROLL';
export const STATE_SCROLLING = 'STATE_SCROLLING';
export const STATE_AFTER_SCROLL = 'STATE_AFTER_SCROLL';

const initialState = {
  currentState: STATE_BEFORE_ROLL,
};

export const turnSlice = createSlice({
  name: 'turn',
  initialState,
  reducers: {
    startTurn: (state) => ({
      ...state,
      currentState: STATE_BEFORE_ROLL,
    }),
    startRoll: (state) => ({
      ...state,
      currentState: STATE_ROLLING,    
    }),
    endRoll: (state) => ({
        ...state,
        currentState: STATE_AFTER_ROLL,
    }),
    startScroll: (state) => ({
        ...state,
        currentState: STATE_SCROLLING,
    }),
    endScroll: (state) => ({
        ...state,
        currentState: STATE_AFTER_SCROLL,
    }),
  },
});

export const {
  startTurn,
  startRoll,
  endRoll,
  startScroll,
  endScroll,
} = turnSlice.actions;

// Selectors

export const selectCurrentState = state => state.turn.currentState;

export default turnSlice.reducer; 
