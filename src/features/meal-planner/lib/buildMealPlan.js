const buildRecipeMeta = (recipe) => ({
  title: recipe.name,
  image: recipe.image,
  caloriesPerServing: recipe.caloriesPerServing,
});

export const buildMealPlan = ({ mealPeriods, recipesByMealType, placement }) =>
  mealPeriods.map(({ label, Icon }) => {
    const recipes = recipesByMealType[label] ?? [];
    const recipeIndexes = placement[label] ?? [];

    const items = recipeIndexes.map((recipeIndex) =>
      recipeIndex === null || !recipes[recipeIndex]
        ? null
        : buildRecipeMeta(recipes[recipeIndex]),
    );

    return { label, Icon, items };
  });
