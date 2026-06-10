import { createSlice } from '@reduxjs/toolkit';
import { addRecipe } from '@/entities/recipe/model/thunks';

const initialState = {
  status: 'idle',
  error: null,
};

const addRecipeSlice = createSlice({
  name: 'addRecipe',
  initialState,
  reducers: {
    resetAddRecipeState(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecipe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addRecipe.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to create recipe';
      });
  },
});

export const { resetAddRecipeState } = addRecipeSlice.actions;
export const addRecipeReducer = addRecipeSlice.reducer;
