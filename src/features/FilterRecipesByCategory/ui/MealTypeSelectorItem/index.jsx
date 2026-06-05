import { cn } from '@/shared/lib/cn';

const MealTypeSelectorItem = ({ item, isActive, onSelect }) => {
  const { name, count, Icon } = item;

  return (
    <button
      type="button"
      onClick={() => onSelect(name)}
      className={cn(
        'flex min-h-32 min-w-28 flex-col items-center justify-center gap-4 rounded-lg border border-slate-200 p-4 text-slate-900',
        isActive ? 'bg-emerald-50' : 'bg-white',
      )}
    >
      <Icon
        className={cn('size-8', isActive ? 'text-lime-700' : 'text-slate-700')}
        aria-hidden="true"
      />
      <span className="text-sm font-semibold">{name === 'All' ? 'All Recipes' : name}</span>
      <span className="text-sm text-slate-500">{count}</span>
    </button>
  );
};

export default MealTypeSelectorItem;
