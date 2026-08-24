import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import { sybzVitePlugins } from '@sybz-components/utils/vite'
import svgLoader from 'vite-svg-loader'
import terser from '@rollup/plugin-terser'
import { customVitePluginFilePath } from '../packages/utils/local/customVitePluginFilePath.js'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Icons from 'unplugin-icons/vite'

const formatBuildTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const buildTime = formatBuildTime(new Date())

export default defineConfig({
  envDir: fileURLToPath(new URL('..', import.meta.url)),
  css: {
    devSourcemap: false,
  },
  plugins: [
    svgLoader({
      defaultImport: 'url', // 将SVG作为URL导入
    }),
    vueJsx(),
    sybzVitePlugins(),
    terser({
      compress: {
        drop_console: false, // 保留 console，方便线上排查偶发路由问题
      },
    }),
    customVitePluginFilePath(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, './.vitepress/theme/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../packages', import.meta.url)),
      'sybz-components': fileURLToPath(new URL('../packages/index.ts', import.meta.url)),
      // '@sybz-components/utils': fileURLToPath(new URL('../packages/utils/src/index.ts', import.meta.url)),
      '~dist': fileURLToPath(new URL('../dist', import.meta.url)),
    },
    // 类型： string[] 导入时想要省略的扩展名列表。
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs'],
  },
  define: {
    __buildInfos__: JSON.stringify(buildTime), // 将构建信息作为全局变量注入
    __SYBZ_COMPONENTS_BUILD_TIME__: JSON.stringify(buildTime),
    __SYBZ_UTILS_BUILD_TIME__: JSON.stringify(buildTime),
  },
  build: {
    minify: 'terser', // 启用terser压缩
  },
  server: {
    host: '0.0.0.0',
    port: 9998,
    open: false,
  },
})
