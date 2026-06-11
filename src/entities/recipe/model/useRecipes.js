/**
 * useRecipes – кастомный хук для работы с рецептами.
 *
 * Возвращает:
 * - recipes — список рецептов из Redux store
 * - status — статус загрузки ('idle' | 'loading' | 'succeeded' | 'failed')
 * - error — текст ошибки, если загрузка не удалась
 *
 * Поведение:
 * - При первом рендере, если статус 'idle', автоматически отправляет fetchRecipes()
 * - Следит за обновлением данных через селекторы
 *
 * Использование:
 * const { recipes, status, error } = useRecipes();
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes, selectRecipesError, selectRecipesStatus } from './selectors';
import { fetchRecipes } from './thunks';

// Кастомный хук для получения рецептов из Redux store и управления их состоянием загрузки и ошибок
export const useRecipes = () => {
  // Получаем dispatch функцию для отправки действий в Redux store
  const dispatch = useDispatch();
  // Получаем рецепты, статус загрузки и ошибку из Redux store с помощью селекторов
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  // Используем useEffect для загрузки рецептов при монтировании компонента, если статус загрузки - 'idle'
  useEffect(() => {
    // Если статус загрузки - 'idle', отправляем действие для загрузки рецептов
    if (status === 'idle') {
      // Отправляем действие для загрузки рецептов в Redux store
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  // Возвращаем рецепты, статус загрузки и ошибку для использования в компонентах, которые используют этот хук
  return { recipes, status, error };
};
