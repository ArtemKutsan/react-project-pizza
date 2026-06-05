/**
 * Группирует рецепты по mealType и считает количество рецептов каждого типа.
 * Также добавляет соответствующую иконку для каждого типа блюда.
 *
 * @param {Array} recipes - Массив рецептов.
 * @returns {Array} Массив объектов вида:
 * [
 *   {
 *     name: "Breakfast",
 *     count: 3,
 *     Icon: BreakfastIcon
 *   },
 *   {
 *     name: "Dinner",
 *     count: 2,
 *     Icon: DinnerIcon
 *   },
 *   {
 *     name: "All",
 *     count: 5,
 *     Icon: fallbackMealTypeIcon
 *   }
 * ]
 *
 * Пример:
 * getMealTypes([
 *   { mealType: ["Breakfast"], image: "1.jpg" },
 *   { mealType: ["Breakfast", "Dinner"], image: "2.jpg" },
 *   { mealType: ["Dinner"], image: "3.jpg" },
 *   { mealType: [], image: "4.jpg" },
 *   { mealType: ["Breakfast"], image: "5.jpg" }
 * ])
 *
 * Логика:
 * - "Breakfast" встречается 3 раза
 * - "Dinner" встречается 2 раза
 * - "All" всегда равно общему количеству рецептов
 */

import {
  fallbackMealTypeIcon,
  mealTypeIcons,
} from '@/features/FilterRecipesByCategory/config/mealTypeIcons';

export const getMealTypes = (recipes) => {
  // Группируем рецепты по mealType и считаем количество рецептов каждого типа
  const mealTypes = recipes.reduce(
    (acc, recipe) => {
      (recipe.mealType ?? []).forEach((type) => {
        acc[type] = (acc[type] ?? 0) + 1;
      });

      return acc;
    },
    { All: recipes.length },
  );

  // Преобразуем объект в массив и добавляем иконки
  return Object.entries(mealTypes).map(([name, count]) => ({
    name,
    count,
    Icon: mealTypeIcons[name] ?? fallbackMealTypeIcon,
  }));
};
