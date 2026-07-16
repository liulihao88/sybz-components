import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import Icons from 'unplugin-icons/vite'

const rootDir = resolve(__dirname, '../../../../')
const chartEntryFiles = readdirSync(__dirname, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts')
  .map((entry) => entry.name.replace(/\.ts$/, ''))

const chartEntries = Object.fromEntries(
  chartEntryFiles.map((entryName) => [`charts/${entryName}`, resolve(__dirname, `./${entryName}.ts`)]),
)

const externalPackages = [
  'vue',
  'element-plus',
  '@element-plus/icons-vue',
  '@vueuse/core',
  '@sybz-components/utils',
  'echarts',
]
const isExternalPackage = (id) =>
  externalPackages.includes(id) ||
  /^element-plus(\/|$)/.test(id) ||
  /^@element-plus\/icons-vue(\/|$)/.test(id) ||
  /^@vueuse\/core(\/|$)/.test(id) ||
  /^echarts(\/|$)/.test(id) ||
  /^@sybz-components\/utils(\/|$)/.test(id)

export default defineConfig({
  root: rootDir,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
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
  ],
  resolve: {
    alias: {
      '@': resolve(rootDir, './packages'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
})
