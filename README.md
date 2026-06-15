# RecipeBox

Учебное SPA-приложение для просмотра рецептов, фильтрации по категориям, создания рецептов и составления недельного плана питания.

## Стек

- React 19
- Vite 8
- React Router DOM 7
- Redux Toolkit и React Redux
- React Hook Form
- Axios
- Tailwind CSS 4
- `clsx` и `tailwind-merge`
- SVGR

Данные рецептов загружаются из [DummyJSON Recipes API](https://dummyjson.com/docs/recipes).

## Возможности

- просмотр списка рецептов;
- переход на страницу подробной информации о рецепте;
- фильтрация рецептов по типу блюда и кухне;
- отправка формы создания рецепта в DummyJSON;
- недельный Meal Planner;
- добавление, замена и удаление рецептов в слотах Meal Planner;
- адаптивная вёрстка основных страниц;
- общие UI-компоненты и публичные API FSD-слайсов.

## Запуск

```bash
npm install
npm run dev
```

Другие команды:

```bash
npm run lint
npm run build
npm run preview
```

Dev-сервер Vite доступен в локальной сети благодаря параметру `host`.

## Маршруты

| Путь | Страница |
| --- | --- |
| `/` | `MainPage` |
| `/recipes` | `RecipesPage` |
| `/recipes/:id` | `RecipeDetailsPage` |
| `/categories` | `CategoriesPage` |
| `/add-recipe` | `AddRecipePage` |
| `/meal-planner` | `MealPlannerPage` |
| `*` | `NotFoundPage` |

Маршрутизация разделена по ответственности:

- `src/shared/config/routerPaths.js` — ключи `AppRoute` и общие URL-пути `RouterPath`;
- `src/app/providers/router/routeConfig.jsx` — связь путей с компонентами страниц;
- `src/app/providers/router/AppRouter.jsx` — генерация компонентов `<Route>`.

Так `shared` не зависит от верхнего слоя `pages`, а страницы подключаются на уровне `app`.

## Архитектура

Проект следует принципам Feature-Sliced Design:

```text
src/
├── app/        # инициализация, store, router, глобальные стили
├── pages/      # страницы приложения
├── widgets/    # крупные самостоятельные блоки интерфейса
├── features/   # пользовательские сценарии
├── entities/   # бизнес-сущности
├── shared/     # универсальные UI, конфигурация и утилиты
└── assets/     # изображения и SVG-иконки
```

Направление зависимостей:

```text
app → pages → widgets/features → entities → shared
```

Нижние слои не должны импортировать верхние.

### App

- `App.jsx` — общий layout с Sidebar и контентной областью;
- `providers/router` — конфигурация и рендеринг маршрутов;
- `providers/store` — корневой Redux store;
- `styles` — глобальные стили и подключение Tailwind CSS.

### Pages

- `MainPage`;
- `RecipesPage`;
- `RecipeDetailsPage`;
- `CategoriesPage`;
- `AddRecipePage`;
- `MealPlannerPage`;
- `NotFoundPage`.

### Widgets

- `Sidebar` — навигация приложения.

### Features

#### `add-recipe`

Содержит форму создания рецепта, состояние отправки и селекторы статуса.

Публичный API:

```js
import {
  RecipeForm,
  addRecipeReducer,
  resetAddRecipeState,
  selectAddRecipeError,
  selectAddRecipeStatus,
} from '@/features/add-recipe';
```

#### `recipe-categorization`

Содержит UI и конфигурацию выбора типа блюда и кухни.

#### `meal-planner`

Содержит недельный календарь, модальное окно выбора рецепта, Redux slice и сборщик данных для UI.

В Redux хранится только идентификатор рецепта:

```js
{
  plan: {
    Monday: {
      Breakfast: 21,
      Lunch: null,
      Dinner: 1,
      Snack: null,
    },
  },
}
```

Полные объекты рецептов остаются в `entities/recipe`.

### Entities

`entities/recipe` отвечает за:

- загрузку рецептов;
- хранение списка в Redux;
- селекторы и хук `useRecipes`;
- создание рецепта через API;
- компоненты `RecipeList` и `RecipeListItem`;
- функции фильтрации и группировки.

Внешние слои используют публичный API:

```js
import { createRecipe, recipesReducer, useRecipes } from '@/entities/recipe';
```

### Shared

Содержит:

- `Button`;
- `Modal`;
- `FormField`;
- `InfoLabel`;
- `Badge`;
- `BulletList`;
- `NumberedList`;
- `PageLoader`;
- helper `cn`;
- общие пути маршрутов.

## Redux

Store содержит три части состояния:

```js
{
  recipes,
  addRecipe,
  mealPlan,
}
```

### Recipes

`useRecipes` запускает `fetchRecipes`, если статус списка равен `idle`, и возвращает:

```js
{
  recipes,
  status,
  error,
}
```

### Add Recipe

Форма использует React Hook Form. `createRecipe` отправляет POST-запрос:

```text
POST https://dummyjson.com/recipes/add
```

DummyJSON имитирует создание и возвращает объект рецепта, но не сохраняет его в постоянной базе.

### Meal Planner

Meal Planner использует обычный Redux slice:

- `addMeal` добавляет или заменяет `recipeId`;
- `removeMeal` устанавливает слот в `null`.

Сейчас начальное состояние временно заполняется данными из `mockMealPlan.js`. После перезагрузки пользовательские изменения сбрасываются.

## Импорты

В Vite настроен alias:

```js
import { Button } from '@/shared/ui';
```

SVG можно импортировать как React-компоненты:

```jsx
import TimerIcon from '@/assets/icons/timer.svg?react';

<TimerIcon aria-hidden="true" />
```

## Текущие ограничения

- DummyJSON не сохраняет созданные рецепты;
- Meal Planner пока не сохраняется в `localStorage` или на сервере;
- начальный Meal Planner использует временные mock-данные;
- `MainPage` и `NotFoundPage` пока содержат минимальные заглушки;
- список рецептов загружается целиком, без пагинации;
- RTK Query пока не используется.
