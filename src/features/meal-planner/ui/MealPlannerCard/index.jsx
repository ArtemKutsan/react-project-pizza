import { useDispatch } from 'react-redux';
import { removeMeal } from '@/features/meal-planner/model/mealPlanSlice';
import LikeIcon from '@/assets/icons/like.svg?react';
import TrashIcon from '@/assets/icons/trash.svg?react';

const MealPlannerCard = ({ item, day, mealPeriod }) => {
  const dispatch = useDispatch();

  const handleRemoveMeal = () => {
    dispatch(removeMeal({ day, mealPeriod }));
  };

  return (
    <article
      data-day={day}
      data-meal-period={mealPeriod}
      className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white text-left"
    >
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-20 flex-col gap-2 justify-between bg-white/95 p-4 transition-all duration-200 group-hover:h-full group-hover:bg-white">
        <span className="truncate text-sm font-medium leading-5 text-slate-700 group-hover:whitespace-normal">
          {item.title}
        </span>
      </div>

      <div className="absolute z-10 bottom-0 inset-x-0 flex items-center justify-between gap-2 p-4 group-hover:bg-white">
        <span className="text-xs text-slate-500 group-hover:hidden">
          {item.caloriesPerServing} kcal
        </span>
        <button
          type="button"
          onClick={handleRemoveMeal}
          className="hidden cursor-pointer group-hover:block"
          aria-label={`Remove ${item.title} from ${day} ${mealPeriod}`}
        >
          <TrashIcon className="size-4 text-slate-700" aria-hidden="true" />
        </button>
        <LikeIcon className="size-4 text-slate-700" aria-hidden="true" />
      </div>
    </article>
  );
};

export default MealPlannerCard;
