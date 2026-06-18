import { recipeOrderOptions, recipeSortOptions } from '../../config/options';

const RecipeDiscoveryControls = ({
  search,
  sortBy,
  order,
  onSearchChange,
  onSortByChange,
  onOrderChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search recipes..."
        className="min-w-0 flex-1 rounded-xl border px-4 py-2 text-sm outline-none"
      />
      <select
        value={sortBy}
        onChange={(event) => onSortByChange(event.target.value)}
        className="rounded-xl border px-4 py-2 text-sm outline-none"
      >
        {recipeSortOptions.map((option) => (
          <option key={option.value || 'default'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        value={order}
        onChange={(event) => onOrderChange(event.target.value)}
        className="rounded-xl border px-4 py-2 text-sm outline-none"
      >
        {recipeOrderOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecipeDiscoveryControls;
