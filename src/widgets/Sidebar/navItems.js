// src/widgets/Sidebar/navItems.js
import { RouterPath } from '@/shared/config/routerConfig';
import HomeIcon from '@/assets/icons/home.svg?react';
import CategoriesIcon from '@/assets/icons/categories.svg?react';
import ListIcon from '@/assets/icons/list.svg?react';

// Конфигурация навигационных пунктов для сайдбара, которая включает путь, метку и иконку для каждого пункта
export const navItems = [
  { to: RouterPath.recipes, label: 'Recipes', Icon: HomeIcon },
  { to: RouterPath.categories, label: 'Categories', Icon: CategoriesIcon },
  { to: RouterPath.meal_planner, label: 'Meal Planner', Icon: ListIcon },
];
