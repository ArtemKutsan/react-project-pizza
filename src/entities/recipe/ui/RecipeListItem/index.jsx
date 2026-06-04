import { Link } from 'react-router-dom';
import { RouterPath } from '@/shared/config/routerConfig';
import { InfoLabel } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import LikeIcon from '@/assets/icons/like.svg?react';

const RecipeListItem = ({ recipe }) => {
  const totalTime = (recipe?.prepTimeMinutes ?? 0) + (recipe?.cookTimeMinutes ?? 0);
  const cuisineLabel = recipe?.cuisine ?? 'Cuisine';
  // const difficultyLabel = recipe?.difficulty ?? 'Easy';

  return (
    <Link
      to={RouterPath.recipe_detail.replace(':id', recipe.id)}
      className="block overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <article className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_auto]">
        {recipe?.image ? (
          <img
            src={recipe.image}
            alt={recipe.name ?? 'Recipe'}
            className="h-full min-h-44 w-full bg-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-44 items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}

        <div className="flex min-w-0 flex-col justify-between gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-slate-900">
              {recipe?.name ?? 'RecipeListItem'}
            </h3>
            {/* Описание */}
            <p className="max-w-2xl text-sm text-slate-500">
              {recipe?.description ??
                `A simple and delicious ${recipe?.cuisine?.toLowerCase() || 'cuisine'} classic with fresh ingredients.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <InfoLabel icon={TimerIcon} value={`${totalTime || 0} min`} />
            <InfoLabel icon={FireIcon} value={`${recipe?.caloriesPerServing ?? 0} kcal`} />
            <InfoLabel icon={UtensilsIcon} value={`${recipe?.servings ?? 0} servings`} />
            <InfoLabel icon={ChefHatIcon} value={cuisineLabel} />
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 py-4 pr-4 md:flex-col md:items-end">
          <span className="rounded-full p-2 text-slate-700">
            <LikeIcon aria-hidden="true" className="size-5" />
          </span>

          {/* <div className="flex flex-col items-end gap-2 text-right text-sm text-slate-600">
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
              {difficultyLabel}
            </span>
            <span className="font-medium text-slate-500">{recipe?.rating ?? 0} rating</span>
          </div> */}
        </div>
      </article>
    </Link>
  );
};

export default RecipeListItem;
