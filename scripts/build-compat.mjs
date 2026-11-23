import { transformAsync } from '@babel/core'
import presetEnv from '@babel/preset-env'

/**
 * 组件库统一兼容基线：Chrome 60+。
 * 语法降级由 esbuild（build.target）和 Babel（preset-env）双保险负责，
 * CSS 前缀与可降级语法由 postcss-preset-env 负责。
 */
export const COMPAT_TARGET = 'chrome60'

/** 给 Autoprefixer / Browserslist 使用，覆盖同期主流内核。 */
export const COMPAT_BROWSERS = ['chrome >= 60', 'safari >= 12', 'firefox >= 60', 'edge >= 79']

/** Babel 只处理业务源码；依赖包由 esbuild 按 build.target 统一降级。 */
const FIRST_PARTY_RE = /[/\\]packages[/\\](?!portal-dev[/\\]|utils[/\\]dist[/\\])/
const NON_JS_RE = /\.(css|scss|sass|less|styl|json|d\.ts)$|[?&]vue&type=style/

/**
 * 只有出现“esbuild 降级后本不该存在”的高版本语法时才走 Babel，
 * 避免对每个模块都做一次完整 Babel 解析。
 */
const LEGACY_SYNTAX_RE =
  /\?\?|\?\.|#[A-Za-z_$]|\bstatic\s*\{|\|\|=|&&=|\?\?=|\basync\s+function\s*\*|\bfor\s+await\b|\bcatch\s*\{/

/**
 * Babel 兜底：@vitejs/plugin-vue 等插件在 esbuild 之后仍可能产出高版本语法，
 * 这里再按 Chrome 60 跑一次 preset-env，确保最终源码不会漏网。
 */
export function babelCompatPlugin() {
  return {
    name: 'sybz:babel-compat',
    apply: 'build',
    enforce: 'post',
    async transform(code, id) {
      if (!code || !FIRST_PARTY_RE.test(id) || NON_JS_RE.test(id) || id.includes('node_modules')) return null
      if (!LEGACY_SYNTAX_RE.test(code)) return null

      const result = await transformAsync(code, {
        filename: id.split('?')[0],
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        sourceType: 'module',
        presets: [
          [
            presetEnv,
            {
              targets: { chrome: '60' },
              modules: false,
              // polyfill 由 packages/compat/polyfills.ts 统一引入，避免 Babel 重复注入
              useBuiltIns: false,
              bugfixes: true,
            },
          ],
        ],
      })

      if (!result?.code) return null
      return { code: result.code, map: result.map }
    },
  }
}

/**
 * 为按需/子路径入口补一条 `import '../polyfill.js'`。
 * 主入口已经在 packages/index.ts 内引入 polyfill，因此不要重复应用。
 */
export function polyfillEntryPlugin() {
  return {
    name: 'sybz:polyfill-entry',
    apply: 'build',
    enforce: 'post',
    renderChunk(code, chunk) {
      if (!chunk.isEntry || chunk.fileName === 'polyfill.js') return null

      const depth = chunk.fileName.split('/').length - 1
      const specifier = `${depth === 0 ? './' : '../'.repeat(depth)}polyfill.js`
      if (code.includes(`"${specifier}"`) || code.includes(`'${specifier}'`)) return null

      return {
        code: `import ${JSON.stringify(specifier)};\n${code}`,
        map: null,
      }
    },
  }
}
