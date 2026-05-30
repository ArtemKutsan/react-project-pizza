import MainPage from '../../pages/MainPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RecipePage from '../../pages/RecipePage';
import RecipePageDetail from '../../pages/RecipePageDetails';

export const AppRouter = {
  MAIN: 'main',
  RECIPE: 'recipe',
  RECIPE_DETAIL: 'recipe_detail',
  NOT_FOUND: 'not_found',
};

export const RouterPath = {
  [AppRouter.MAIN]: '/',
  [AppRouter.RECIPE]: '/recipe',
  [AppRouter.RECIPE_DETAIL]: '/recipe/:id',
  [AppRouter.NOT_FOUND]: '*',
};

export const routeConfig = {
  [AppRouter.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRouter.RECIPE]: {
    path: RouterPath.recipe,
    element: <RecipePage />,
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
