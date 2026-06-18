import { useEffect, useMemo, useState } from 'react';
import { getRecipes } from '@/entities/recipe';
import { buildRecipesQuery } from '@/entities/recipe/lib';
import { RecipeList } from '@/entities/recipe/ui';
import { RecipeDiscoveryControls } from '@/features/recipe-discovery';
import { Button } from '@/shared/ui';
import useDebounce from '@/shared/hooks/useDebounce';

const RECIPES_PER_PAGE = 10;

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(search, 300);
  const query = useMemo(
    () =>
      buildRecipesQuery({
        search: debouncedSearch,
        sortBy,
        order,
        page,
        pageSize: RECIPES_PER_PAGE,
      }),
    [debouncedSearch, order, page, sortBy],
  );
  const hasNextPage = recipes.length === RECIPES_PER_PAGE;
  const isLoading = status === 'idle' || status === 'loading';
  const isEmpty = status === 'succeeded' && recipes.length === 0;
  const updateSearch = (value) => {
    setSearch(value);

    if (page !== 1) {
      setPage(1);
    }
  };
  const updateSortBy = (value) => {
    setSortBy(value);
    setPage(1);
  };
  const updateOrder = (value) => {
    setOrder(value);
    setPage(1);
  };

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

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Recipes</h1>
        <p>Find your next favorite recipe</p>
      </header>

      <RecipeDiscoveryControls
        search={search}
        sortBy={sortBy}
        order={order}
        onSearchChange={updateSearch}
        onSortByChange={updateSortBy}
        onOrderChange={updateOrder}
      />

      {error ? (
        <p>{error}</p>
      ) : isLoading ? (
        <p>Loading recipes...</p>
      ) : isEmpty ? (
        <p>No recipes found.</p>
      ) : (
        <RecipeList recipes={recipes} />
      )}

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
