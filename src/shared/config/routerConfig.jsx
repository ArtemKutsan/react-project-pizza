// src/shared/config/routerConfig.jsx
import MainPage from '@/pages/MainPage';
import RecipesPage from '@/pages/RecipesPage';
import CategoriesPage from '@/pages/CategoriesPage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import RecipePageDetail from '@/pages/RecipePageDetails';
import NotFoundPage from '@/pages/NotFoundPage';

// Определение маршрутов приложения с помощью констант и конфигурационного объекта
export const AppRouter = {
  MAIN: 'main',
  RECIPES: 'recipes',
  CATEGORIES: 'categories',
  MEAL_PLANNER: 'meal_planner',
  RECIPE_DETAIL: 'recipe_detail',
  NOT_FOUND: 'not_found',
};

// Объект, который связывает каждую константу маршрута с его соответствующим маршрутом
export const RouterPath = {
  [AppRouter.MAIN]: '/',
  [AppRouter.RECIPES]: '/recipes',
  [AppRouter.CATEGORIES]: '/categories',
  [AppRouter.MEAL_PLANNER]: '/meal-planner',
  [AppRouter.RECIPE_DETAIL]: '/recipes/:id',
  [AppRouter.NOT_FOUND]: '*',
};

// Конфигурация маршрутов, которая используется для рендеринга компонентов-страниц в зависимости от текущего пути
export const routeConfig = {
  [AppRouter.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRouter.RECIPES]: {
    path: RouterPath.recipes,
    element: <RecipesPage />,
  },
  [AppRouter.CATEGORIES]: {
    path: RouterPath.categories,
    element: <CategoriesPage />,
  },
  [AppRouter.MEAL_PLANNER]: {
    path: RouterPath.meal_planner,
    element: <MealPlannerPage />,
  },
  [AppRouter.RECIPE_DETAIL]: {
    path: RouterPath.recipe_detail,
    element: <RecipePageDetail />,
  },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
