import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '@/entities/recipe/model/thunks';
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesStatus,
} from '@/entities/recipe/model/selectors';
import { RecipeListItem } from '@/entities/recipe/ui';
import {
  CuisineList,
  MealTypeSelector,
  getCuisines,
  getMealTypes,
} from '@/features/FilterRecipesByCategory';

const CategoriesPage = () => {
  // Получаем необходимые данные из Redux store и создаем локальное состояние для выбранного типа блюда и кухни
  const dispatch = useDispatch();

  // Получаем список рецептов, статус загрузки и возможные ошибки из Redux store
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  // Локальное состояние для выбранного типа блюда (meal type) и кухни (cuisine)
  const [activeMealType, setActiveMealType] = useState('All');
  const [activeCuisine, setActiveCuisine] = useState(null);

  // Загружаем рецепты при монтировании компонента, если статус загрузки - 'idle'
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  // Получаем список типов (категорий) блюд с их количеством и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const mealTypes = useMemo(() => getMealTypes(recipes), [recipes]);

  // Фильтруем рецепты по выбранному типу блюда и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const recipesByMealType = useMemo(() => {
    if (activeMealType === 'All') return recipes;

    return recipes.filter((recipe) => recipe.mealType?.includes(activeMealType));
  }, [activeMealType, recipes]);

  // Получаем список кухонь с их количеством и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const cuisines = useMemo(() => getCuisines(recipesByMealType), [recipesByMealType]);

  // Фильтруем рецепты по выбранной кухне и мемоизируем результат, чтобы не пересчитывать при каждом рендере
  const visibleRecipes = useMemo(() => {
    if (!activeCuisine) return [];

    return recipesByMealType.filter((recipe) => recipe.cuisine === activeCuisine);
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
