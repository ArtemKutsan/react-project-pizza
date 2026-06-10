import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe/model/recipesSlice';
import { addRecipeReducer } from '@/features/AddRecipe/model/addRecipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    addRecipe: addRecipeReducer,
  },
});
