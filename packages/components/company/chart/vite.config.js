import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import Icons from 'unplugin-icons/vite'
import { COMPAT_TARGET, babelCompatPlugin, polyfillEntryPlugin } from '../../../../scripts/build-compat.mjs'

const rootDir = resolve(__dirname, '../../../../')
const chartEntryFiles = readdirSync(__dirname, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts')
  .map((entry) => entry.name.replace(/\.ts$/, ''))

const chartEntries = Object.fromEntries(
  chartEntryFiles.map((entryName) => [`charts/${entryName}`, resolve(__dirname, `./${entryName}.ts`)]),
)

const externalPackages = ['vue', 'element-plus', '@element-plus/icons-vue', '@vueuse/core', 'echarts']
const isExternalPackage = (id) =>
  externalPackages.includes(id) ||
  /^element-plus(\/|$)/.test(id) ||
  /^@element-plus\/icons-vue(\/|$)/.test(id) ||
  /^@vueuse\/core(\/|$)/.test(id) ||
  /^echarts(\/|$)/.test(id)

export default defineConfig({
  root: rootDir,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: COMPAT_TARGET,
    cssTarget: COMPAT_TARGET,
    cssCodeSplit: false,
    lib: {
      entry: {
        charts: resolve(__dirname, './index.ts'),
        ...chartEntries,
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternalPackage,
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => (assetInfo.name === 'style.css' ? 'charts-style.css' : '[name][extname]'),
      },
    },
  },
  plugins: [
    {
      ...terser({
        compress: {
          drop_console: false,
        },
        format: {
          comments: /^@preserve|@keep/i,
        },
      }),
      apply: 'build',
    },
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
    babelCompatPlugin(),
    polyfillEntryPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(rootDir, './packages'),
      '@sybz-components/utils': resolve(rootDir, './packages/utils/src/index.ts'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
})
