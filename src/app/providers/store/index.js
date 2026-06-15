import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/entities/recipe';
import { usersReducer } from '@/entities/user';
import { addRecipeReducer } from '@/features/add-recipe';
import { mealPlanReducer } from '@/features/meal-planner';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    users: usersReducer,
    addRecipe: addRecipeReducer,
    mealPlan: mealPlanReducer,
  },
});
