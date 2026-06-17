// src/pages/MealPlannerPage/index.jsx
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRecipes } from '@/entities/recipe';
import {
  buildMealPlan,
  getDays,
  mealPeriods,
  MealPlannerCalendar,
  MealRecipeModal,
  selectMealPlan,
} from '@/features/meal-planner';

const MealPlannerPage = () => {
  // Храним координаты пустого слота, для которого пользователь открыл выбор рецепта
  const [selectedSlot, setSelectedSlot] = useState(null);
  // Получаем рецепты, статус загрузки и ошибку с помощью кастомного хука useRecipes
  const { recipes, status, error } = useRecipes();
  // Получаем недельный план с ID рецептов из Redux store
  const storedMealPlan = useSelector(selectMealPlan);
  // Получаем дни для календаря и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const days = useMemo(() => getDays(), []);

  // Соединяем ID из meal plan с полными объектами рецептов для отображения календаря
  const mealPlan = useMemo(
    () =>
      buildMealPlan({
        days,
        mealPeriods,
        mealPlan: storedMealPlan,
        recipes,
      }),
    [days, recipes, storedMealPlan],
  );

  if (status === 'idle' || status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Meal Planner</h1>
        <p className="mt-2 text-muted-foreground">Plan your meals for the week</p>
      </div>
      {/* Пустой слот передаёт сюда day и mealPeriod через onAddMeal */}
      <MealPlannerCalendar days={days} rows={mealPlan} onAddMeal={setSelectedSlot} />
      {/* selectedSlot управляет открытием модалки и определяет тип отображаемых рецептов */}
      {/* После закрытия очищаем выбранный слот, поэтому модалка перестаёт рендериться */}
      <MealRecipeModal
        selectedSlot={selectedSlot}
        recipes={recipes}
        onClose={() => setSelectedSlot(null)}
      />
    </section>
  );
};

export default MealPlannerPage;
