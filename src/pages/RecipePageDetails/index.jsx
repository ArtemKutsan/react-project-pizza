import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import {
  selectRecipeById,
  selectRecipesError,
  selectRecipesStatus,
} from '@/entities/recipe/model/selectors';
import { fetchRecipes } from '@/entities/recipe/model/thunks';

const RecipePageDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => selectRecipeById(state, id));
  const status = useSelector(selectRecipesStatus);
  const error = useSelector(selectRecipesError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  const tags = recipe.tags ?? [];
  const mealTypes = recipe.mealType ?? [];
  const ingredients = recipe.ingredients ?? [];
  const instructions = recipe.instructions ?? [];

  return (
    <section className="mx-auto">
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="h-full">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full min-h-64 w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-8 px-8 py-8">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-lime-700">
                {recipe.difficulty}
              </span>
              <span className="inline-flex items-baseline gap-2 text-sm text-slate-700">
                <span className="text-lg text-amber-400">★</span>
                <span className="font-medium text-slate-700">{recipe.rating}</span>
                <span>({recipe.reviewCount} reviews)</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
                {recipe.name}
              </h1>
              {/* Описание */}
              <p className="max-w-2xl text-slate-500">
                {recipe?.description ??
                  `A simple and delicious ${recipe?.cuisine?.toLowerCase() || 'cuisine'} classic with fresh ingredients.`}
              </p>
            </div>

            <div className="grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <TimerIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Prep Time</div>
                </div>
                <span className="text-sm font-medium text-slate-400">
                  {recipe.prepTimeMinutes} mins
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <TimerIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Cook Time</div>
                </div>
                <span className="text-sm font-medium text-slate-400">
                  {recipe.cookTimeMinutes} mins
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ServingsIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Servings</div>
                </div>
                <span className="text-sm font-medium text-slate-400">{recipe.servings}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ChefHatIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Cuisine</div>
                </div>
                <span className="text-sm font-medium text-slate-400">{recipe.cuisine}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FireIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Calories</div>
                </div>
                <span className="text-sm font-medium text-slate-400">
                  {recipe.caloriesPerServing} kcal
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <UtensilsIcon className="size-5 text-slate-700" aria-hidden="true" />
                  <div className="text-sm text-slate-700">Meal Type</div>
                </div>
                <span className="text-sm font-medium text-slate-400">{mealTypes.join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-4 py-2 text-sm text-lime-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-y-8 border-t border-slate-200 p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="border-slate-200 lg:border-r lg:pr-8">
            <div className="mb-6 flex items-baseline gap-2">
              <ChefHatIcon className="ml-1.5 size-5 text-lime-700" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900">Ingredients</h2>
            </div>
            <ul className="space-y-4">
              {ingredients.map((ingredient) => (
                <li key={ingredient} className="flex items-center gap-4 text-slate-600">
                  <span className="ml-3 size-2 rounded-full bg-lime-700" aria-hidden="true" />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-slate-200 lg:pl-8">
            <div className="mb-6 flex items-baseline gap-2">
              <ListIcon className="ml-1.5 size-5 text-lime-700" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900">Instructions</h2>
            </div>
            <ol className="space-y-6">
              {instructions.map((instruction, index) => (
                <li key={instruction} className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-lime-700 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-slate-600">{instruction}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4 text-slate-600">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-lime-700">
              <ChefHatIcon className="size-5" aria-hidden="true" />
            </span>
            <p>Tip: Use the freshest ingredients for the best flavor!</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default RecipePageDetail;
