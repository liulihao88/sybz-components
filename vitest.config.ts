import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@sybz-components/utils': fileURLToPath(new URL('./packages/utils/src/index.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: false,
    include: ['packages/**/__tests__/**/*.{test,spec}.ts'],
    restoreMocks: true,
    clearMocks: true,
  },
})
