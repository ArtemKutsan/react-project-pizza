import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from '@/entities/recipe/model/thunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load recipes';
      });
  },
});

export const { addRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
