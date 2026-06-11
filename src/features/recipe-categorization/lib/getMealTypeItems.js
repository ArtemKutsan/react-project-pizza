// src/features/recipe-categorization/lib/getMealTypeItems.js
import { getMealTypes } from '@/entities/recipe/lib';
import {
  fallbackMealTypeIcon,
  mealTypeIcons,
} from '@/features/recipe-categorization/config/mealTypeIcons';

// Функция getMealTypeItems принимает массив рецептов и возвращает массив объектов, каждый из которых содержит имя типа блюда, количество рецептов для этого типа и соответствующую иконку
export const getMealTypeItems = (recipes) =>
  getMealTypes(recipes).map((mealType) => ({
    ...mealType,
    Icon: mealTypeIcons[mealType.name] ?? fallbackMealTypeIcon,
  }));
