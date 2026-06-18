# RecipeBox

Учебное SPA-приложение для просмотра рецептов, фильтрации по категориям, создания рецептов, профиля пользователя и составления недельного плана питания.

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
- semantic design tokens и шрифт Onest

Данные рецептов и пользователей временно загружаются из DummyJSON. Это provider для быстрого старта. Долгосрочная цель — собственный Node.js API и MongoDB Atlas.

## Возможности

- просмотр списка рецептов;
- поиск, сортировка и постраничная загрузка списка рецептов;
- переход на страницу подробной информации о рецепте;
- фильтрация рецептов по типу блюда и кухне;
- отправка формы создания рецепта в DummyJSON;
- профиль текущего пользователя;
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

| Путь            | Страница                       |
| --------------- | ------------------------------ |
| `/`             | `MainPage`                     |
| `/recipes`      | `RecipesPage`                  |
| `/recipes/:id`  | `RecipeDetailsPage`            |
| `/categories`   | `CategoriesPage`               |
| `/add-recipe`   | `AddRecipePage`                |
| `/meal-planner` | `MealPlannerPage`              |
| `/profile`      | `ProfilePage`                  |
| `/users/:id`    | публичный профиль пользователя |
| `*`             | `NotFoundPage`                 |

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
- `ProfilePage`;
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

#### `recipe-discovery`

Содержит UI управления поиском и сортировкой рецептов, а также конфигурацию доступных опций.

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
- хранение базового списка в Redux для экранов, которым нужен общий каталог;
- локальные query-запросы для страниц discovery со своей пагинацией;
- селекторы и хук `useRecipes`;
- API-границу `getRecipes`;
- создание рецепта через API;
- компоненты `RecipeList` и `RecipeListItem`;
- функции фильтрации, нормализации и сборки query-параметров.

Внешние слои используют публичный API:

```js
import { createRecipe, getRecipes, recipesReducer, useRecipes } from '@/entities/recipe';
```

`entities/user` отвечает за:

- загрузку пользователя по ID;
- нормализацию данных пользователя к контракту RecipeBox;
- хранение пользователей в Redux-кэше;
- селекторы состояния пользователя.

### Shared

Содержит:

- `Button`;
- `Modal`;
- `FormField`;
- `InfoLabel`;
- `Badge`;
- `BulletList`;
- `NumberedList`;
- helper `cn`;
- hook `useDebounce`;
- общие пути маршрутов.

## Redux

Store содержит четыре части состояния:

```js
{
  recipes,
  users,
  addRecipe,
  mealPlan,
}
```

### Recipes

`useRecipes` запускает базовую загрузку рецептов в общий store, если статус списка равен `idle`, и возвращает:

```js
{
  recipes,
  status,
  error,
}
```

`RecipesPage` использует локальный query-fetch через `getRecipes(query)`, чтобы поиск, сортировка и пагинация не перезаписывали общий каталог в Redux.

### Users

`entities/user` хранит пользователей по ID:

```js
{
  users: {
    items: {
      1: { id: 1, firstName: '...', lastName: '...' },
    },
  },
}
```

Пока профиль использует временного текущего пользователя. После появления авторизации этот источник будет заменён.

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

<TimerIcon aria-hidden="true" />;
```

## Текущие ограничения

- DummyJSON не сохраняет созданные рецепты;
- DummyJSON остаётся временным API-provider до появления собственного backend;
- Meal Planner пока не сохраняется в `localStorage` или на сервере;
- начальный Meal Planner использует временные mock-данные;
- публичные профили пользователей пока подготовлены только на уровне маршрута и сущности;
- RTK Query пока не используется.
