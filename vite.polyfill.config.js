import { defineConfig } from 'vite'
import { resolve } from 'node:path'

/**
 * 单独产出 dist/polyfill.js：
 * - 按需入口 dist/components/*.js 会通过 `import '../polyfill.js'` 自动带上；
 * - 业务项目也可以显式 `import 'sybz-components/polyfill'`；
 * - 主入口 dist/index.js / UMD 产物内部已经内置同一份 polyfill。
 */
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'chrome60',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'packages/compat/polyfills.ts'),
      formats: ['es'],
      fileName: () => 'polyfill',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'polyfill.js',
        chunkFileNames: 'compat/[name]-[hash].js',
        assetFileNames: 'compat/[name][extname]',
      },
    },
  },
})
