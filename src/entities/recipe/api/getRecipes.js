import axios from 'axios';

// Загружает список рецептов из временного API
export const getRecipes = async () => {
  const { data } = await axios.get('https://dummyjson.com/recipes');

  return data.recipes;
};
