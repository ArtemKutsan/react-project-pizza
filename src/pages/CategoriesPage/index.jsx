import { useMemo, useState } from 'react';
import { useRecipes } from '@/entities/recipe/model/useRecipes';
import {
  filterRecipesByCuisine,
  filterRecipesByMealType,
  getCuisines,
} from '@/entities/recipe/lib';
import { RecipeListItem } from '@/entities/recipe/ui';
import {
  CuisineList,
  getMealTypeItems,
  MealTypeSelector,
} from '@/features/recipe-categorization';

const CategoriesPage = () => {
  const { recipes, status, error } = useRecipes();

  // Локальное состояние для выбранного типа блюда (meal type) и кухни (cuisine)
  const [activeMealType, setActiveMealType] = useState('All');
  const [activeCuisine, setActiveCuisine] = useState(null);

  // Получаем список типов (категорий) блюд с их количеством и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const mealTypes = useMemo(() => getMealTypeItems(recipes), [recipes]);

  // Фильтруем рецепты по выбранному типу блюда и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const recipesByMealType = useMemo(
    () => filterRecipesByMealType(recipes, activeMealType),
    [activeMealType, recipes],
  );

  // Получаем список кухонь с их количеством и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const cuisines = useMemo(() => getCuisines(recipesByMealType), [recipesByMealType]);

  // Фильтруем рецепты по выбранной кухне и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const visibleRecipes = useMemo(() => {
    if (!activeCuisine) return [];

    return filterRecipesByCuisine(recipesByMealType, activeCuisine);
  }, [activeCuisine, recipesByMealType]);

  // Обработчик выбора типа блюда
  const selectMealType = (mealType) => {
    setActiveMealType(mealType);
    setActiveCuisine(null);
  };

  // Условный рендеринг в зависимости от статуса загрузки и наличия ошибок
  if (status === 'idle' || status === 'loading') {
    return <p>Loading...</p>;
  }

  // Если произошла ошибка при загрузке рецептов, отображаем сообщение об ошибке
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
        <p className="mt-2 text-slate-500">Browse recipes by category</p>
      </div>

      <MealTypeSelector items={mealTypes} activeItem={activeMealType} onSelect={selectMealType} />

      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">
            {activeCuisine
              ? `${activeCuisine} recipes`
              : activeMealType === 'All'
                ? 'All Cuisines'
                : `${activeMealType} Cuisines`}
          </h2>

          {activeCuisine ? (
            <button
              type="button"
              onClick={() => setActiveCuisine(null)}
              className="text-sm font-medium text-lime-700"
            >
              All cuisines
            </button>
          ) : null}
        </div>

        {!activeCuisine ? (
          <CuisineList cuisines={cuisines} mealType={activeMealType} onSelect={setActiveCuisine} />
        ) : (
          <div className="grid gap-4">
            {visibleRecipes.map((recipe) => (
              <RecipeListItem key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;
