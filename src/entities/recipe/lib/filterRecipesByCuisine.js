// src/entities/recipe/lib/filterRecipesByCuisine.js

// Функция filterRecipesByCuisine принимает массив рецептов и название кухни, и возвращает новый массив, содержащий только те рецепты, которые принадлежат указанной кухне. Она использует метод filter для создания нового массива, в котором каждый рецепт проверяется на соответствие заданной кухне.
export const filterRecipesByCuisine = (recipes, cuisine) =>
  recipes.filter((recipe) => recipe.cuisine === cuisine);
