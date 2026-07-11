// vite.config.js
import { defineConfig } from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/vite@5.2.11_@types+node@20.11.16_lightningcss@1.32.0_sass@1.70.0_terser@5.31.1/node_modules/vite/dist/node/index.js'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import fg from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/index.js'
import vue from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.2.11_@types+node@20.11.16_lightningcss@1.32.0_sass@1.70_c8ef2e1506d25b3708d1b293e714c2d0/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import { codeInspectorPlugin } from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/code-inspector-plugin@0.10.1/node_modules/code-inspector-plugin/dist/index.mjs'

// package.json
var package_default = {
  name: 'sybz-components',
  version: '1.0.8',
  description: 'Vue3 \u4E2D\u57FA\u4E8EElement-plus\u4E8C\u6B21\u5C01\u88C5\u57FA\u7840\u7EC4\u4EF6\u6587\u6863',
  private: false,
  type: 'module',
  main: 'dist/sybz-components-es.js',
  unpkg: 'dist/sybz-components-umd.js',
  module: 'dist/sybz-components-es.js',
  packageManager: 'pnpm@10.12.1',
  types: 'dist/index.d.ts',
  style: 'dist/style.css',
  exports: {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/sybz-components-es.js',
      default: './dist/sybz-components-es.js',
    },
    './charts': {
      types: './dist/types/components/company/chart/index.d.ts',
      import: './dist/charts.js',
      default: './dist/charts.js',
    },
    './charts/*': {
      types: './dist/types/components/company/chart/*.d.ts',
      import: './dist/charts/*.js',
      default: './dist/charts/*.js',
    },
    './types': {
      types: './dist/types/index.d.ts',
    },
    './types/*': {
      types: './dist/types/*.d.ts',
    },
    './hooks': {
      types: './dist/types/hooks/index.d.ts',
      import: './dist/sybz-components-es.js',
      default: './dist/sybz-components-es.js',
    },
    './style.css': './dist/style.css',
    './charts/style.css': './dist/charts-style.css',
    './charts-style.css': './dist/charts-style.css',
    './skills/sybz-components': './skills/sybz-components/SKILL.md',
    './skills/sybz-components/*': './skills/sybz-components/*',
    './utilities.css': './dist/utilities.css',
    './utilities.scss': './dist/utilities.scss',
  },
  files: [
    'dist',
    'docs/index.md',
    'docs/vite.config.ts',
    'docs/tsconfig.json',
    'docs/public',
    'docs/components',
    'docs/shared',
    'docs/.vitepress/config.ts',
    'docs/.vitepress/env.d.ts',
    'docs/.vitepress/config',
    'docs/.vitepress/theme',
    'docs/.vitepress/utils',
    'docs/.vitepress/vitepress',
    'skills',
    'scripts/install-sybz-skill.mjs',
  ],
  sideEffects: ['*.css', 'dist/*.css', 'dist/*.scss'],
  workspaces: ['packages/utils'],
  scripts: {
    dev: 'vitepress dev docs',
    build: 'pnpm types:generate && vite build && vite build --config packages/components/company/chart/vite.config.js',
    docsbuild: 'vitepress build docs',
    preinstall: 'npx only-allow pnpm',
    prepare: 'husky',
    buildAll: 'pnpm build && pnpm run -C packages/utils build',
    'check:components': 'pnpm typecheck && pnpm typecheck:sfc && pnpm test',
    'check:utils': 'pnpm exec tsc --noEmit -p packages/utils/tsconfig.json && pnpm test:utils',
    preview: 'vite preview',
    lint: 'eslint . --fix',
    'lint:check': 'eslint .',
    'lint:prettier': 'prettier --write .',
    'lint:prettier:check': 'prettier --check .',
    typecheck: 'tsc --noEmit -p tsconfig.typecheck.json',
    'typecheck:sfc': 'vue-tsc --noEmit -p tsconfig.json',
    test: 'vitest run',
    'test:watch': 'vitest',
    'test:utils': 'vitest run packages/utils/src',
    'types:generate': 'node ./scripts/generate-component-types.mjs',
    'skills:install': 'node ./scripts/install-sybz-skill.mjs',
    'release:check':
      'pnpm typecheck && pnpm typecheck:sfc && pnpm exec tsc --noEmit -p packages/utils/tsconfig.json && pnpm buildAll',
    prepublishOnly: 'pnpm release:check',
    release: 'pnpm release:check && npm version patch && npm publish --ignore-scripts',
    docsserve: 'vitepress serve docs',
    deploy: 'bash -x deploy.sh',
    'release-deploy': 'pnpm release && npm run deploy',
    update: ' pnpm add @sybz-components/utils@latest',
    'utils:release': 'pnpm run -C packages/utils release',
    'link:bun': 'bun link && bun link --cwd packages/utils',
    'link:pnpm': 'pnpm link -g && pnpm -C packages/utils link -g',
    'unlink:bun': 'bun unlink && bun unlink --cwd packages/utils',
  },
  'lint-staged': {
    '**/*.{js,jsx,ts,tsx,vue,mjs,cjs}': ['prettier --write', 'eslint --fix --max-warnings=0'],
    '**/*.{css,scss,json,md,yaml,yml,html}': ['prettier --write'],
  },
  dependencies: {
    '@element-plus/icons-vue': '^2.3.1',
    '@sybz-components/utils': '^1.0.1',
    '@vueuse/core': '^10.9.0',
    'eslint-config-prettier': '9.1.2',
  },
  devDependencies: {
    '@eslint/js': '9.39.4',
    '@fortawesome/fontawesome-svg-core': '^6.3.0',
    '@fortawesome/free-solid-svg-icons': '^6.3.0',
    '@fortawesome/vue-fontawesome': '^3.0.6',
    '@iconify/json': '^2.2.438',
    '@rollup/plugin-terser': '^0.4.4',
    '@rushstack/eslint-patch': '^1.3.3',
    '@typescript-eslint/eslint-plugin': '8.62.0',
    '@typescript-eslint/parser': '8.62.0',
    '@vitejs/plugin-vue': '^5.0.3',
    '@vitejs/plugin-vue-jsx': '^3.1.0',
    '@vue/eslint-config-prettier': '^8.0.0',
    '@vue/shared': '^3.4.27',
    autoprefixer: '^10.4.18',
    chalk: '^5.3.0',
    'code-inspector-plugin': '^0.10.1',
    consola: '^3.2.3',
    dayjs: '^1.11.19',
    echarts: '^5.5.1',
    'element-plus': '^2.11.5',
    'escape-html': '^1.0.3',
    eslint: '9.39.4',
    'eslint-plugin-vue': '10.9.2',
    'fast-glob': '^3.3.3',
    globals: '16.5.0',
    'happy-dom': '^12.10.3',
    husky: '9.1.7',
    'lint-staged': '15.5.2',
    'lodash-es': '^4.17.21',
    'markdown-it': '^13.0.1',
    'markdown-it-container': '^3.0.0',
    'normalize.css': '^8.0.1',
    pinia: '^2.1.7',
    prettier: '3.8.4',
    prismjs: '^1.29.0',
    rollup: '^4.9.6',
    sass: '^1.70.0',
    terser: '^5.31.1',
    typescript: '^5.3.3',
    unbuild: '^3.6.0',
    'unplugin-icons': '^23.0.1',
    vite: '^5.2.11',
    'vite-plugin-md': '^0.21.5',
    'vite-plugin-svg-icons': '^2.0.1',
    'vite-svg-loader': '^5.1.0',
    vitepress: '1.0.0-rc.1',
    vitest: '^1.6.1',
    vue: '^3.4.15',
    'vue-echarts': '^7.0.3',
    'vue-eslint-parser': '10.4.1',
    'vue-router': '^4.2.5',
    'vue-tsc': '^3.1.5',
  },
  repository: {
    type: 'git',
    url: 'https://github.com/liulihao88/sybz-components',
  },
  homepage: 'https://liulihao88.github.io/sybz-components/',
  keywords: ['sybz', 'vue3', 'element-plus', 'components', 'sybz', '\u601D\u4E91\u535A\u667A', 'llh'],
  peerDependencies: {
    'element-plus': '>=2.3.0 <3',
    vue: '>=3.4.0 <4',
  },
}

