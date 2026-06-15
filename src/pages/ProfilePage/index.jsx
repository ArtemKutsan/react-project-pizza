import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserById,
  selectUserById,
  selectUsersError,
  selectUsersStatus,
} from '@/entities/user';
import { DEV_USER_ID } from '@/shared/config/devUser';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => selectUserById(state, DEV_USER_ID));
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    if (!user && status === 'idle') {
      dispatch(fetchUserById(DEV_USER_ID));
    }
  }, [dispatch, status, user]);

  if (status === 'idle' || status === 'loading') return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Profile</h1>
        <p className="text-slate-500">Your RecipeBox account.</p>
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
    </section>
  );
};

export default ProfilePage;
