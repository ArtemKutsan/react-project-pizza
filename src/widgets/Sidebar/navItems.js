import { RouterPath } from '@/shared/config/routerConfig';
import HomeIcon from '@/assets/icons/home.svg?react';
import CategoriesIcon from '@/assets/icons/categories.svg?react';

export const navItems = [
  { to: RouterPath.recipe, label: 'Recipes', Icon: HomeIcon },
  { to: RouterPath.categories, label: 'Categories', Icon: CategoriesIcon },
];
