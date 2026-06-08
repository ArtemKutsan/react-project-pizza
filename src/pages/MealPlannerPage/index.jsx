// src/pages/MealPlannerPage/index.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addRecipe } from '@/entities/recipe/model/recipesSlice';
import { selectRecipes } from '@/entities/recipe/model/selectors';
import { RecipeForm } from '@/features/AddRecipe';

// Начальное состояние формы для создания нового рецепта
const initialFormValues = {
  name: '',
  image: '',
  cuisine: '',
  mealType: '',
  difficulty: 'Easy',
  servings: 4,
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  caloriesPerServing: 300,
  tags: '',
  ingredients: '',
  instructions: '',
};

const MealPlannerPage = () => {
  // Диспетчер Redux для отправки действий в store
  const dispatch = useDispatch();
  // Получаем список рецептов из состояния Redux, чтобы определить следующий уникальный id для нового рецепта
  const recipes = useSelector(selectRecipes);
  // Локальное состояние для управления формой и отображения сообщений пользователю
  const [message, setMessage] = useState('');
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialFormValues,
  });
  // Вычисляем следующий уникальный id для нового рецепта, основываясь на существующих рецептах в состоянии Redux
  const nextRecipeId =
    recipes.reduce((maxRecipeId, recipe) => Math.max(maxRecipeId, Number(recipe.id) || 0), 0) + 1;

  // Обработчик отправки формы, который создает новый рецепт на основе данных из формы и добавляет его в Redux store
  const onSubmit = (formValues) => {
    const nextRecipe = {
      id: nextRecipeId,
      name: formValues.name.trim(),
      image: formValues.image.trim(),
      cuisine: formValues.cuisine.trim(),
      // Преобразуем строку с типами блюд в массив, удаляя лишние пробелы и пустые элементы
      mealType: formValues.mealType
        .split(',') // Разделяем строку по запятым, чтобы получить массив типов блюд
        .map((item) => item.trim()) // Удаляем лишние пробелы вокруг каждого элемента
        .filter(Boolean), // Удаляем пустые элементы из массива, которые могут возникнуть из-за лишних запятых или пробелов
      difficulty: formValues.difficulty,
      servings: Number(formValues.servings),
      prepTimeMinutes: Number(formValues.prepTimeMinutes),
      cookTimeMinutes: Number(formValues.cookTimeMinutes),
      caloriesPerServing: Number(formValues.caloriesPerServing),
      tags: formValues.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      ingredients: formValues.ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: formValues.instructions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      rating: 0,
      reviewCount: 0,
      userId: 1,
    };

    // Отправляем действие для добавления нового рецепта в Redux store
    dispatch(addRecipe(nextRecipe));
    // Сбрасываем форму к начальным значениям и отображаем сообщение пользователю о том, что рецепт был добавлен
    reset(initialFormValues);
    // Устанавливаем сообщение для отображения пользователю после добавления рецепта
    setMessage('Recipe added to store.');
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Create Recipe</h1>
        <p className="text-slate-500">Add a new recipe to the local store.</p>
      </header>

      <RecipeForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} message={message} />
    </section>
  );
};

export default MealPlannerPage;
