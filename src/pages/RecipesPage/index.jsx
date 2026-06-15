import { useMemo, useState } from 'react';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipes } from '@/entities/recipe';

const PAGE_SIZE = 10;

const RecipesPage = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const query = useMemo(
    () => ({
      search: search.trim(),
      sortBy,
      order,
      limit: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    [order, page, search, sortBy],
  );
  const { recipes, status, error } = useRecipes(query);
  const hasNextPage = recipes.length === PAGE_SIZE;

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Recipes</h1>
        <p className="text-slate-500">Find your next favorite recipe.</p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search recipes..."
          className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none"
        />
        <select
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
            setPage(1);
          }}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none"
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
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <RecipeList recipes={recipes} />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
          disabled={page === 1}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-slate-500">Page {page}</span>
        <button
          type="button"
          onClick={() => setPage((currentPage) => currentPage + 1)}
          disabled={!hasNextPage}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default RecipesPage;
