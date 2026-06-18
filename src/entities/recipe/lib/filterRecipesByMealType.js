import { normalizeMealType } from './normalizeMealType';

// Функция filterRecipesByMealType принимает массив рецептов и один или несколько типов блюд (meal types), и возвращает новый массив, содержащий только те рецепты, которые принадлежат указанным типам блюд. Если тип блюда не указан или указан тип "All", функция возвращает все рецепты. Она использует метод filter для создания нового массива, в котором каждый рецепт проверяется на соответствие заданным типам блюд, с учетом регистра символов.
export const filterRecipesByMealType = (recipes, mealTypes) => {
  // Преобразуем mealTypes в массив, если он не является массивом
  const allowedMealTypes = Array.isArray(mealTypes) ? mealTypes : [mealTypes];

  // Если mealTypes не указан или содержит "All", возвращаем все рецепты
  if (!mealTypes || allowedMealTypes.includes('All')) {
    return recipes;
  }

  // Преобразуем allowedMealTypes в нижний регистр для сравнения без учета регистра
  const normalizedMealTypes = allowedMealTypes.map((mealType) =>
    normalizeMealType(mealType).toLowerCase(),
  );

  // Фильтруем рецепты, оставляя только те, у которых есть хотя бы один тип блюда, совпадающий с allowedMealTypes
  return recipes.filter((recipe) =>
    recipe.mealType?.some((mealType) =>
      normalizedMealTypes.includes(normalizeMealType(mealType).toLowerCase()),
    ),
  );
};
