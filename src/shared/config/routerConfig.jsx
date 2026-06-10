// src/shared/config/routerConfig.jsx
import MainPage from '@/pages/MainPage';
import RecipesPage from '@/pages/RecipesPage';
import CategoriesPage from '@/pages/CategoriesPage';
import AddRecipePage from '@/pages/AddRecipePage';
import RecipePageDetail from '@/pages/RecipePageDetails';
import NotFoundPage from '@/pages/NotFoundPage';

// Определение маршрутов приложения с помощью констант и конфигурационного объекта
export const AppRouter = {
  MAIN: 'main',
  RECIPES: 'recipes',
  CATEGORIES: 'categories',
  ADD_RECIPE: 'add_recipe',
  RECIPE_DETAIL: 'recipe_detail',
  NOT_FOUND: 'not_found',
};

// Объект, который связывает каждую константу маршрута с его соответствующим маршрутом
export const RouterPath = {
  [AppRouter.MAIN]: '/',
  [AppRouter.RECIPES]: '/recipes',
  [AppRouter.CATEGORIES]: '/categories',
  [AppRouter.ADD_RECIPE]: '/add-recipe',
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
  [AppRouter.ADD_RECIPE]: {
    path: RouterPath.add_recipe,
    element: <AddRecipePage />,
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
