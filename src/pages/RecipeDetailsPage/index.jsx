import { useParams } from 'react-router-dom';
import { Badge, BulletList, InfoLabel, NumberedList } from '@/shared/ui';
import TimerIcon from '@/assets/icons/timer.svg?react';
import FireIcon from '@/assets/icons/fire-line.svg?react';
import ServingsIcon from '@/assets/icons/servings.svg?react';
import UtensilsIcon from '@/assets/icons/utensils.svg?react';
import ChefHatIcon from '@/assets/icons/chef-hat.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';
import { useRecipes } from '@/entities/recipe';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const { recipes, status, error } = useRecipes();
  const recipe = recipes.find((item) => String(item.id) === String(id));

  if (status === 'idle' || status === 'loading') {
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

          <div className="flex flex-col gap-8 px-4 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Badge>{recipe.difficulty}</Badge>
              <span className="inline-flex items-baseline gap-2 text-sm text-slate-700">
                <span className="text-lg text-amber-400">★</span>
                <span className="font-medium text-slate-700">{recipe.rating}</span>
                <span>({recipe.reviewCount} reviews)</span>
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {recipe.name}
              </h1>
              {/* Описание */}
              <p className="max-w-2xl text-slate-500">
                {recipe?.description ??
                  `A simple and delicious ${recipe?.cuisine?.toLowerCase() || 'cuisine'} classic with fresh ingredients.`}
              </p>
            </div>

            <div className="grid gap-6 border-y border-slate-200 py-6 sm:grid-cols-2 md:grid-cols-3">
              <InfoLabel
                icon={TimerIcon}
                label="Prep Time"
                value={`${recipe.prepTimeMinutes} mins`}
              />
              <InfoLabel
                icon={TimerIcon}
                label="Cook Time"
                value={`${recipe.cookTimeMinutes} mins`}
              />
              <InfoLabel icon={ServingsIcon} label="Servings" value={recipe.servings} />
              <InfoLabel icon={ChefHatIcon} label="Cuisine" value={recipe.cuisine} />
              <InfoLabel
                icon={FireIcon}
                label="Calories"
                value={`${recipe.caloriesPerServing} kcal`}
              />
              <InfoLabel icon={UtensilsIcon} label="Meal Type" value={mealTypes.join(', ')} />
            </div>

            <div className="flex flex-wrap gap-4">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-y-8 border-t border-slate-200 p-4 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="border-slate-200 lg:border-r lg:pr-8">
            <div className="mb-6 flex items-center gap-2">
              <ChefHatIcon className="ml-1 size-6 text-lime-700" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900">Ingredients</h2>
            </div>
            <BulletList items={ingredients} />
          </section>

          <section className="border-slate-200 lg:pl-8">
            <div className="mb-6 flex items-center gap-2">
              <ListIcon className="ml-1 size-6 text-lime-700" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-slate-900">Instructions</h2>
            </div>
            <NumberedList items={instructions} />
          </section>
        </div>

        <div className="p-4 sm:p-8">
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

export default RecipeDetailsPage;
