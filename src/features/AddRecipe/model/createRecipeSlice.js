import { createSlice } from '@reduxjs/toolkit';
import { createRecipe } from '@/entities/recipe/model/thunks';

const initialState = {
  status: 'idle',
  error: null,
};

const createRecipeSlice = createSlice({
  name: 'createRecipe',
  initialState,
  reducers: {
    resetCreateRecipeState(state) {
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

export const { resetCreateRecipeState } = createRecipeSlice.actions;
export const createRecipeReducer = createRecipeSlice.reducer;
