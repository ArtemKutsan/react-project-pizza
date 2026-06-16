/**
 * useRecipes — кастомный хук для работы с рецептами.
 *
 * Возвращает:
 * - recipes — список рецептов из Redux store
 * - status — статус загрузки ('idle' | 'loading' | 'succeeded' | 'failed')
 * - error — текст ошибки, если загрузка не удалась
 *
 * Поведение:
 * - Без queryParams загружает полный каталог рецептов один раз при первом рендере, если статус 'idle'
 * - С queryParams перезапрашивает рецепты при изменении query
 *
 * Использование:
 * const { recipes, status, error } = useRecipes();
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes, selectRecipesError, selectRecipesStatus } from './selectors';
import { fetchRecipes } from './thunks';

// Хук сущности для загрузки рецептов и подписки на store.
export const useRecipes = (queryParams = null) => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);
  const queryKey = JSON.stringify(queryParams ?? {});
  const hasQueryParams = queryParams !== null && Object.keys(queryParams).length > 0;

  useEffect(() => {
    // Загрузка по query для экранов поиска и сортировки.
    if (!hasQueryParams) return;

    dispatch(fetchRecipes(queryParams));
  }, [dispatch, hasQueryParams, queryKey, queryParams]);

  useEffect(() => {
    // Первичная загрузка полного каталога для экранов, которые читают общий список рецептов.
    if (hasQueryParams || status !== 'idle') return;

    dispatch(fetchRecipes());
  }, [dispatch, hasQueryParams, status]);

  return { recipes, status, error };
};
