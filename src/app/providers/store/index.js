import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe/model/recipesSlice';
import { addRecipeReducer } from '@/features/add-recipe/model/addRecipeSlice';
import { mealPlanReducer } from '@/features/meal-planner';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    addRecipe: addRecipeReducer,
    mealPlan: mealPlanReducer,
  },
});
