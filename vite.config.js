import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import fg from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import pkg from './package.json'
import vueJsx from '@vitejs/plugin-vue-jsx'
import terser from '@rollup/plugin-terser'
import { customVitePluginFilePath } from './packages/utils/local/customVitePluginFilePath.ts'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import Icons from 'unplugin-icons/vite'
import { compile } from 'sass'

const formatBuildTime = (date) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const buildTime = formatBuildTime(new Date())
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
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './packages/index.ts'),
      name: pkg.name,
      fileName: (format) => `${pkg.name}-${format}.js`,
    },
    rollupOptions: {
      external: isExternalPackage,
      output: {
        // UMD模式下位那些外部化的依赖提供一个全局的变量
        globals: {
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          '@vueuse/core': 'VueUse',
          '@sybz-components/utils': 'SybzComponentsUtils',
          echarts: 'echarts',
          'echarts/core': 'echarts',
          'echarts/charts': 'echarts',
          'echarts/renderers': 'echarts',
          'echarts/components': 'echarts',
          'vue-echarts': 'VueECharts',
        },
      },
    },
  },
  define: {
    __SYBZ_COMPONENTS_BUILD_TIME__: JSON.stringify(buildTime),
  },
  plugins: [
    VueSetupExtend(),
    {
      ...terser({
        compress: {
          drop_console: false, // 保留 console，方便线上排查偶发问题
        },
        format: {
          comments: /^@preserve|@keep/i, // 保留带有@preserve或@keep的注释
        },
      }),
      apply: 'build',
    },
    {
      name: 'emit-optional-utilities',
      apply: 'build',
      generateBundle() {
        const utilitiesPath = resolve(__dirname, './packages/styles/utilities.scss')
        const result = compile(utilitiesPath, {
          style: 'expanded',
        })

        this.emitFile({
          type: 'asset',
          fileName: 'utilities.css',
          source: result.css,
        })

        this.emitFile({
          type: 'asset',
          fileName: 'utilities.scss',
          source: readFileSync(utilitiesPath, 'utf-8'),
        })
      },
    },
    {
      name: 'emit-types-entry',
      apply: 'build',
      generateBundle() {
        const declarationEntries = [
          ['index.d.ts', './packages/index.d.ts'],
          ['components.d.ts', './packages/components.d.ts'],
          ...fg
            .sync('packages/types/**/*.d.ts', { cwd: __dirname, onlyFiles: true })
            .map((sourcePath) => [sourcePath.replace(/^packages\//, ''), `./${sourcePath}`]),
        ]

        declarationEntries.forEach(([fileName, sourcePath]) => {
          this.emitFile({
            type: 'asset',
            fileName,
            source: readFileSync(resolve(__dirname, sourcePath), 'utf-8'),
          })
        })
      },
    },
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    customVitePluginFilePath(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './packages/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages'),
      '~dist': resolve(__dirname, 'dist'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9876,
    open: false,
    https: false,
  },
})
