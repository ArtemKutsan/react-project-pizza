import RecipeListItem from '../RecipeListItem';

const RecipeList = ({ recipes = [] }) => {
  if (recipes.length === 0) {
    return <p>No recipes yet</p>;
  }

  return (
    <ul className="space-y-4">
      {recipes.map((recipe) => (
        <li key={recipe.id ?? recipe.name}>
          <RecipeListItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;
