import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const STATUS_USER_READY = 'STATUS_USER_READY';
export const STATUS_USER_LOADING = 'STATUS_USER_LOADING';
export const STATUS_USER_SUCCESS = 'STATUS_USER_SUCCESS';
export const STATUS_USER_ERROR = 'STATUS_USER_ERROR';

const initialState = {
  userId: null,
  name: null,
  user: null,
  error: null,
  status: STATUS_USER_READY,
};

const userMockApi = {
  fetchUser: async (userId) => ({
    data: {
      userId,
      name: 'Игрок',    
    },
  }),
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await userMockApi.fetchUser(userId);
    console.log(`/api/v1/user/${userId}`, response);
    return response.data;
  },
);
  
export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => ({
        ...state,
        userId: null,
        name: '',
        user: null,
        status: STATUS_USER_LOADING,
      }))
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        userId: action.payload.userId,
        name: action.payload.name,
        user: (action.payload.userId)
          ? {
            userId: action.payload.userId,
            name: action.payload.name,    
          }
          : null,
        status: STATUS_USER_SUCCESS,
      }))
      .addCase(fetchUser.rejected, (state) => ({
        ...state,
        userId: null,
        name: '',
        user: null,
        status: STATUS_USER_ERROR,
      }))
  },
});

// Selectors

export const selectUserStatus = (state) => state.user.status;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer; 
