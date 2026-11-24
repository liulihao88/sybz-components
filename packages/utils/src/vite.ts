import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { codeInspectorPlugin, type CodeInspectorPluginOptions } from 'code-inspector-plugin'
import tailwindcss, { type PluginOptions as TailwindPluginOptions } from '@tailwindcss/vite'
import vueJsx, { type Options as VueJsxOptions } from '@vitejs/plugin-vue-jsx'
import type { Plugin, PluginOption, UserConfig } from 'vite'
import { gitCommitLog, type GitCommitLogOptions } from './gitCommitLog'
import { createSybzCompatPostcssPlugins, SYBZ_COMPAT_BROWSERS } from './postcss'
import { createConsoleSource, type SybzConsoleSourceOptions } from './vite-plugins/consoleSource'
import { createRemoveConsole, type SybzRemoveConsoleOptions } from './vite-plugins/removeConsole'
import { createVersionCheck, type SybzVersionCheckOptions } from './vite-plugins/versionCheck'

export type { SybzConsoleSourceOptions, SybzVersionCheckOptions }
export type { SybzConsoleMethod } from './vite-plugins/consoleSource'
export type { SybzRemoveConsoleOptions } from './vite-plugins/removeConsole'
export type { SybzVersionCheckPosition } from './vite-plugins/versionCheck'

declare global {
  interface Window {
    __SYBZ_BUILD_TIME__: string
    __SYBZ_VERSION__?: string
  }
}

const require = createRequire(import.meta.url)
const virtualTailwindId = 'virtual:sybz-tailwind'
const resolvedVirtualTailwindId = `\0${virtualTailwindId}`
const virtualTailwindNoPreflightId = 'virtual:sybz-tailwind-no-preflight.css'
const resolvedVirtualTailwindNoPreflightId = `\0${virtualTailwindNoPreflightId}`

export type SybzCodeInspectorOptions = Omit<CodeInspectorPluginOptions, 'bundler'>

export interface SybzCompatOptions {
  /** 传给 `@vitejs/plugin-legacy` 的目标浏览器，默认 Chrome 60+。 */
  targets?: string[]
  /** esbuild 构建目标，默认 `chrome60`。 */
  buildTarget?: string
  /**
   * 是否启用 `@vitejs/plugin-legacy`，默认 true。
   * 也可以直接传入已经创建好的 legacy 插件实例/数组。
   */
  legacy?: boolean | PluginOption
  /** 是否自动注入 PostCSS 兼容插件，默认 true；已有 postcss.config 时建议设为 false 并手动合并。 */
  postcss?: boolean
  /** PostCSS 的目标浏览器，默认 Chrome 60+。 */
  browsers?: string[]
}

export interface SybzVitePluginsOptions {
  /** Vue JSX/TSX 插件配置；默认启用，设为 false 时关闭。 */
  vueJsx?: boolean | VueJsxOptions
  /** Tailwind CSS v4 Vite 插件配置；默认启用，设为 false 时关闭。 */
  tailwind?: boolean | TailwindPluginOptions
  /** 自动向 HTML 注入 Tailwind CSS；默认启用，已有手动 CSS 入口时可设为 false。 */
  tailwindCss?: boolean
  /** 是否注入 Tailwind preflight 全局重置，默认 false；只有完全使用 Tailwind 的新项目才建议开启。 */
  tailwindPreflight?: boolean
  /** 代码定位插件配置；默认启用，设为 false 时关闭。 */
  codeInspector?: boolean | SybzCodeInspectorOptions
  /** Git 提交信息插件配置；默认启用，设为 false 时关闭。 */
  gitCommitLog?: boolean | GitCommitLogOptions
  /** 打包时间注入配置；默认启用，设为 false 时关闭。 */
  buildTime?: boolean | { metaName?: string }
  /** 控制台日志定位源码；默认关闭，设为 true 或配置对象时启用。 */
  consoleSource?: boolean | SybzConsoleSourceOptions
  /** 生产构建移除 console；默认开启，设为 false 时保留。 */
  removeConsole?: boolean | SybzRemoveConsoleOptions
  /** 构建产物版本检测；默认启用，设为 false 时关闭。 */
  versionCheck?: boolean | SybzVersionCheckOptions
  /**
   * 应用级低版本浏览器兼容预设：统一设置构建目标、启用 legacy 产物、
   * 注入 PostCSS 兼容插件。默认关闭，业务项目建议开启：
   * `sybzVitePlugins({ compat: true })`。
   */
  compat?: boolean | SybzCompatOptions
}

