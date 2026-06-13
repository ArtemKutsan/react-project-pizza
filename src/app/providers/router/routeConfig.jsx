import MainPage from '@/pages/MainPage';
import RecipesPage from '@/pages/RecipesPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AddRecipePage from '@/pages/AddRecipePage';
import MealPlannerPage from '@/pages/MealPlannerPage';
import RecipeDetailsPage from '@/pages/RecipeDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { AppRouter, RouterPath } from '@/shared/config/routerPaths';

// Конфигурация маршрутов находится в app, потому что связывает пути с компонентами страниц
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
  [AppRouter.ADD_RECIPE]: {
    path: RouterPath.add_recipe,
    element: <AddRecipePage />,
  },
  [AppRouter.MEAL_PLANNER]: {
    path: RouterPath.meal_planner,
    element: <MealPlannerPage />,
  },
  [AppRouter.RECIPE_DETAIL]: {
    path: RouterPath.recipe_detail,
    element: <RecipeDetailsPage />,
  },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
