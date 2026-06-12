const buildRecipeMeta = (recipe) => ({
  id: recipe.id,
  title: recipe.name,
  image: recipe.image,
  caloriesPerServing: recipe.caloriesPerServing,
});

export const buildMealPlan = ({ days, mealPeriods, mealPlan, recipes }) => {
  // Создаём таблицу быстрого поиска рецепта по ID
  const recipesById = new Map(recipes.map((recipe) => [String(recipe.id), recipe]));

  // Для каждого периода питания формируем семь ячеек в порядке дней недели
  return mealPeriods.map(({ label, Icon }) => {
    const items = days.map(({ label: day }) => {
      const recipeId = mealPlan[day]?.[label];

      if (recipeId === null || recipeId === undefined) return null;

      const recipe = recipesById.get(String(recipeId));

      return recipe ? buildRecipeMeta(recipe) : null;
    });

    return { label, Icon, items };
  });
};
