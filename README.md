# React + Vite — FSD Architecture

## Структура проекта

Проект следует методологии Feature-Sliced Design (FSD). Исходный код находится в `src/` и разделён на слои.

```
src/
  app/          — инициализация приложения, провайдеры, глобальные стили
  pages/        — страницы приложения
  widgets/      — самостоятельные крупные блоки UI
  shared/       — переиспользуемые утилиты, UI-компоненты, конфигурации
```

### Слои и их ответственность

**app** — точка входа. Содержит корневой компонент `App`, провайдер роутера `AppRouter` и глобальные стили. Слой ни от кого не зависит снизу, он сам оркестрирует остальные части.

**pages** — по одной папке на страницу. Каждая страница — изолированный компонент, не знающий о других страницах. Текущие страницы:

- `MainPage` — главная
- `RecipesPage` — список рецептов (загружает данные из API)
- `RecipePageDetail` — детальный вид рецепта по `id`
- `NotFoundPage` — заглушка для несуществующих маршрутов

**widgets** — крупные независимые блоки интерфейса, встраиваемые в `app` или `pages`. Единственный виджет — `Sidebar`, который рендерит навигационное меню.

**shared** — код без привязки к бизнес-логике. Содержит:

- `shared/config/routerConfig.jsx` — декларация всех маршрутов
- `shared/ui/PageLoader.jsx` — компонент индикатора загрузки

---

## routerConfig

Файл: [src/shared/config/routerConfig.jsx](src/shared/config/routerConfig.jsx)

Весь роутинг описан в одном месте тремя связанными объектами.

### AppRouter

```js
export const AppRouter = {
  MAIN: 'main',
  RECIPE: 'recipe',
  RECIPE_DETAIL: 'recipe_detail',
  NOT_FOUND: 'not_found',
};
```

Перечисление-ключей. Служит единственным источником правды для имён маршрутов. Используется как ключ при обращении к `RouterPath` и `routeConfig`, чтобы исключить опечатки в строках.

### RouterPath

```js
export const RouterPath = {
  [AppRouter.MAIN]: '/',
  [AppRouter.RECIPE]: '/recipe',
  [AppRouter.RECIPE_DETAIL]: '/recipe/:id',
  [AppRouter.NOT_FOUND]: '*',
};
```

Маппинг ключ → URL-путь. Компоненты, которым нужно сформировать ссылку, импортируют `RouterPath` и подставляют нужный ключ:

```js
// Sidebar/index.jsx
<Link to={RouterPath.main}>Main</Link>

// RecipesPage.jsx
<Link to={RouterPath.recipe_detail.replace(":id", recipe.id)}>
```

Это означает, что если URL маршрута изменится, достаточно поправить `RouterPath` — все `Link` подхватят изменение автоматически.

### routeConfig

```js
export const routeConfig = {
  [AppRouter.MAIN]: {
    path: RouterPath.main,
    element: <MainPage />,
  },
  [AppRouter.RECIPE]: {
    path: RouterPath.recipe,
    element: <RecipesPage />,
  },
  [AppRouter.RECIPE_DETAIL]: {
    path: RouterPath.recipe_detail,
    element: <RecipePageDetail />,
  },
  [AppRouter.NOT_FOUND]: {
    path: RouterPath.not_found,
    element: <NotFoundPage />,
  },
};
```

Полная декларация маршрутов: путь и соответствующий компонент страницы. Объект потребляется `AppRouter`-провайдером для динамической генерации `<Route>`.

---

## AppRouter (провайдер)

Файл: [src/app/providers/router/AppRouter.jsx](src/app/providers/router/AppRouter.jsx)

```jsx
const AppRouter = () => {
  const renderWithWrapper = (route) => {
    const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
    return <Route key={route.path} path={route.path} element={element} />;
  };

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
```

Компонент берёт все значения из `routeConfig`, обходит их через `map` и для каждого маршрута:

1. Оборачивает элемент страницы в `<Suspense>` с фоллбэком `<PageLoader />`. Это позволяет подключать `React.lazy`-загрузку страниц без изменения этого компонента — он уже готов к lazy imports.
2. Рендерит `<Route path={...} element={...} />` с ключом по пути.

Итоговый `<Routes>` передаётся напрямую в `App`.

Пример итогового `<Routes>`:

```js
<Routes>
  <Route
    path="/"
    element={
      <Suspense fallback={<PageLoader />}>
        <MainPage />
      </Suspense>
    }
  />
  <Route
    path="/recipe"
    element={
      <Suspense fallback={<PageLoader />}>
        <RecipesPage />
      </Suspense>
    }
  />
  <Route
    path="/recipe/:id"
    element={
      <Suspense fallback={<PageLoader />}>
        <RecipePageDetail />
      </Suspense>
    }
  />
  <Route
    path="*"
    element={
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    }
  />
</Routes>
```

---

## Поток инициализации

```
main.jsx
  BrowserRouter           — предоставляет контекст роутера
    App
      Sidebar             — навигация, использует RouterPath для ссылок
      AppRouter           — читает routeConfig, рендерит Routes
        Suspense
          <страница>      — рендерится по совпавшему маршруту
```

`BrowserRouter` оборачивает всё приложение на уровне `main.jsx`, поэтому и `Sidebar`, и `AppRouter`
имеют доступ к контексту роутера.
