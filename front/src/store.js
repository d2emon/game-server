import { configureStore } from '@reduxjs/toolkit';
import gameBoardSlice from './reducers/gameBoardSlice';
import turnSlice from './reducers/turnSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
  reducer: {
    gameBoard: gameBoardSlice,
    turn: turnSlice,
    user: userSlice,
  },
});

export default store;
