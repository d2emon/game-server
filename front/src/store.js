import { configureStore } from '@reduxjs/toolkit';
import gameBoardSlice from './reducers/gameBoardSlice';
import turnSlice from './reducers/turnSlice';

const store = configureStore({
  reducer: {
    gameBoard: gameBoardSlice,
    turn: turnSlice,
  },
});

export default store;
