import react from '@vitejs/plugin-react-swc'
import { defaultExclude, defineConfig } from 'vitest/config'

// Конфигурация Vitest для модульных и компонентных тестов.
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    exclude: [...defaultExclude, 'tests/e2e/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/unit',
    },
  },
})
