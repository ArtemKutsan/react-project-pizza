import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecipeList } from "@/entities/recipe/ui";
import { fetchRecipes } from "@/entities/recipe/model/thunks";
import { selectRecipes, selectRecipesError, selectRecipesStatus } from "@/entities/recipe/model/selectors";

const RecipesPage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipesPage;
