// src/entities/recipe/model/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes } from '../api/getRecipes';
import { createRecipeRequest } from '../api/createRecipe';

// Асинхронный thunk для загрузки рецептов с сервера
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', getRecipes);

// Асинхронный thunk для создания нового рецепта на сервере
export const createRecipe = createAsyncThunk('recipes/createRecipe', createRecipeRequest);
