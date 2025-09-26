# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

`````js
export default defineConfig([
  globalIgnores(['dist']),
  {
    ````markdown
    # Experiments Frontend Stack

    A strongly typed React 19 + Vite project pre-configured with opinionated tooling for linting, formatting, unit tests (Vitest) and end-to-end tests (Playwright). Git hooks are powered by Husky and lint-staged to keep code quality checks automated.

    ## Prerequisites
# Стек Experiments Frontend

TypeScript-проект на React 19 и Vite c заранее настроенными инструментами: линтерами (ESLint, Stylelint), форматированием (Prettier), модульными тестами (Vitest) и e2e-тестами (Playwright). Git-хуки на базе Husky и lint-staged гарантируют, что проверки запускаются автоматически при коммитах и пушах.

## Требования

- Node.js версии 20 или выше
- pnpm версии 9 или выше

Установка зависимостей:

```bash
pnpm install
`````

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

- **Vitest** + Testing Library (`src/App.test.tsx`) покрывают компонентный уровень.
- **Playwright** (`tests/e2e/app.spec.ts`) проверяет сценарии сквозного взаимодействия.
  - Конфигурация — `playwright.config.ts`. Здесь же указаны параметры dev-сервера, съёмка трасс и скриншотов.
  - Отдельный TypeScript-проект для e2e описан в `tsconfig.playwright.json`.

Папки `playwright-report`, `blob-report` и `test-results` добавлены в `.gitignore`, поэтому артефакты прогонов не попадут в репозиторий.

## Линтинг и форматирование

- ESLint (файл `eslint.config.js`) объединяет правила TypeScript ESLint, React, JSX-a11y, Testing Library и Stylistic.
- Stylelint (файл `stylelint.config.cjs`) опирается на `stylelint-config-standard-scss` и `stylelint-config-clean-order`.
- Prettier настроен с плагинами для сортировки импортов и `package.json`, а `stylelint-prettier` синхронизирует форматирование CSS.

Для комплексной проверки качества кода выполните:

```bash
pnpm lint && pnpm test:all
```

## Git-хуки

- `pre-commit` запускает `pnpm lint:staged`, применяя ESLint, Stylelint и Prettier только к индексированным файлам.
- `pre-push` выполняет `pnpm test:all` и блокирует отправку, если падают модульные или функциональные тесты.

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
- Используйте типы `@playwright/test` и `vitest/globals`, уже подключённые через `tsconfig`, чтобы получать автодополнение на русском описании сценариев.

Удачной разработки!
