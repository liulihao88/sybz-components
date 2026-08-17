import { codeInspectorPlugin, type CodeInspectorPluginOptions } from 'code-inspector-plugin'
import type { Plugin } from 'vite'
import { gitCommitLog, type GitCommitLogOptions } from './gitCommitLog'

export type SybzCodeInspectorOptions = Omit<CodeInspectorPluginOptions, 'bundler'>

export interface SybzVitePluginsOptions {
  /** 代码定位插件配置；默认启用，设为 false 时关闭。 */
  codeInspector?: boolean | SybzCodeInspectorOptions
  /** Git 提交信息插件配置；默认启用，设为 false 时关闭。 */
  gitCommitLog?: boolean | GitCommitLogOptions
}

/** 创建预设为 Vite bundler 的代码定位插件。 */
const createCodeInspector = (options: SybzCodeInspectorOptions = {}): Plugin =>
  codeInspectorPlugin({ ...options, bundler: 'vite' }) as Plugin

/** 创建 sybz 项目的 Vite 插件预设，默认包含代码定位和 Git 提交信息。 */
export const sybzVitePlugins = (options: SybzVitePluginsOptions = {}): Plugin[] => {
  const plugins: Plugin[] = []

  if (options.codeInspector !== false) {
    plugins.push(createCodeInspector(typeof options.codeInspector === 'object' ? options.codeInspector : {}))
  }

  if (options.gitCommitLog !== false) {
    plugins.push(gitCommitLog(typeof options.gitCommitLog === 'object' ? options.gitCommitLog : {}))
  }

  return plugins
}