// vite.config.js
import vueJsx from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.11_@types+node@20.11.16_lightningcss@1.32.0_sass@_8c0f362a9ee7e3e0c682f0cf8f5a55d2/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import terser from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/@rollup+plugin-terser@0.4.4_rollup@4.9.6/node_modules/@rollup/plugin-terser/dist/es/index.js'

// packages/utils/local/customVitePluginFilePath.ts
function customVitePluginFilePath() {
  return {
    name: 'custom-vite-plugin-file-path',
    transform(src, id) {
      if (id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.vue') || id.endsWith('.tsx')) {
        const filePath = JSON.stringify(id)
        src = src.replace(/__INJECT_FILE_PATH__/g, filePath)
      }
      return src
    },
  }
}

// vite.config.js
import { createSvgIconsPlugin } from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.11_@types+node@20.11.16_lightningcss@1.32.0_sass@1.70.0_terser@5.31.1_/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import Icons from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/unplugin-icons@23.0.1_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/vite.mjs'
import { compile } from 'file:///Users/liulihao/sybz/sybz-components/node_modules/.pnpm/sass@1.70.0/node_modules/sass/sass.node.mjs'
var __vite_injected_original_dirname = '/Users/liulihao/sybz/sybz-components'
var formatBuildTime = (date) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}
var buildTime = formatBuildTime(/* @__PURE__ */ new Date())
var externalPackages = [
  'vue',
  'element-plus',
  '@element-plus/icons-vue',
  '@vueuse/core',
  '@sybz-components/utils',
  'echarts',
  'vue-echarts',
]
var isExternalPackage = (id) =>
  externalPackages.includes(id) ||
  /^element-plus(\/|$)/.test(id) ||
  /^@element-plus\/icons-vue(\/|$)/.test(id) ||
  /^@vueuse\/core(\/|$)/.test(id) ||
  /^echarts(\/|$)/.test(id) ||
  /^vue-echarts(\/|$)/.test(id) ||
  /^@sybz-components\/utils(\/|$)/.test(id)
