import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe(state, action) {
      state.recipes.push(action.payload);
    },
  },
});

export const { addRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
