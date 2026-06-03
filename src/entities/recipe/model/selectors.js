export const selectRecipes = (state) => state.recipes.items;
export const selectRecipesStatus = (state) => state.recipes.status;
export const selectRecipesError = (state) => state.recipes.error;
export const selectRecipeById = (state, recipeId) =>
  state.recipes.items.find((recipe) => String(recipe.id) === String(recipeId));