var vite_config_default = defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__vite_injected_original_dirname, './packages/index.ts'),
      name: package_default.name,
      fileName: (format) => `${package_default.name}-${format}.js`,
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
    {
      ...terser({
        compress: {
          drop_console: false,
          // 保留 console，方便线上排查偶发问题
        },
        format: {
          comments: /^@preserve|@keep/i,
          // 保留带有@preserve或@keep的注释
        },
      }),
      apply: 'build',
    },
    {
      name: 'emit-optional-utilities',
      apply: 'build',
      generateBundle() {
        const utilitiesPath = resolve(__vite_injected_original_dirname, './packages/styles/utilities.scss')
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
            .sync('packages/types/**/*.d.ts', { cwd: __vite_injected_original_dirname, onlyFiles: true })
            .map((sourcePath) => [sourcePath.replace(/^packages\//, ''), `./${sourcePath}`]),
        ]
        declarationEntries.forEach(([fileName, sourcePath]) => {
          this.emitFile({
            type: 'asset',
            fileName,
            source: readFileSync(resolve(__vite_injected_original_dirname, sourcePath), 'utf-8'),
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
      iconDirs: [resolve(__vite_injected_original_dirname, './packages/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    Icons({
      compiler: 'vue3',
      scale: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__vite_injected_original_dirname, 'packages'),
      '~dist': resolve(__vite_injected_original_dirname, 'dist'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9876,
    open: false,
    https: false,
  },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIiwgInBhY2thZ2VzL3V0aWxzL2xvY2FsL2N1c3RvbVZpdGVQbHVnaW5GaWxlUGF0aC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9saXVsaWhhby9zeWJ6L3N5YnotY29tcG9uZW50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2xpdWxpaGFvL3N5Ynovc3liei1jb21wb25lbnRzL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saXVsaWhhby9zeWJ6L3N5YnotY29tcG9uZW50cy92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IGZnIGZyb20gJ2Zhc3QtZ2xvYidcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHsgY29kZUluc3BlY3RvclBsdWdpbiB9IGZyb20gJ2NvZGUtaW5zcGVjdG9yLXBsdWdpbidcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5pbXBvcnQgdGVyc2VyIGZyb20gJ0Byb2xsdXAvcGx1Z2luLXRlcnNlcidcbmltcG9ydCB7IGN1c3RvbVZpdGVQbHVnaW5GaWxlUGF0aCB9IGZyb20gJy4vcGFja2FnZXMvdXRpbHMvbG9jYWwvY3VzdG9tVml0ZVBsdWdpbkZpbGVQYXRoLnRzJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcbmltcG9ydCB7IGNvbXBpbGUgfSBmcm9tICdzYXNzJ1xuXG5jb25zdCBmb3JtYXRCdWlsZFRpbWUgPSAoZGF0ZSkgPT4ge1xuICBjb25zdCBwYWQgPSAodmFsdWUpID0+IFN0cmluZyh2YWx1ZSkucGFkU3RhcnQoMiwgJzAnKVxuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke3BhZChkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZGF0ZS5nZXREYXRlKCkpfSAke3BhZChkYXRlLmdldEhvdXJzKCkpfToke3BhZChcbiAgICBkYXRlLmdldE1pbnV0ZXMoKSxcbiAgKX06JHtwYWQoZGF0ZS5nZXRTZWNvbmRzKCkpfWBcbn1cblxuY29uc3QgYnVpbGRUaW1lID0gZm9ybWF0QnVpbGRUaW1lKG5ldyBEYXRlKCkpXG5jb25zdCBleHRlcm5hbFBhY2thZ2VzID0gW1xuICAndnVlJyxcbiAgJ2VsZW1lbnQtcGx1cycsXG4gICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZScsXG4gICdAdnVldXNlL2NvcmUnLFxuICAnQHN5YnotY29tcG9uZW50cy91dGlscycsXG4gICdlY2hhcnRzJyxcbiAgJ3Z1ZS1lY2hhcnRzJyxcbl1cbmNvbnN0IGlzRXh0ZXJuYWxQYWNrYWdlID0gKGlkKSA9PlxuICBleHRlcm5hbFBhY2thZ2VzLmluY2x1ZGVzKGlkKSB8fFxuICAvXmVsZW1lbnQtcGx1cyhcXC98JCkvLnRlc3QoaWQpIHx8XG4gIC9eQGVsZW1lbnQtcGx1c1xcL2ljb25zLXZ1ZShcXC98JCkvLnRlc3QoaWQpIHx8XG4gIC9eQHZ1ZXVzZVxcL2NvcmUoXFwvfCQpLy50ZXN0KGlkKSB8fFxuICAvXmVjaGFydHMoXFwvfCQpLy50ZXN0KGlkKSB8fFxuICAvXnZ1ZS1lY2hhcnRzKFxcL3wkKS8udGVzdChpZCkgfHxcbiAgL15Ac3liei1jb21wb25lbnRzXFwvdXRpbHMoXFwvfCQpLy50ZXN0KGlkKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9wYWNrYWdlcy9pbmRleC50cycpLFxuICAgICAgbmFtZTogcGtnLm5hbWUsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYCR7cGtnLm5hbWV9LSR7Zm9ybWF0fS5qc2AsXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogaXNFeHRlcm5hbFBhY2thZ2UsXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gVU1EXHU2QTIxXHU1RjBGXHU0RTBCXHU0RjREXHU5MEEzXHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU3Njg0XHU1M0Q4XHU5MUNGXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAgICdlbGVtZW50LXBsdXMnOiAnRWxlbWVudFBsdXMnLFxuICAgICAgICAgICdAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZSc6ICdFbGVtZW50UGx1c0ljb25zVnVlJyxcbiAgICAgICAgICAnQHZ1ZXVzZS9jb3JlJzogJ1Z1ZVVzZScsXG4gICAgICAgICAgJ0BzeWJ6LWNvbXBvbmVudHMvdXRpbHMnOiAnU3liekNvbXBvbmVudHNVdGlscycsXG4gICAgICAgICAgZWNoYXJ0czogJ2VjaGFydHMnLFxuICAgICAgICAgICdlY2hhcnRzL2NvcmUnOiAnZWNoYXJ0cycsXG4gICAgICAgICAgJ2VjaGFydHMvY2hhcnRzJzogJ2VjaGFydHMnLFxuICAgICAgICAgICdlY2hhcnRzL3JlbmRlcmVycyc6ICdlY2hhcnRzJyxcbiAgICAgICAgICAnZWNoYXJ0cy9jb21wb25lbnRzJzogJ2VjaGFydHMnLFxuICAgICAgICAgICd2dWUtZWNoYXJ0cyc6ICdWdWVFQ2hhcnRzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgX19TWUJaX0NPTVBPTkVOVFNfQlVJTERfVElNRV9fOiBKU09OLnN0cmluZ2lmeShidWlsZFRpbWUpLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAge1xuICAgICAgLi4udGVyc2VyKHtcbiAgICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IGZhbHNlLCAvLyBcdTRGRERcdTc1NTkgY29uc29sZVx1RkYwQ1x1NjVCOVx1NEZCRlx1N0VCRlx1NEUwQVx1NjM5Mlx1NjdFNVx1NTA3Nlx1NTNEMVx1OTVFRVx1OTg5OFxuICAgICAgICB9LFxuICAgICAgICBmb3JtYXQ6IHtcbiAgICAgICAgICBjb21tZW50czogL15AcHJlc2VydmV8QGtlZXAvaSwgLy8gXHU0RkREXHU3NTU5XHU1RTI2XHU2NzA5QHByZXNlcnZlXHU2MjE2QGtlZXBcdTc2ODRcdTZDRThcdTkxQ0FcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZW1pdC1vcHRpb25hbC11dGlsaXRpZXMnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICBnZW5lcmF0ZUJ1bmRsZSgpIHtcbiAgICAgICAgY29uc3QgdXRpbGl0aWVzUGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi9wYWNrYWdlcy9zdHlsZXMvdXRpbGl0aWVzLnNjc3MnKVxuICAgICAgICBjb25zdCByZXN1bHQgPSBjb21waWxlKHV0aWxpdGllc1BhdGgsIHtcbiAgICAgICAgICBzdHlsZTogJ2V4cGFuZGVkJyxcbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmVtaXRGaWxlKHtcbiAgICAgICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgICAgIGZpbGVOYW1lOiAndXRpbGl0aWVzLmNzcycsXG4gICAgICAgICAgc291cmNlOiByZXN1bHQuY3NzLFxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMuZW1pdEZpbGUoe1xuICAgICAgICAgIHR5cGU6ICdhc3NldCcsXG4gICAgICAgICAgZmlsZU5hbWU6ICd1dGlsaXRpZXMuc2NzcycsXG4gICAgICAgICAgc291cmNlOiByZWFkRmlsZVN5bmModXRpbGl0aWVzUGF0aCwgJ3V0Zi04JyksXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2VtaXQtdHlwZXMtZW50cnknLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICBnZW5lcmF0ZUJ1bmRsZSgpIHtcbiAgICAgICAgY29uc3QgZGVjbGFyYXRpb25FbnRyaWVzID0gW1xuICAgICAgICAgIFsnaW5kZXguZC50cycsICcuL3BhY2thZ2VzL2luZGV4LmQudHMnXSxcbiAgICAgICAgICBbJ2NvbXBvbmVudHMuZC50cycsICcuL3BhY2thZ2VzL2NvbXBvbmVudHMuZC50cyddLFxuICAgICAgICAgIC4uLmZnXG4gICAgICAgICAgICAuc3luYygncGFja2FnZXMvdHlwZXMvKiovKi5kLnRzJywgeyBjd2Q6IF9fZGlybmFtZSwgb25seUZpbGVzOiB0cnVlIH0pXG4gICAgICAgICAgICAubWFwKChzb3VyY2VQYXRoKSA9PiBbc291cmNlUGF0aC5yZXBsYWNlKC9ecGFja2FnZXNcXC8vLCAnJyksIGAuLyR7c291cmNlUGF0aH1gXSksXG4gICAgICAgIF1cblxuICAgICAgICBkZWNsYXJhdGlvbkVudHJpZXMuZm9yRWFjaCgoW2ZpbGVOYW1lLCBzb3VyY2VQYXRoXSkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdEZpbGUoe1xuICAgICAgICAgICAgdHlwZTogJ2Fzc2V0JyxcbiAgICAgICAgICAgIGZpbGVOYW1lLFxuICAgICAgICAgICAgc291cmNlOiByZWFkRmlsZVN5bmMocmVzb2x2ZShfX2Rpcm5hbWUsIHNvdXJjZVBhdGgpLCAndXRmLTgnKSxcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9LFxuICAgIHZ1ZSh7XG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvXSxcbiAgICB9KSxcbiAgICB2dWVKc3goKSxcbiAgICBjb2RlSW5zcGVjdG9yUGx1Z2luKHtcbiAgICAgIGJ1bmRsZXI6ICd2aXRlJyxcbiAgICB9KSxcbiAgICBjdXN0b21WaXRlUGx1Z2luRmlsZVBhdGgoKSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3Jlc29sdmUoX19kaXJuYW1lLCAnLi9wYWNrYWdlcy9hc3NldHMvc3ZnJyldLFxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgfSksXG4gICAgSWNvbnMoe1xuICAgICAgY29tcGlsZXI6ICd2dWUzJyxcbiAgICAgIHNjYWxlOiAxLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwYWNrYWdlcycpLFxuICAgICAgJ35kaXN0JzogcmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0JyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHBvcnQ6IDk4NzYsXG4gICAgb3BlbjogZmFsc2UsXG4gICAgaHR0cHM6IGZhbHNlLFxuICB9LFxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcInN5YnotY29tcG9uZW50c1wiLFxuICBcInZlcnNpb25cIjogXCIxLjAuOFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiVnVlMyBcdTRFMkRcdTU3RkFcdTRFOEVFbGVtZW50LXBsdXNcdTRFOENcdTZCMjFcdTVDMDFcdTg4QzVcdTU3RkFcdTc4NDBcdTdFQzRcdTRFRjZcdTY1ODdcdTY4NjNcIixcbiAgXCJwcml2YXRlXCI6IGZhbHNlLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJtYWluXCI6IFwiZGlzdC9zeWJ6LWNvbXBvbmVudHMtZXMuanNcIixcbiAgXCJ1bnBrZ1wiOiBcImRpc3Qvc3liei1jb21wb25lbnRzLXVtZC5qc1wiLFxuICBcIm1vZHVsZVwiOiBcImRpc3Qvc3liei1jb21wb25lbnRzLWVzLmpzXCIsXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDEwLjEyLjFcIixcbiAgXCJ0eXBlc1wiOiBcImRpc3QvaW5kZXguZC50c1wiLFxuICBcInN0eWxlXCI6IFwiZGlzdC9zdHlsZS5jc3NcIixcbiAgXCJleHBvcnRzXCI6IHtcbiAgICBcIi5cIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9zeWJ6LWNvbXBvbmVudHMtZXMuanNcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC9zeWJ6LWNvbXBvbmVudHMtZXMuanNcIlxuICAgIH0sXG4gICAgXCIuL2NoYXJ0c1wiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzL2NvbXBvbmVudHMvY29tcGFueS9jaGFydC9pbmRleC5kLnRzXCIsXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9jaGFydHMuanNcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC9jaGFydHMuanNcIlxuICAgIH0sXG4gICAgXCIuL2NoYXJ0cy8qXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvdHlwZXMvY29tcG9uZW50cy9jb21wYW55L2NoYXJ0LyouZC50c1wiLFxuICAgICAgXCJpbXBvcnRcIjogXCIuL2Rpc3QvY2hhcnRzLyouanNcIixcbiAgICAgIFwiZGVmYXVsdFwiOiBcIi4vZGlzdC9jaGFydHMvKi5qc1wiXG4gICAgfSxcbiAgICBcIi4vdHlwZXNcIjoge1xuICAgICAgXCJ0eXBlc1wiOiBcIi4vZGlzdC90eXBlcy9pbmRleC5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi90eXBlcy8qXCI6IHtcbiAgICAgIFwidHlwZXNcIjogXCIuL2Rpc3QvdHlwZXMvKi5kLnRzXCJcbiAgICB9LFxuICAgIFwiLi9ob29rc1wiOiB7XG4gICAgICBcInR5cGVzXCI6IFwiLi9kaXN0L3R5cGVzL2hvb2tzL2luZGV4LmQudHNcIixcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3N5YnotY29tcG9uZW50cy1lcy5qc1wiLFxuICAgICAgXCJkZWZhdWx0XCI6IFwiLi9kaXN0L3N5YnotY29tcG9uZW50cy1lcy5qc1wiXG4gICAgfSxcbiAgICBcIi4vc3R5bGUuY3NzXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiLFxuICAgIFwiLi9jaGFydHMvc3R5bGUuY3NzXCI6IFwiLi9kaXN0L2NoYXJ0cy1zdHlsZS5jc3NcIixcbiAgICBcIi4vY2hhcnRzLXN0eWxlLmNzc1wiOiBcIi4vZGlzdC9jaGFydHMtc3R5bGUuY3NzXCIsXG4gICAgXCIuL3NraWxscy9zeWJ6LWNvbXBvbmVudHNcIjogXCIuL3NraWxscy9zeWJ6LWNvbXBvbmVudHMvU0tJTEwubWRcIixcbiAgICBcIi4vc2tpbGxzL3N5YnotY29tcG9uZW50cy8qXCI6IFwiLi9za2lsbHMvc3liei1jb21wb25lbnRzLypcIixcbiAgICBcIi4vdXRpbGl0aWVzLmNzc1wiOiBcIi4vZGlzdC91dGlsaXRpZXMuY3NzXCIsXG4gICAgXCIuL3V0aWxpdGllcy5zY3NzXCI6IFwiLi9kaXN0L3V0aWxpdGllcy5zY3NzXCJcbiAgfSxcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCIsXG4gICAgXCJkb2NzL2luZGV4Lm1kXCIsXG4gICAgXCJkb2NzL3ZpdGUuY29uZmlnLnRzXCIsXG4gICAgXCJkb2NzL3RzY29uZmlnLmpzb25cIixcbiAgICBcImRvY3MvcHVibGljXCIsXG4gICAgXCJkb2NzL2NvbXBvbmVudHNcIixcbiAgICBcImRvY3Mvc2hhcmVkXCIsXG4gICAgXCJkb2NzLy52aXRlcHJlc3MvY29uZmlnLnRzXCIsXG4gICAgXCJkb2NzLy52aXRlcHJlc3MvZW52LmQudHNcIixcbiAgICBcImRvY3MvLnZpdGVwcmVzcy9jb25maWdcIixcbiAgICBcImRvY3MvLnZpdGVwcmVzcy90aGVtZVwiLFxuICAgIFwiZG9jcy8udml0ZXByZXNzL3V0aWxzXCIsXG4gICAgXCJkb2NzLy52aXRlcHJlc3Mvdml0ZXByZXNzXCIsXG4gICAgXCJza2lsbHNcIixcbiAgICBcInNjcmlwdHMvaW5zdGFsbC1zeWJ6LXNraWxsLm1qc1wiXG4gIF0sXG4gIFwic2lkZUVmZmVjdHNcIjogW1xuICAgIFwiKi5jc3NcIixcbiAgICBcImRpc3QvKi5jc3NcIixcbiAgICBcImRpc3QvKi5zY3NzXCJcbiAgXSxcbiAgXCJ3b3Jrc3BhY2VzXCI6IFtcbiAgICBcInBhY2thZ2VzL3V0aWxzXCJcbiAgXSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVwcmVzcyBkZXYgZG9jc1wiLFxuICAgIFwiYnVpbGRcIjogXCJwbnBtIHR5cGVzOmdlbmVyYXRlICYmIHZpdGUgYnVpbGQgJiYgdml0ZSBidWlsZCAtLWNvbmZpZyBwYWNrYWdlcy9jb21wb25lbnRzL2NvbXBhbnkvY2hhcnQvdml0ZS5jb25maWcuanNcIixcbiAgICBcImRvY3NidWlsZFwiOiBcInZpdGVwcmVzcyBidWlsZCBkb2NzXCIsXG4gICAgXCJwcmVpbnN0YWxsXCI6IFwibnB4IG9ubHktYWxsb3cgcG5wbVwiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5XCIsXG4gICAgXCJidWlsZEFsbFwiOiBcInBucG0gYnVpbGQgJiYgcG5wbSBydW4gLUMgcGFja2FnZXMvdXRpbHMgYnVpbGRcIixcbiAgICBcImNoZWNrOmNvbXBvbmVudHNcIjogXCJwbnBtIHR5cGVjaGVjayAmJiBwbnBtIHR5cGVjaGVjazpzZmMgJiYgcG5wbSB0ZXN0XCIsXG4gICAgXCJjaGVjazp1dGlsc1wiOiBcInBucG0gZXhlYyB0c2MgLS1ub0VtaXQgLXAgcGFja2FnZXMvdXRpbHMvdHNjb25maWcuanNvbiAmJiBwbnBtIHRlc3Q6dXRpbHNcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLiAtLWZpeFwiLFxuICAgIFwibGludDpjaGVja1wiOiBcImVzbGludCAuXCIsXG4gICAgXCJsaW50OnByZXR0aWVyXCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXG4gICAgXCJsaW50OnByZXR0aWVyOmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXG4gICAgXCJ0eXBlY2hlY2tcIjogXCJ0c2MgLS1ub0VtaXQgLXAgdHNjb25maWcudHlwZWNoZWNrLmpzb25cIixcbiAgICBcInR5cGVjaGVjazpzZmNcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC1wIHRzY29uZmlnLmpzb25cIixcbiAgICBcInRlc3RcIjogXCJ2aXRlc3QgcnVuXCIsXG4gICAgXCJ0ZXN0OndhdGNoXCI6IFwidml0ZXN0XCIsXG4gICAgXCJ0ZXN0OnV0aWxzXCI6IFwidml0ZXN0IHJ1biBwYWNrYWdlcy91dGlscy9zcmNcIixcbiAgICBcInR5cGVzOmdlbmVyYXRlXCI6IFwibm9kZSAuL3NjcmlwdHMvZ2VuZXJhdGUtY29tcG9uZW50LXR5cGVzLm1qc1wiLFxuICAgIFwic2tpbGxzOmluc3RhbGxcIjogXCJub2RlIC4vc2NyaXB0cy9pbnN0YWxsLXN5Ynotc2tpbGwubWpzXCIsXG4gICAgXCJyZWxlYXNlOmNoZWNrXCI6IFwicG5wbSB0eXBlY2hlY2sgJiYgcG5wbSB0eXBlY2hlY2s6c2ZjICYmIHBucG0gZXhlYyB0c2MgLS1ub0VtaXQgLXAgcGFja2FnZXMvdXRpbHMvdHNjb25maWcuanNvbiAmJiBwbnBtIGJ1aWxkQWxsXCIsXG4gICAgXCJwcmVwdWJsaXNoT25seVwiOiBcInBucG0gcmVsZWFzZTpjaGVja1wiLFxuICAgIFwicmVsZWFzZVwiOiBcInBucG0gcmVsZWFzZTpjaGVjayAmJiBucG0gdmVyc2lvbiBwYXRjaCAmJiBucG0gcHVibGlzaCAtLWlnbm9yZS1zY3JpcHRzXCIsXG4gICAgXCJkb2Nzc2VydmVcIjogXCJ2aXRlcHJlc3Mgc2VydmUgZG9jc1wiLFxuICAgIFwiZGVwbG95XCI6IFwiYmFzaCAteCBkZXBsb3kuc2hcIixcbiAgICBcInJlbGVhc2UtZGVwbG95XCI6IFwicG5wbSByZWxlYXNlICYmIG5wbSBydW4gZGVwbG95XCIsXG4gICAgXCJ1cGRhdGVcIjogXCIgcG5wbSBhZGQgQHN5YnotY29tcG9uZW50cy91dGlsc0BsYXRlc3RcIixcbiAgICBcInV0aWxzOnJlbGVhc2VcIjogXCJwbnBtIHJ1biAtQyBwYWNrYWdlcy91dGlscyByZWxlYXNlXCIsXG4gICAgXCJsaW5rOmJ1blwiOiBcImJ1biBsaW5rICYmIGJ1biBsaW5rIC0tY3dkIHBhY2thZ2VzL3V0aWxzXCIsXG4gICAgXCJsaW5rOnBucG1cIjogXCJwbnBtIGxpbmsgLWcgJiYgcG5wbSAtQyBwYWNrYWdlcy91dGlscyBsaW5rIC1nXCIsXG4gICAgXCJ1bmxpbms6YnVuXCI6IFwiYnVuIHVubGluayAmJiBidW4gdW5saW5rIC0tY3dkIHBhY2thZ2VzL3V0aWxzXCJcbiAgfSxcbiAgXCJsaW50LXN0YWdlZFwiOiB7XG4gICAgXCIqKi8qLntqcyxqc3gsdHMsdHN4LHZ1ZSxtanMsY2pzfVwiOiBbXG4gICAgICBcInByZXR0aWVyIC0td3JpdGVcIixcbiAgICAgIFwiZXNsaW50IC0tZml4IC0tbWF4LXdhcm5pbmdzPTBcIlxuICAgIF0sXG4gICAgXCIqKi8qLntjc3Msc2Nzcyxqc29uLG1kLHlhbWwseW1sLGh0bWx9XCI6IFtcbiAgICAgIFwicHJldHRpZXIgLS13cml0ZVwiXG4gICAgXVxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxuICAgIFwiQHN5YnotY29tcG9uZW50cy91dGlsc1wiOiBcIl4xLjAuMVwiLFxuICAgIFwiQHZ1ZXVzZS9jb3JlXCI6IFwiXjEwLjkuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIjkuMS4yXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVzbGludC9qc1wiOiBcIjkuMzkuNFwiLFxuICAgIFwiQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlXCI6IFwiXjYuMy4wXCIsXG4gICAgXCJAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnNcIjogXCJeNi4zLjBcIixcbiAgICBcIkBmb3J0YXdlc29tZS92dWUtZm9udGF3ZXNvbWVcIjogXCJeMy4wLjZcIixcbiAgICBcIkBpY29uaWZ5L2pzb25cIjogXCJeMi4yLjQzOFwiLFxuICAgIFwiQHJvbGx1cC9wbHVnaW4tdGVyc2VyXCI6IFwiXjAuNC40XCIsXG4gICAgXCJAcnVzaHN0YWNrL2VzbGludC1wYXRjaFwiOiBcIl4xLjMuM1wiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCI4LjYyLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCI4LjYyLjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuM1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcIl4zLjEuMFwiLFxuICAgIFwiQHZ1ZS9lc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguMC4wXCIsXG4gICAgXCJAdnVlL3NoYXJlZFwiOiBcIl4zLjQuMjdcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE4XCIsXG4gICAgXCJjaGFsa1wiOiBcIl41LjMuMFwiLFxuICAgIFwiY29kZS1pbnNwZWN0b3ItcGx1Z2luXCI6IFwiXjAuMTAuMVwiLFxuICAgIFwiY29uc29sYVwiOiBcIl4zLjIuM1wiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xOVwiLFxuICAgIFwiZWNoYXJ0c1wiOiBcIl41LjUuMVwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuMTEuNVwiLFxuICAgIFwiZXNjYXBlLWh0bWxcIjogXCJeMS4wLjNcIixcbiAgICBcImVzbGludFwiOiBcIjkuMzkuNFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCIxMC45LjJcIixcbiAgICBcImZhc3QtZ2xvYlwiOiBcIl4zLjMuM1wiLFxuICAgIFwiZ2xvYmFsc1wiOiBcIjE2LjUuMFwiLFxuICAgIFwiaGFwcHktZG9tXCI6IFwiXjEyLjEwLjNcIixcbiAgICBcImh1c2t5XCI6IFwiOS4xLjdcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiMTUuNS4yXCIsXG4gICAgXCJsb2Rhc2gtZXNcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWFya2Rvd24taXRcIjogXCJeMTMuMC4xXCIsXG4gICAgXCJtYXJrZG93bi1pdC1jb250YWluZXJcIjogXCJeMy4wLjBcIixcbiAgICBcIm5vcm1hbGl6ZS5jc3NcIjogXCJeOC4wLjFcIixcbiAgICBcInBpbmlhXCI6IFwiXjIuMS43XCIsXG4gICAgXCJwcmV0dGllclwiOiBcIjMuOC40XCIsXG4gICAgXCJwcmlzbWpzXCI6IFwiXjEuMjkuMFwiLFxuICAgIFwicm9sbHVwXCI6IFwiXjQuOS42XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzAuMFwiLFxuICAgIFwidGVyc2VyXCI6IFwiXjUuMzEuMVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxuICAgIFwidW5idWlsZFwiOiBcIl4zLjYuMFwiLFxuICAgIFwidW5wbHVnaW4taWNvbnNcIjogXCJeMjMuMC4xXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4xMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tbWRcIjogXCJeMC4yMS41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZpdGUtc3ZnLWxvYWRlclwiOiBcIl41LjEuMFwiLFxuICAgIFwidml0ZXByZXNzXCI6IFwiMS4wLjAtcmMuMVwiLFxuICAgIFwidml0ZXN0XCI6IFwiXjEuNi4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjE1XCIsXG4gICAgXCJ2dWUtZWNoYXJ0c1wiOiBcIl43LjAuM1wiLFxuICAgIFwidnVlLWVzbGludC1wYXJzZXJcIjogXCIxMC40LjFcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjVcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMy4xLjVcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL2xpdWxpaGFvODgvc3liei1jb21wb25lbnRzXCJcbiAgfSxcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vbGl1bGloYW84OC5naXRodWIuaW8vc3liei1jb21wb25lbnRzL1wiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInN5YnpcIixcbiAgICBcInZ1ZTNcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiLFxuICAgIFwiY29tcG9uZW50c1wiLFxuICAgIFwic3lielwiLFxuICAgIFwiXHU2MDFEXHU0RTkxXHU1MzVBXHU2NjdBXCIsXG4gICAgXCJsbGhcIlxuICBdLFxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiPj0yLjMuMCA8M1wiLFxuICAgIFwidnVlXCI6IFwiPj0zLjQuMCA8NFwiXG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpdWxpaGFvL3N5Ynovc3liei1jb21wb25lbnRzL3BhY2thZ2VzL3V0aWxzL2xvY2FsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGl1bGloYW8vc3liei9zeWJ6LWNvbXBvbmVudHMvcGFja2FnZXMvdXRpbHMvbG9jYWwvY3VzdG9tVml0ZVBsdWdpbkZpbGVQYXRoLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saXVsaWhhby9zeWJ6L3N5YnotY29tcG9uZW50cy9wYWNrYWdlcy91dGlscy9sb2NhbC9jdXN0b21WaXRlUGx1Z2luRmlsZVBhdGgudHNcIjtleHBvcnQgZnVuY3Rpb24gY3VzdG9tVml0ZVBsdWdpbkZpbGVQYXRoKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjdXN0b20tdml0ZS1wbHVnaW4tZmlsZS1wYXRoJyxcbiAgICB0cmFuc2Zvcm0oc3JjLCBpZCkge1xuICAgICAgaWYgKGlkLmVuZHNXaXRoKCcuanMnKSB8fCBpZC5lbmRzV2l0aCgnLnRzJykgfHwgaWQuZW5kc1dpdGgoJy52dWUnKSB8fCBpZC5lbmRzV2l0aCgnLnRzeCcpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gSlNPTi5zdHJpbmdpZnkoaWQpXG4gICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKC9fX0lOSkVDVF9GSUxFX1BBVEhfXy9nLCBmaWxlUGF0aClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzcmNcbiAgICB9LFxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFFBQVE7QUFDZixPQUFPLFNBQVM7QUFDaEIsU0FBUywyQkFBMkI7OztBQ0xwQztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsTUFBUTtBQUFBLEVBQ1IsT0FBUztBQUFBLEVBQ1QsUUFBVTtBQUFBLEVBQ1YsZ0JBQWtCO0FBQUEsRUFDbEIsT0FBUztBQUFBLEVBQ1QsT0FBUztBQUFBLEVBQ1QsU0FBVztBQUFBLElBQ1QsS0FBSztBQUFBLE1BQ0gsT0FBUztBQUFBLE1BQ1QsUUFBVTtBQUFBLE1BQ1YsU0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFlBQVk7QUFBQSxNQUNWLE9BQVM7QUFBQSxNQUNULFFBQVU7QUFBQSxNQUNWLFNBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixPQUFTO0FBQUEs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
