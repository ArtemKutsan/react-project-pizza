// src/entities/recipe/model/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для загрузки рецептов с сервера
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const { data } = await axios.get('https://dummyjson.com/recipes');

  return data.recipes;
});

// Асинхронный thunk для создания нового рецепта на сервере
export const createRecipe = createAsyncThunk('recipes/createRecipe', async (recipe) => {
  const { data } = await axios.post('https://dummyjson.com/recipes/add', recipe);

  return data;
});
