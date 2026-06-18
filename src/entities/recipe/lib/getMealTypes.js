import { normalizeMealType } from './normalizeMealType';

// Функция getMealTypes принимает массив рецептов и возвращает массив объектов, каждый из которых содержит имя типа блюда (name) и количество рецептов для этого типа (count). Она использует метод reduce для создания объекта mealTypes, в котором ключами являются названия типов блюд, а значениями - количество рецептов для каждого типа. Затем она преобразует этот объект в массив с помощью Object.entries и map.
export const getMealTypes = (recipes) => {
  // Создаем объект mealTypes, который будет хранить количество рецептов для каждого типа блюда
  const mealTypes = recipes.reduce(
    (acc, recipe) => {
      (recipe.mealType ?? []).forEach((mealType) => {
        const normalizedMealType = normalizeMealType(mealType);

        acc[normalizedMealType] = (acc[normalizedMealType] ?? 0) + 1;
      });

      return acc;
    },
    { All: recipes.length },
  );

  // Преобразуем объект mealTypes в массив объектов с полями name и count
  return Object.entries(mealTypes).map(([name, count]) => ({
    name,
    count,
  }));
};