/** 将工具包依赖的 Tailwind 样式作为页面入口，业务项目无需单独安装或导入。 */
const createTailwindEntry = (preflight = false): Plugin => {
  const tailwindCssPath = require.resolve('tailwindcss/index.css')
  const tailwindThemePath = require.resolve('tailwindcss/theme.css')
  const tailwindUtilitiesPath = require.resolve('tailwindcss/utilities.css')

  return {
    name: 'sybz-tailwind-entry',
    resolveId(id) {
      if (id === virtualTailwindId) return resolvedVirtualTailwindId
      if (id === virtualTailwindNoPreflightId) return resolvedVirtualTailwindNoPreflightId
    },
    load(id) {
      if (id === resolvedVirtualTailwindId) {
        return preflight
          ? `import ${JSON.stringify(tailwindCssPath)}`
          : `import ${JSON.stringify(virtualTailwindNoPreflightId)}`
      }
      if (id === resolvedVirtualTailwindNoPreflightId) {
        return [
          `@import ${JSON.stringify(tailwindThemePath)} layer(theme);`,
          `@import ${JSON.stringify(tailwindUtilitiesPath)} layer(utilities);`,
        ].join('\n')
      }
    },
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: `import '${virtualTailwindId}'`,
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

/** 创建预设为 Vite bundler、默认使用 VS Code 的代码定位插件。 */
const createCodeInspector = (options: SybzCodeInspectorOptions = {}): Plugin =>
  codeInspectorPlugin({ editor: 'code', ...options, bundler: 'vite' }) as Plugin

const formatBuildTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const createBuildTime = (metaName = 'buildTime'): Plugin => {
  const buildTime = formatBuildTime(new Date())

  return {
    name: 'sybz-build-time',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'meta',
            attrs: { name: metaName, content: buildTime },
            injectTo: 'head-prepend',
          },
          {
            tag: 'script',
            children: `window.__SYBZ_BUILD_TIME__ = ${JSON.stringify(buildTime)};`,
            injectTo: 'head-prepend',
          },
        ]
      },
    },
  }
}

const POSTCSS_CONFIG_FILES = ['postcss.config.js', 'postcss.config.cjs', 'postcss.config.mjs', 'postcss.config.ts']

const loadLegacyPlugin = (options: Record<string, unknown>): PluginOption => {
  let mod:
    | { default?: (options?: Record<string, unknown>) => PluginOption }
    | ((options?: Record<string, unknown>) => PluginOption)
  try {
    mod = require('@vitejs/plugin-legacy')
  } catch {
    throw new Error(
      '[sybz-components] 启用 compat 需要安装与当前 Vite 版本匹配的 @vitejs/plugin-legacy，例如：pnpm add -D @vitejs/plugin-legacy',
    )
  }

  const factory = typeof mod === 'function' ? mod : mod.default
  if (!factory) {
    throw new Error('[sybz-components] @vitejs/plugin-legacy 导出格式异常，请检查安装版本。')
  }
  return factory(options)
}

