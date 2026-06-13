import { createSlice } from '@reduxjs/toolkit';
import { createRecipe } from '@/entities/recipe';

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
      .addCase(createRecipe.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createRecipe.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to create recipe';
      });
  },
});

export const { resetAddRecipeState } = addRecipeSlice.actions;
export const addRecipeReducer = addRecipeSlice.reducer;
