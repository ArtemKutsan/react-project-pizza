import { useEffect, useState } from 'react';
import { RecipeList } from '@/entities/recipe/ui';

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch(() => setError('Failed to load recipes'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Recipes</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default RecipePage;
