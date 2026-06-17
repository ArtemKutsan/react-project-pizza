const MealPlannerSlot = ({ day, mealPeriod, onAddMeal }) => {
  return (
    <button
      type="button"
      onClick={() => onAddMeal({ day, mealPeriod })}
      className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed text-sm text-muted-foreground hover:border-muted-foreground hover:text-foreground"
    >
      + Add meal
    </button>
  );
};

export default MealPlannerSlot;
