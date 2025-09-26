import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import vitest from '@vitest/eslint-plugin'
import prettier from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibrary from 'eslint-plugin-testing-library'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const isCI = process.env.CI === 'true'
const importXTypescript = importX.flatConfigs?.typescript ?? importX.configs['flat/typescript']
const testingLibraryReact = testingLibrary.configs['flat/react']
const jsxA11yRecommendedRules = jsxA11y.configs.recommended?.rules ?? {}

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'playwright-report', 'node_modules', '.pnpm-store']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      importXTypescript,
      testingLibraryReact,
      prettier,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        project: ['./tsconfig.eslint.json', './tsconfig.playwright.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
    },
    plugins: {
      'jsx-a11y': jsxA11y,
      '@stylistic': stylistic,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import-x': {
        typescript: {
          configPaths: ['./tsconfig.eslint.json', './tsconfig.playwright.json'],
        },
      },
    },
    rules: {
      ...jsxA11yRecommendedRules,
      'no-console': isCI ? 'error' : ['warn', { allow: ['warn', 'error'] }],
      'import-x/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import-x/no-unresolved': [
        'error',
        {
          ignore: ['^/'],
        },
      ],
      'import-x/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'import-x/prefer-default-export': 'off',
      'import-x/no-relative-packages': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'],
        },
      ],
      'react/no-array-index-key': 'warn',
      'react/jsx-no-target-blank': [
        'error',
        {
          allowReferrer: true,
        },
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/no-autofocus': [
        'warn',
        {
          ignoreNonDOM: true,
        },
      ],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/no-trailing-spaces': 'error',
    },
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
    extends: [vitest.configs.recommended],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: [
      '**/vite.config.{ts,mts,cts}',
      '**/vitest.config.{ts,mts,cts}',
      '**/playwright.config.{ts,mts,cts}',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'import-x/no-unused-modules': 'off',
    },
  },
  {
    files: ['tests/e2e/**/*.{ts,tsx}'],
    rules: {
      'testing-library/prefer-screen-queries': 'off',
      'testing-library/prefer-presence-queries': 'off',
      'testing-library/no-await-sync-query': 'off',
      'testing-library/no-wait-for-side-effects': 'off',
    },
  },
])
