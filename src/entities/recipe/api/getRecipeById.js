import axios from 'axios';

// Загружает один рецепт по ID через временный API-провайдер
export const getRecipeById = async (recipeId) => {
  const { data } = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);

  return data;
};
