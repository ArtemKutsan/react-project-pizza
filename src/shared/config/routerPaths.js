// src/shared/config/routerPaths.js

// Определение маршрутов приложения с помощью констант и конфигурационного объекта
export const AppRouter = {
  MAIN: 'main',
  RECIPES: 'recipes',
  CATEGORIES: 'categories',
  ADD_RECIPE: 'add_recipe',
  MEAL_PLANNER: 'meal_planner',
  RECIPE_DETAIL: 'recipe_detail',
  NOT_FOUND: 'not_found',
};

// Объект, который связывает каждую константу маршрута с его соответствующим маршрутом
export const RouterPath = {
  [AppRouter.MAIN]: '/',
  [AppRouter.RECIPES]: '/recipes',
  [AppRouter.CATEGORIES]: '/categories',
  [AppRouter.ADD_RECIPE]: '/add-recipe',
  [AppRouter.MEAL_PLANNER]: '/meal-planner',
  [AppRouter.RECIPE_DETAIL]: '/recipes/:id',
  [AppRouter.NOT_FOUND]: '*',
};
