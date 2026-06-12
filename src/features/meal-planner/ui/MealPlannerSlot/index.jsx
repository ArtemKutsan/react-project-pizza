const MealPlannerSlot = ({ day, mealPeriod, onAddMeal }) => {
  return (
    <button
      type="button"
      onClick={() => onAddMeal({ day, mealPeriod })}
      className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-400"
    >
      + Add meal
    </button>
  );
};

export default MealPlannerSlot;
