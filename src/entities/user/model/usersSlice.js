import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById } from './thunks';

const initialState = {
  items: {},
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items[action.payload.id] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load user';
      });
  },
});

export const usersReducer = usersSlice.reducer;
