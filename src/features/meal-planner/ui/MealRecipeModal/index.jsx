import { useMemo } from 'react';
import { filterRecipesByMealType } from '@/entities/recipe/lib';
import { Modal } from '@/shared/ui';

/*
Приводит название периода питания из календаря к типам, используемым в рецептах.
Для Snack учитываем оба варианта значения, которые могут прийти от API.
*/
const getMealTypes = (mealPeriod) => {
  if (mealPeriod === 'Snack') return ['Snack', 'Snacks'];

  return mealPeriod;
};

/*
Feature-компонент модалки выбора рецепта для конкретного слота календаря.

selectedSlot:
{
  day: "Monday",
  mealPeriod: "Breakfast"
}

Компонент отвечает за фильтрацию и отображение подходящих рецептов.
*/
const MealRecipeModal = ({ selectedSlot, recipes, onClose }) => {
  // Пересчитываем список только при изменении рецептов или выбранного слота
  const filteredRecipes = useMemo(
    () =>
      selectedSlot ? filterRecipesByMealType(recipes, getMealTypes(selectedSlot.mealPeriod)) : [],
    [recipes, selectedSlot],
  );

  // Заголовок показывает координаты слота, для которого выбирается рецепт
  const title = selectedSlot
    ? `Add meal: ${selectedSlot.mealPeriod}, ${selectedSlot.day}`
    : 'Add meal';

  return (
    // Наличие selectedSlot одновременно означает, что пользователь выбрал слот и модалку нужно открыть
    <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-neutral-50">
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredRecipes.map((recipe) => (
          <article
            key={recipe.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 bg-white"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="size-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-medium text-slate-900">{recipe.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{recipe.caloriesPerServing} kcal</p>
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
};

export default MealRecipeModal;
