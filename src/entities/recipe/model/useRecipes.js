import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectRecipes,
  selectRecipesError,
  selectRecipesStatus,
} from './selectors';
import { fetchRecipes } from './thunks';

export const useRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  return { recipes, status, error };
};
