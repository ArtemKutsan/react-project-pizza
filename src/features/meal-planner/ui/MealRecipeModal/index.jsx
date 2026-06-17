import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { filterRecipesByMealType } from '@/entities/recipe/lib';
import { addMeal } from '@/features/meal-planner/model/mealPlanSlice';
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
  const dispatch = useDispatch();

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

  // Записываем ID рецепта в выбранный слот Redux store и закрываем модалку
  const handleSelectRecipe = (recipeId) => {
    if (!selectedSlot) return;

    dispatch(
      addMeal({
        ...selectedSlot,
        recipeId,
      }),
    );
    onClose();
  };

  return (
    // Наличие selectedSlot одновременно означает, что пользователь выбрал слот и модалку нужно открыть
    <Modal isOpen={Boolean(selectedSlot)} title={title} onClose={onClose} className="bg-background">
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredRecipes.map((recipe) => (
          <button
            type="button"
            key={recipe.id}
            onClick={() => handleSelectRecipe(recipe.id)}
            className="flex cursor-pointer items-center gap-4 rounded-2xl border bg-card p-4 text-left"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="size-20 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-medium">{recipe.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{recipe.caloriesPerServing} kcal</p>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default MealRecipeModal;
