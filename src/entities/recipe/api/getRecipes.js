import axios from 'axios';

// Загружает список рецептов из временного API с поддержкой поиска, сортировки и пагинации
export const getRecipes = async ({ search = '', sortBy = '', order = '', limit = 12, skip = 0 } = {}) => {
  const endpoint = search ? 'https://dummyjson.com/recipes/search' : 'https://dummyjson.com/recipes';
  const { data } = await axios.get(endpoint, {
    params: {
      ...(search ? { q: search } : {}),
      ...(sortBy ? { sortBy } : {}),
      ...(order ? { order } : {}),
      limit,
      skip,
    },
  });

  return data.recipes;
};
