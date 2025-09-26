# Стек Experiments Frontend

TypeScript-проект на React 19 и Vite с заранее настроенными инструментами: линтерами (ESLint, Stylelint), форматированием (Prettier), модульными тестами (Vitest) и e2e-тестами (Playwright). Git-хуки на базе Husky и lint-staged автоматизируют проверки перед коммитами и пушами.

## Ключевые возможности

- Управление `<head>` через `@dr.pogodin/react-helmet`, совместимый с React 19.
- Быстрая разработка на Vite с поддержкой React Refresh.
- Жёсткие линтеры и автоформатирование под единый стиль кода.
- Стили на чистом SCSS: глобальные и компонентные файлы без `.css`.
- Тесты на всех уровнях: компонентные (Vitest) и сквозные (Playwright).
- Husky + lint-staged обеспечивают запуск проверок на этапе git-хуков.
- Состояние приложения на MobX с готовым `RootStoreProvider` и типизированными сторами.

## Требования

- Node.js версии 20 или выше.
- pnpm версии 9 или выше.

  Установка зависимостей:

  ```bash
  pnpm install
  ```

## Управление мета-тегами

Приложение использует `@dr.pogodin/react-helmet` вместо устаревшего `react-helmet-async`. Корневой компонент обёрнут в `HelmetProvider`, а конкретные страницы задают теги через `Helmet`:

```tsx
import { Helmet } from '@dr.pogodin/react-helmet'

export function ExamplePage() {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Заголовок страницы</title>
        <meta name="description" content="Краткое описание для поисковиков" />
      </Helmet>
      {/* ...остальная разметка... */}
    </>
  )
}
```

Если создаёте новую точку входа, не забудьте добавить `HelmetProvider` вокруг приложения:

```tsx
createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
```

## Состояние приложения на MobX

- В `src/stores/` лежит базовая инфраструктура: `CounterStore`, `RootStore` и `RootStoreProvider`.
- Стор создаётся всего один раз и пробрасывается через контекст, доступ к нему осуществляется хуком `useRootStore`, а к конкретному стору — `useCounterStore`.
- В компонентном тесте и в `main.tsx` приложение уже обёрнуто в провайдер, поэтому готово к расширению новыми сторами.

Пример создания собственного стора:

```ts
import { makeAutoObservable } from 'mobx'

export class TodosStore {
  todos: string[] = []

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  add(todo: string) {
    this.todos.push(todo)
  }
}
```

Чтобы подключить стор к корневому, зарегистрируйте его в `RootStore` и создайте хук-помощник по аналогии с `useCounterStore`. В компоненте используйте `observer` и новый хук:

```tsx
import { observer } from 'mobx-react-lite'

import { useRootStore } from '../stores/root-store-context'

export const TodosList = observer(() => {
  const { todosStore } = useRootStore()

  return (
    <ul>
      {todosStore.todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  )
})
```

Такой подход оставляет состояние централизованным и избавляет от ручной настройки MobX в каждом компоненте.

## Стилизация на SCSS

- Глобальные стили подключаются из `src/index.scss`, а компонентные — из `src/App.scss`. При необходимости создавайте дополнительные частичные файлы и импортируйте их как модули.
- Stylelint и lint-staged настроены на работу только с `.scss`, поэтому новые CSS-файлы не понадобятся.
- Используйте полный синтаксис SCSS: вложенность, переменные и миксины поддерживаются благодаря плагину `postcss-scss` и установленному `sass`.

## Доступные команды

```bash
pnpm dev               # Запустить dev-сервер Vite
pnpm build             # Проверить типы и собрать production-бандл
pnpm preview           # Просмотреть собранный бандл локально

pnpm lint:ts           # Запустить ESLint с типовой проверкой
pnpm lint:styles       # Проверить стили Stylelint’ом
pnpm lint              # Комплексно запустить ESLint и Stylelint
pnpm format            # Отформатировать код Prettier’ом

pnpm test              # Модульные тесты Vitest в CI-режиме
pnpm test:watch        # Vitest в режиме наблюдения
pnpm test:coverage     # Vitest с отчётом о покрытии

pnpm test:e2e          # Запустить Playwright по всем браузерам из конфига
pnpm test:e2e:headed   # Playwright с открытием браузера
pnpm test:e2e:debug    # Playwright в отладочном режиме
pnpm test:e2e:ui       # Интерфейс Playwright Test Runner
pnpm test:e2e:report   # Открыть последний HTML-отчёт Playwright

pnpm test:all          # Последовательно запустить Vitest и Playwright
pnpm lint:staged       # Ручной запуск lint-staged (как в pre-commit хуке)
```

## Тестовый стек

- **Vitest** + Testing Library (`src/App.test.tsx`) покрывают компонентный уровень, в тестах задействован `HelmetProvider`.
- **Playwright** (`tests/e2e/app.spec.ts`) проверяет пользовательские сценарии и валидирует заголовок страницы.
  - Конфигурация — `playwright.config.ts`. Здесь же указаны параметры dev-сервера, съёмка трасс и скриншотов.
  - Отдельный TypeScript-проект для e2e описан в `tsconfig.playwright.json`.

  Папки `playwright-report`, `blob-report` и `test-results` добавлены в `.gitignore`, поэтому артефакты прогонов не попадут в репозиторий.

## Линтинг и форматирование

- ESLint (файл `eslint.config.js`) объединяет правила TypeScript ESLint, React, JSX-a11y, Testing Library и Stylistic.
- Stylelint (файл `stylelint.config.cjs`) опирается на `stylelint-config-standard-scss` и `stylelint-config-clean-order`.
- Prettier настроен с плагинами для сортировки импортов и `package.json`, а `stylelint-prettier` синхронизирует форматирование SCSS.

  Для комплексной проверки качества кода выполните:

  ```bash
  pnpm lint && pnpm test:all
  ```

## Git-хуки

- `pre-commit` запускает `pnpm lint:staged`, применяя ESLint, Stylelint и Prettier только к индексированным файлам.
- `pre-push` выполняет `pnpm test:all` и блокирует отправку, если падают модульные или e2e-тесты.

  Хуки ставятся автоматически благодаря скрипту `prepare`. При необходимости переустановить их вручную используйте:

  ```bash
  pnpm exec husky install
  ```

## Структура проекта

```text
src/                 — исходный код приложения
tests/e2e/           — сценарии Playwright
playwright.config.ts — конфигурация e2e-тестов
vitest.config.ts     — конфигурация Vitest
tsconfig.*.json      — независимые TS-проекты для приложений и тестов
```

## IDE и советы

- Включите автоформатирование по сохранению, чтобы Prettier и Stylelint поддерживали единый стиль.
- Используйте типы `@playwright/test` и `vitest/globals`, подключённые через `tsconfig`, чтобы получать автодополнение в тестах.

  Удачной разработки!
