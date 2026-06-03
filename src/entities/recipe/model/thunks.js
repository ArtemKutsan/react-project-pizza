import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const { data } = await axios.get('https://dummyjson.com/recipes');

  return data.recipes;
});
