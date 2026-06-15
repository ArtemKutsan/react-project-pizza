import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RecipeList } from '@/entities/recipe/ui';
import { useRecipes } from '@/entities/recipe';
import {
  fetchUserById,
  selectUserById,
  selectUsersError,
  selectUsersStatus,
} from '@/entities/user';
import { DEV_USER_ID } from '@/shared/config/devUser';

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userId = id ?? DEV_USER_ID;
  const user = useSelector((state) => selectUserById(state, userId));
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);
  const { recipes, status: recipesStatus, error: recipesError } = useRecipes();
  const isCurrentUserProfile = !id;
  const authoredRecipes = useMemo(
    () => recipes.filter((recipe) => String(recipe.userId) === String(userId)),
    [recipes, userId],
  );

  useEffect(() => {
    if (!user && status !== 'loading') {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, status, user, userId]);

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Profile</h1>
        <p className="text-slate-500">
          {isCurrentUserProfile ? 'Your RecipeBox account.' : 'Public RecipeBox profile.'}
        </p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border border-slate-200 p-6">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="size-24 rounded-full object-cover"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {user.firstName} {user.lastName}
          </h2>
          <span className="text-slate-500">@{user.username}</span>
          <span className="text-sm text-slate-500">{user.email}</span>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Recipes by {user.firstName}
            </h2>
            <p className="text-sm text-slate-500">
              {authoredRecipes.length} {authoredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>
        </div>

        {recipesStatus === 'idle' || recipesStatus === 'loading' ? (
          <p className="text-sm text-slate-500">Loading recipes...</p>
        ) : recipesError ? (
          <p className="text-sm text-slate-500">{recipesError}</p>
        ) : authoredRecipes.length > 0 ? (
          <RecipeList recipes={authoredRecipes} />
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
            No recipes published yet.
          </div>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
