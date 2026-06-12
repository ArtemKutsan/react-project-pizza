// src/pages/MealPlannerPage/index.jsx
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRecipes } from '@/entities/recipe/model/useRecipes';
import { buildMealPlan } from '@/features/meal-planner/lib/buildMealPlan';
import { mealPeriods } from '@/features/meal-planner/config/mealPeriods';
import { getDays } from '@/features/meal-planner/model/days';
import { selectMealPlan } from '@/features/meal-planner/model/selectors';
import MealPlannerCalendar from '@/features/meal-planner/ui/MealPlannerCalendar';

const MealPlannerPage = () => {
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
        <h1 className="text-2xl font-semibold text-slate-900">Meal Planner</h1>
        <p className="mt-2 text-slate-500">Plan your meals for the week</p>
      </div>
      <MealPlannerCalendar days={days} rows={mealPlan} />
    </section>
  );
};

export default MealPlannerPage;
