import axios from 'axios';
import { normalizeUser } from '../model/normalizeUser';

// Загружает пользователя из временного API и возвращает объект контракта RecipeBox
export const getUserById = async (userId) => {
  const { data } = await axios.get(`https://dummyjson.com/users/${userId}`);

  return normalizeUser(data);
};
