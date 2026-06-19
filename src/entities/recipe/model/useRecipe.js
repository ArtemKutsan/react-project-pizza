import { useEffect, useState } from 'react';
import { getRecipeById } from '../api/getRecipeById';

/**
 * useRecipe — загружает один рецепт по ID через API-границу Recipe entity.
 *
 * Возвращает:
 * - recipe — загруженный рецепт или null
 * - status — статус загрузки ('idle' | 'loading' | 'succeeded' | 'failed')
 * - error — текст ошибки, если загрузка не удалась
 */
export const useRecipe = (recipeId) => {
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeId) return;

    let isActive = true;

    const loadRecipe = async () => {
      setStatus('loading');
      setError(null);

      try {
        const loadedRecipe = await getRecipeById(recipeId);

        if (!isActive) return;

        setRecipe(loadedRecipe);
        setStatus('succeeded');
      } catch {
        if (!isActive) return;

        setRecipe(null);
        setError('Failed to load recipe');
        setStatus('failed');
      }
    };

    loadRecipe();

    return () => {
      isActive = false;
    };
  }, [recipeId]);

  return { recipe, status, error };
};
