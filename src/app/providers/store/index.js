import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe/model/recipesSlice';
import { createRecipeReducer } from '@/features/AddRecipe/model/createRecipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    createRecipe: createRecipeReducer,
  },
});
