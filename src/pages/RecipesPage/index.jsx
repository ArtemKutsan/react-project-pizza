import { useEffect, useMemo, useState } from 'react';
import { getRecipes } from '@/entities/recipe/api/getRecipes';
import { RecipeList } from '@/entities/recipe/ui';
import { Button } from '@/shared/ui';

const RECIPES_PER_PAGE = 10;

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const query = useMemo(
    () => ({
      search: search.trim(),
      sortBy,
      order,
      limit: RECIPES_PER_PAGE,
      skip: (page - 1) * RECIPES_PER_PAGE,
    }),
    [order, page, search, sortBy],
  );
  const hasNextPage = recipes.length === RECIPES_PER_PAGE;

  useEffect(() => {
    let isActive = true;

    const loadRecipes = async () => {
      setStatus('loading');
      setError(null);

      try {
        const nextRecipes = await getRecipes(query);

        if (!isActive) return;

        setRecipes(nextRecipes);
        setStatus('succeeded');
      } catch {
        if (!isActive) return;

        setError('Failed to load recipes');
        setStatus('failed');
      }
    };

    loadRecipes();

    return () => {
      isActive = false;
    };
  }, [query]);

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Recipes</h1>
        <p>Find your next favorite recipe</p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search recipes..."
          className="min-w-0 flex-1 rounded-xl border px-4 py-2 text-sm outline-none"
        />
        <select
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
            setPage(1);
          }}
          className="rounded-xl border px-4 py-2 text-sm outline-none"
        >
          <option value="">Sort by default</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
          <option value="prepTimeMinutes">Prep time</option>
        </select>
        <select
          value={order}
          onChange={(event) => {
            setOrder(event.target.value);
            setPage(1);
          }}
          className="rounded-xl border px-4 py-2 text-sm outline-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <RecipeList recipes={recipes} />

      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button
          variant="ghost"
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default RecipesPage;
