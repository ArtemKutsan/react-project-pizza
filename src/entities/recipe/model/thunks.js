import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await fetch('https://dummyjson.com/recipes');
  const data = await response.json();

  return data.recipes;
});
