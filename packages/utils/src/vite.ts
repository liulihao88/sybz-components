import { codeInspectorPlugin, type CodeInspectorPluginOptions } from 'code-inspector-plugin'
import tailwindcss, { type PluginOptions as TailwindPluginOptions } from '@tailwindcss/vite'
import type { Plugin, PluginOption } from 'vite'
import { gitCommitLog, type GitCommitLogOptions } from './gitCommitLog'

declare global {
  interface Window {
    __SYBZ_BUILD_TIME__: string
  }
}

export type SybzCodeInspectorOptions = Omit<CodeInspectorPluginOptions, 'bundler'>

export interface SybzVitePluginsOptions {
  /** Tailwind CSS v4 Vite 插件配置；默认启用，设为 false 时关闭。 */
  tailwind?: boolean | TailwindPluginOptions
  /** 代码定位插件配置；默认启用，设为 false 时关闭。 */
  codeInspector?: boolean | SybzCodeInspectorOptions
  /** Git 提交信息插件配置；默认启用，设为 false 时关闭。 */
  gitCommitLog?: boolean | GitCommitLogOptions
  /** 打包时间注入配置；默认启用，设为 false 时关闭。 */
  buildTime?: boolean | { metaName?: string }
}

/** 创建预设为 Vite bundler 的代码定位插件。 */
const createCodeInspector = (options: SybzCodeInspectorOptions = {}): Plugin =>
  codeInspectorPlugin({ ...options, bundler: 'vite' }) as Plugin

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

/**
 * 创建 sybz 项目的 Vite 插件预设，默认包含 Tailwind CSS v4、代码定位、Git 提交信息和打包时间。
 * Vite 会自动扁平化插件数组，推荐直接写入 plugins，无需展开运算符。
 */
export const sybzVitePlugins = (options: SybzVitePluginsOptions = {}): PluginOption => {
  const plugins: Plugin[] = []

  if (options.tailwind !== false) {
    plugins.push(...tailwindcss(typeof options.tailwind === 'object' ? options.tailwind : {}))
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

  return plugins
}