const createCompatPlugin = (options: SybzCompatOptions): Plugin => ({
  name: 'sybz:compat',
  enforce: 'post',
  config(config) {
    // 组件库自身的 lib 构建由库配置处理，不在这里注入应用级兼容
    if (config.build?.lib) return

    const buildTarget = options.buildTarget ?? 'chrome60'
    const result: UserConfig = {
      build: {
        target: buildTarget,
        cssTarget: buildTarget,
      },
      optimizeDeps: {
        esbuildOptions: { target: buildTarget },
      },
    }

    if (options.postcss !== false) {
      if (config.css?.postcss) {
        console.warn(
          '[sybz-components] 已存在 css.postcss 配置，已跳过自动 PostCSS 注入；请手动合并 createSybzCompatPostcssPlugins()。',
        )
      } else {
        const root = config.root ?? process.cwd()
        const hasPostcssConfig = POSTCSS_CONFIG_FILES.some((file) => existsSync(resolve(root, file)))
        if (hasPostcssConfig) {
          console.warn(
            '[sybz-components] 检测到 postcss.config，已跳过自动 PostCSS 注入；请手动合并 createSybzCompatPostcssPlugins()。',
          )
        } else {
          result.css = {
            postcss: {
              plugins: createSybzCompatPostcssPlugins({ browsers: options.browsers }),
            },
          }
        }
      }
    }

    return result
  },
})

/**
 * 创建 sybz 项目的 Vite 插件预设，默认包含 Vue JSX/TSX、Tailwind CSS v4、控制台源码定位、代码定位、Git 提交信息、
 * 打包时间和构建产物版本检测。Vite 会自动扁平化插件数组，推荐直接写入 plugins，无需展开运算符。
 *
 * 业务项目开启 `compat: true` 后，会额外统一设置 Chrome 60+ 构建目标、
 * 注入 legacy 产物（需要安装 @vitejs/plugin-legacy）和应用级 PostCSS 兼容插件。
 */
export const sybzVitePlugins = (options: SybzVitePluginsOptions = {}): PluginOption => {
  const plugins: PluginOption[] = []

  if (options.vueJsx !== false) {
    plugins.push(vueJsx(typeof options.vueJsx === 'object' ? options.vueJsx : {}))
  }

  if (options.tailwind !== false) {
    plugins.push(...tailwindcss(typeof options.tailwind === 'object' ? options.tailwind : {}))
    if (options.tailwindCss !== false) plugins.push(createTailwindEntry(options.tailwindPreflight === true))
  }

  if (options.consoleSource) {
    const consoleSourceOptions = typeof options.consoleSource === 'object' ? options.consoleSource : {}
    const inspectorOptions = typeof options.codeInspector === 'object' ? options.codeInspector : undefined
    // 复用 codeInspector 的编辑器配置，控制台跳转和 DOM 定位保持一致。
    plugins.push(createConsoleSource({ editor: inspectorOptions?.editor, ...consoleSourceOptions }))
  }

  if (options.removeConsole !== false) {
    plugins.push(createRemoveConsole(typeof options.removeConsole === 'object' ? options.removeConsole : {}))
  }

  if (options.codeInspector !== false) {
    plugins.push(createCodeInspector(typeof options.codeInspector === 'object' ? options.codeInspector : {}))
  }

  if (options.gitCommitLog !== false) {
    plugins.push(gitCommitLog(typeof options.gitCommitLog === 'object' ? options.gitCommitLog : {}))
  }

  if (options.buildTime !== false) {
    plugins.push(createBuildTime(typeof options.buildTime === 'object' ? options.buildTime.metaName : undefined))
  }

  if (options.versionCheck !== false) {
    plugins.push(createVersionCheck(typeof options.versionCheck === 'object' ? options.versionCheck : {}))
  }

  if (options.compat) {
    const compat = typeof options.compat === 'object' ? options.compat : {}
    plugins.push(createCompatPlugin(compat))

    if (compat.legacy !== false) {
      const legacy =
        compat.legacy && typeof compat.legacy !== 'boolean'
          ? compat.legacy
          : loadLegacyPlugin({ targets: compat.targets ?? SYBZ_COMPAT_BROWSERS })

      if (Array.isArray(legacy)) plugins.push(...legacy)
      else plugins.push(legacy)
    }
  }

  return plugins
}
