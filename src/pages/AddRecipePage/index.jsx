// src/pages/AddRecipePage/index.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createRecipe } from '@/entities/recipe';
import {
  RecipeForm,
  resetAddRecipeState,
  selectAddRecipeError,
  selectAddRecipeStatus,
} from '@/features/add-recipe';

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

const AddRecipePage = () => {
  // Диспетчер Redux для отправки действий в store
  const dispatch = useDispatch();
  // Селекторы для получения статуса создания рецепта и возможной ошибки из Redux store
  const addRecipeStatus = useSelector(selectAddRecipeStatus);
  // Селектор для получения возможной ошибки при создании рецепта из Redux store
  const addRecipeError = useSelector(selectAddRecipeError);
  // Инициализация React Hook Form с начальными значениями формы
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialFormValues,
  });

  // Обработчик отправки формы, который создает новый рецепт на основе данных из формы и добавляет его в Redux store
  const onSubmit = async (formValues) => {
    const nextRecipe = {
      name: formValues.name.trim(),
      image: formValues.image.trim(),
      cuisine: formValues.cuisine.trim(),
      // Преобразуем строку типов блюд в массив, удаляя лишние пробелы и пустые строки
      mealType: formValues.mealType
        .split(',') // Разделяем строку по запятым, чтобы получить массив типов блюд
        .map((item) => item.trim()) // Удаляем лишние пробелы вокруг каждого типа блюда
        .filter(Boolean), // Удаляем пустые строки из массива, которые могут возникнуть из-за лишних запятых или пробелов
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

    // Отправляем действие для создания рецепта и обрабатываем результат
    try {
      // Диспетчеризуем createRecipe и через unwrap получаем созданный рецепт или ошибку
      const createdRecipe = await dispatch(createRecipe(nextRecipe)).unwrap();

      console.log('DummyJSON recipe response:', createdRecipe);
      // Сбрасываем форму к начальному состоянию после успешного создания рецепта
      reset(initialFormValues);
      // Сбрасываем состояние создания рецепта в Redux store, чтобы очистить статус и ошибки
      dispatch(resetAddRecipeState());
    } catch (error) {
      console.error('Failed to create recipe:', error);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Add Recipe</h1>
        <p className="text-muted-foreground">Add a new recipe to the local store.</p>
      </header>

      <RecipeForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        message={
          addRecipeStatus === 'loading'
            ? 'Creating recipe...'
            : addRecipeStatus === 'failed'
              ? addRecipeError
              : addRecipeStatus === 'succeeded'
                ? 'Recipe added to store.'
                : ''
        }
        isSubmitting={addRecipeStatus === 'loading'}
      />
    </section>
  );
};

export default AddRecipePage;
