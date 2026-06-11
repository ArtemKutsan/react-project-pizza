// src/features/recipe-categorization/ui/MealTypeSelectorItem/index.jsx
import { cn } from '@/shared/lib/cn';

// Компонент MealTypeSelectorItem принимает объект item, который содержит информацию о типе блюда (name, count и Icon), булевое значение isActive для определения активного элемента и функцию onSelect для обработки выбора типа блюда. Он отображает кнопку с иконкой, названием типа блюда и количеством рецептов, а также изменяет стиль кнопки в зависимости от того, является ли она активной.
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
