import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'

const rootDir = resolve(__dirname, '../../../../')

const externalPackages = [
  'vue',
  'element-plus',
  '@element-plus/icons-vue',
  '@vueuse/core',
  '@sybz-components/utils',
  'echarts',
  'vue-echarts',
]
const isExternalPackage = (id) =>
  externalPackages.includes(id) ||
  /^element-plus(\/|$)/.test(id) ||
  /^@element-plus\/icons-vue(\/|$)/.test(id) ||
  /^@vueuse\/core(\/|$)/.test(id) ||
  /^echarts(\/|$)/.test(id) ||
  /^vue-echarts(\/|$)/.test(id) ||
  /^@sybz-components\/utils(\/|$)/.test(id)

export default defineConfig({
  root: rootDir,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        charts: resolve(__dirname, './index.ts'),
        'charts/chart': resolve(__dirname, './chart.ts'),
        'charts/count-bar': resolve(__dirname, './count-bar.ts'),
        'charts/count-bar-old': resolve(__dirname, './count-bar-old.ts'),
        'charts/object-line': resolve(__dirname, './object-line.ts'),
        'charts/quota-pie': resolve(__dirname, './quota-pie.ts'),
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
    VueSetupExtend(),
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
