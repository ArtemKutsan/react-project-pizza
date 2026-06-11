// src/entities/recipe/lib/getCuisines.js

// Функция getCuisines принимает массив рецептов и возвращает массив объектов, каждый из которых содержит название кухни (name), количество рецептов для этой кухни (count) и изображение (image). Она использует метод reduce для создания объекта cuisines, в котором ключами являются названия кухонь, а значениями - объекты с информацией о кухне. Затем она преобразует этот объект в массив с помощью Object.values.
export const getCuisines = (recipes) => {
  // Создаем объект cuisines, который будет хранить информацию о каждой кухне
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

  // Преобразуем объект cuisines в массив объектов с полями name, count и image
  return Object.values(cuisines);
};
