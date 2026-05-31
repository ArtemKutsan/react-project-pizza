import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe/model/recipesSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});
