// src/pages/MealPlannerPage/index.jsx
import { useMemo } from 'react';
import { useRecipes } from '@/entities/recipe/model/useRecipes';
import { filterRecipesByMealType } from '@/entities/recipe/lib';
import { buildMealPlan } from '@/features/meal-planner/lib/buildMealPlan';
import { mealPeriods } from '@/features/meal-planner/config/mealPeriods';
import { getDays } from '@/features/meal-planner/model/days';
import { mockMealPlanPatterns } from '@/features/meal-planner/model/mockMealPlan';
import MealPlannerCalendar from '@/features/meal-planner/ui/MealPlannerCalendar';

const MealPlannerPage = () => {
  // Получаем рецепты, статус загрузки и ошибку с помощью кастомного хука useRecipes
  const { recipes, status, error } = useRecipes();
  // Получаем дни для календаря и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const days = useMemo(() => getDays(), []);

  // Фильтруем рецепты по типу блюда (meal type) и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const breakfastRecipes = useMemo(() => filterRecipesByMealType(recipes, 'Breakfast'), [recipes]);
  // Фильтруем рецепты по типу блюда (meal type) и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const lunchRecipes = useMemo(() => filterRecipesByMealType(recipes, 'Lunch'), [recipes]);
  // Фильтруем рецепты по типу блюда (meal type) и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const dinnerRecipes = useMemo(() => filterRecipesByMealType(recipes, 'Dinner'), [recipes]);
  // Фильтруем рецепты по типу блюда (meal type) и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const snackRecipes = useMemo(
    () => filterRecipesByMealType(recipes, ['Snack', 'Snacks']),
    [recipes],
  );

  // Строим план питания (meal plan) на основе отфильтрованных рецептов и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const mealPlan = useMemo(
    () =>
      buildMealPlan({
        mealPeriods,
        recipesByMealType: {
          Breakfast: breakfastRecipes,
          Lunch: lunchRecipes,
          Dinner: dinnerRecipes,
          Snack: snackRecipes,
        },
        placement: mockMealPlanPatterns,
      }),
    [breakfastRecipes, lunchRecipes, dinnerRecipes, snackRecipes],
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
