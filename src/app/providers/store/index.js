import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe/model/recipesSlice';
import { addRecipeReducer } from '@/features/add-recipe/model/addRecipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    addRecipe: addRecipeReducer,
  },
});
