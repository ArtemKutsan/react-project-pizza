import { RecipeList } from '@/entities/recipe/ui';
import { useRecipes } from '@/entities/recipe';

const RecipesPage = () => {
  const { recipes, status, error } = useRecipes();

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Recipes</h1>
        <p className="text-slate-500">Find your next favorite recipe.</p>
      </header>

      <RecipeList recipes={recipes} />
    </section>
  );
};

export default RecipesPage;
