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

  const profileStats = [
    { label: 'Recipes', value: authoredRecipes.length },
    { label: 'Favorites', value: 0 },
    { label: 'Comments', value: 0 },
  ];
  const profileDetails = [
    { label: 'Role', value: user.role || 'Member' },
    { label: 'Age', value: user.age ? `${user.age}` : '—' },
    { label: 'Gender', value: user.gender || '—' },
    {
      label: 'Location',
      value:
        user.location?.city && user.location?.country
          ? `${user.location.city}, ${user.location.country}`
          : user.location?.city || user.location?.country || '—',
    },
    { label: 'Education', value: user.education || '—' },
    {
      label: 'Work',
      value: user.work?.company
        ? `${user.work.title}${user.work.department ? ` · ${user.work.department}` : ''} @ ${
            user.work.company
          }`
        : '—',
    },
    { label: 'Contact', value: user.phone || user.email },
  ];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          {isCurrentUserProfile ? 'Your RecipeBox account.' : 'Public RecipeBox profile.'}
        </p>
      </header>

      <div className="flex items-center gap-6 rounded-2xl border p-6">
        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          className="size-24 rounded-full object-cover"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <span className="text-muted-foreground">@{user.username}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-3">
          {profileStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border p-4">
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-sm text-muted-foreground">About</div>
          <p className="mt-2 text-sm leading-6">
            {isCurrentUserProfile
              ? 'This is your RecipeBox profile. Share recipes, save favorites, and join the discussion.'
              : `${user.firstName} shares recipes on RecipeBox and builds a public profile around their cooking.`}
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {profileDetails.map((detail) => (
          <div key={detail.label} className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">{detail.label}</div>
            <div className="mt-2 text-sm font-medium">{detail.value}</div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight">Recipes by {user.firstName}</h2>
            <p className="text-sm text-muted-foreground">
              {authoredRecipes.length} {authoredRecipes.length === 1 ? 'recipe' : 'recipes'}
            </p>
          </div>
        </div>

        {recipesStatus === 'idle' || recipesStatus === 'loading' ? (
          <p className="text-sm text-muted-foreground">Loading recipes...</p>
        ) : recipesError ? (
          <p className="text-sm text-muted-foreground">{recipesError}</p>
        ) : authoredRecipes.length > 0 ? (
          <RecipeList recipes={authoredRecipes} />
        ) : (
          <div className="rounded-2xl border border-dashed bg-card p-6 text-sm text-muted-foreground">
            No recipes published yet.
          </div>
        )}
      </section>
    </section>
  );
};

export default ProfilePage;
