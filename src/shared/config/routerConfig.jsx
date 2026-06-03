import MainPage from "@/pages/MainPage";
import RecipesPage from "@/pages/RecipesPage";
import CategoriesPage from "@/pages/CategoriesPage";
import RecipePageDetail from "@/pages/RecipePageDetails";
import NotFoundPage from "@/pages/NotFoundPage";

export const AppRouter = {
  MAIN: "main",
  RECIPES: "recipes",
  CATEGORIES: "categories",
  RECIPE_DETAIL: "recipe_detail",
  NOT_FOUND: "not_found",
};

export const RouterPath = {
  [AppRouter.MAIN]: "/",
  [AppRouter.RECIPES]: "/recipes",
  [AppRouter.CATEGORIES]: "/categories",
  [AppRouter.RECIPE_DETAIL]: "/recipes/:id",
  [AppRouter.NOT_FOUND]: "*",
};

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
  [AppRouter.RECIPE_DETAIL]: {
    path: RouterPath.recipe_detail,
    element: <RecipePageDetail />,
  },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
