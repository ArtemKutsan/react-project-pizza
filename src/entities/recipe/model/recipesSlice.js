// src/entities/recipe/model/recipesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from '@/entities/recipe/model/thunks';

// Example recipe data structure
/*
{
  id: 1,
  name: "Classic Margherita Pizza",
  ingredients: [
    "Pizza dough",
    "Tomato sauce",
    "Fresh mozzarella cheese",
    "Fresh basil leaves",
    "Olive oil",
    "Salt and pepper to taste"
  ],
  instructions: [
    "Preheat the oven to 475°F (245°C).",
    "Roll out the pizza dough and spread tomato sauce evenly.",
    "Top with slices of fresh mozzarella and fresh basil leaves.",
    "Drizzle with olive oil and season with salt and pepper.",
    "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
    "Slice and serve hot."
  ],
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  servings: 4,
  difficulty: "Easy",
  cuisine: "Italian",
  caloriesPerServing: 300,
  tags: ["Pizza", "Italian"],
  userId: 166,
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 98,
  mealType: ["Dinner"]
}
*/

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    // Редьюсер для добавления нового рецепта
    addRecipe(state, action) {
      state.items.push(action.payload);
    },
  },
  // Обработка асинхронного действия для загрузки рецептов
  extraReducers: (builder) => {
    // Здесь мы обрабатываем состояния загрузки, успешного получения данных и ошибки при загрузке рецептов
    builder
      // Когда загрузка рецептов начинается, мы устанавливаем статус на 'loading' и очищаем ошибку
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Когда загрузка рецептов успешно завершается, мы устанавливаем статус на 'succeeded' и сохраняем полученные рецепты в состоянии
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // Если при загрузке рецептов произошла ошибка, мы устанавливаем статус на 'failed' и сохраняем сообщение об ошибке
      .addCase(fetchRecipes.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to load recipes';
      });
  },
});

export const { addRecipe } = recipesSlice.actions;
export const recipesReducer = recipesSlice.reducer;
