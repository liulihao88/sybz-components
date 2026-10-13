import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import fg from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'

const componentEntries = Object.fromEntries(
  fg
    .sync(['packages/components/*/index.ts', 'packages/components/company/*/index.ts'], {
      ignore: [
        'packages/components/chart/index.ts',
        'packages/components/company/chart/index.ts',
        'packages/components/company/{countBar,countBarOld,objectLine,quotaPie}/index.ts',
      ],
    })
    .map((filePath) => [filePath.replace(/^packages\//, '').replace(/\/index\.ts$/, ''), resolve(__dirname, filePath)]),
)

const isExternalPackage = (id) =>
  /^(vue|element-plus|echarts)(\/|$)/.test(id) ||
  /^@element-plus\/icons-vue(\/|$)/.test(id) ||
  /^@sybz-components\/utils(\/|$)/.test(id)

const buildDate = new Date()
const pad = (value) => String(value).padStart(2, '0')
const buildTime = `${buildDate.getFullYear()}-${pad(buildDate.getMonth() + 1)}-${pad(buildDate.getDate())} ${pad(buildDate.getHours())}:${pad(buildDate.getMinutes())}:${pad(buildDate.getSeconds())}`

export default defineConfig({
  define: {
    __SYBZ_COMPONENTS_BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      entry: componentEntries,
      formats: ['es'],
    },
    rollupOptions: {
      external: isExternalPackage,
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'components/chunks/[name]-[hash].js',
        assetFileNames: 'components/assets/[name][extname]',
      },
    },
  },
  plugins: [vue(), vueJsx(), Icons({ compiler: 'vue3', scale: 1 })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages'),
    },
  },
})
