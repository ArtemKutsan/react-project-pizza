/**
 * Группирует рецепты по cuisine и считает количество рецептов каждой кухни.
 *
 * @param {Array} recipes - Массив рецептов.
 * @returns {Array} Массив объектов вида:
 * [
 *   {
 *     name: "Italian",
 *     count: 6,
 *     image: "italian1.jpg"
 *   },
 *   {
 *     name: "Asian",
 *     count: 2,
 *     image: "asian7.jpg"
 *   }
 * ]
 *
 * Пример:
 * getCuisines([
 *   { cuisine: "Italian", image: "italian1.jpg" },
 *   { cuisine: "Italian", image: "italian2.jpg" },
 *   { cuisine: "Italian", image: "italian3.jpg" },
 *   { cuisine: "Italian", image: "italian4.jpg" },
 *   { cuisine: "Italian", image: "italian5.jpg" },
 *   { cuisine: "Italian", image: "italian6.jpg" },
 *   { cuisine: "Asian", image: "asian7.jpg" },
 *   { cuisine: "Asian", image: "asian8.jpg" }
 * ])
 */

export const getCuisines = (recipes) => {
  // Группируем рецепты по cuisine и считаем количество рецептов каждой кухни
  const cuisines = recipes.reduce((acc, recipe) => {
    if (!recipe.cuisine) return acc;

    if (!acc[recipe.cuisine]) {
      acc[recipe.cuisine] = {
        name: recipe.cuisine,
        count: 0,
        image: recipe.image,
      };
    }

    acc[recipe.cuisine].count += 1;

    return acc;
  }, {});

  // Преобразуем объект в массив
  return Object.values(cuisines);
};
