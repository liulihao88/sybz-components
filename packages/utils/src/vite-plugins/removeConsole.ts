import { isAbsolute, relative } from 'node:path'
import type { Plugin } from 'vite'
import { createMatcher, findClosingParen, findConsoleCalls, normalizePath } from './consoleSource'

export interface SybzRemoveConsoleOptions {
  /** 需要移除的 console 方法，默认全部常用方法。 */
  methods?: string[]
  /** 不删除的 console 方法，优先级高于 methods；例如 ['error', 'warn']。 */
  preserveMethods?: string[]
  /** 只处理匹配的文件，支持字符串或正则；匹配文件相对路径和完整 id。 */
  include?: RegExp | string[]
  /** 跳过匹配的文件，支持字符串或正则；匹配文件相对路径和完整 id。 */
  exclude?: RegExp | string[]
  /** 保留调用源码中匹配这些字符串/正则的 console，例如 build git info。 */
  preserve?: (string | RegExp)[]
  /** 保留带有该注释标记的 console，默认 `@sybz-keep-console`；设为 false 关闭。 */
  preserveComment?: string | false
  /** 是否处理 node_modules，默认 false。 */
  transformNodeModules?: boolean
}

const DEFAULT_METHODS = [
  'log',
  'info',
  'warn',
  'error',
  'debug',
  'trace',
  'dir',
  'dirxml',
  'table',
  'group',
  'groupCollapsed',
  'groupEnd',
  'time',
  'timeEnd',
  'timeLog',
  'count',
  'countReset',
  'assert',
  'clear',
  'profile',
  'profileEnd',
]

const DEFAULT_PRESERVE = ['[build git info]']
const DEFAULT_PRESERVE_COMMENT = '@sybz-keep-console'
const SOURCE_RE = /\.(?:[cm]?[jt]sx?|vue)$/
const SCRIPT_RE = /<script\b[^>]*>([\s\S]*?)<\/script>/g

const matchesPattern = (source: string, pattern: string | RegExp) => {
  if (typeof pattern === 'string') return source.includes(pattern)
  pattern.lastIndex = 0
  return pattern.test(source)
}

const hasPreserveComment = (code: string, start: number, end: number, marker: string) => {
  const lineStart = code.lastIndexOf('\n', start) + 1
  const lineEnd = code.indexOf('\n', end)
  const currentLine = code.slice(lineStart, lineEnd === -1 ? code.length : lineEnd)
  if (currentLine.includes(marker)) return true

  // 也支持把标记写在调用上一行。
  if (lineStart <= 1) return false
  const previousLineEnd = lineStart - 1
  const previousLineStart = code.lastIndexOf('\n', previousLineEnd - 1) + 1
  return code.slice(previousLineStart, previousLineEnd).includes(marker)
}

const removeConsoleCalls = (
  code: string,
  context: {
    methods: Set<string>
    preserveMethods: Set<string>
    preserve: (string | RegExp)[]
    comment: string | false
  },
) => {
  const calls = findConsoleCalls(code, context.methods)
  if (!calls.length) return code

  let result = code

  // 从后往前替换，避免前面的替换影响后面的索引；控制台调用本身没有返回值依赖。
  for (let index = calls.length - 1; index >= 0; index--) {
    const call = calls[index]
    const closeParen = findClosingParen(result, call.paren)
    if (closeParen === -1 || context.preserveMethods.has(call.method)) continue

    const source = result.slice(call.start, closeParen + 1)
    if (context.preserve.some((pattern) => matchesPattern(source, pattern))) continue
    if (context.comment && hasPreserveComment(result, call.start, closeParen, context.comment)) continue

    result = result.slice(0, call.start) + 'void 0' + result.slice(closeParen + 1)
  }

  return result
}

const removeConsoleFromVue = (code: string, context: Parameters<typeof removeConsoleCalls>[1]) => {
  let output = ''
  let cursor = 0
  let changed = false

  SCRIPT_RE.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = SCRIPT_RE.exec(code))) {
    const scriptTag = match[0]
    const content = match[1]
    const contentStart = match.index + scriptTag.indexOf('>') + 1
    const transformed = removeConsoleCalls(content, context)

    output += code.slice(cursor, contentStart) + transformed
    cursor = contentStart + content.length
    if (transformed !== content) changed = true
  }

  if (!changed) return code
  return output + code.slice(cursor)
}

/** 创建生产构建移除 console 的插件。 */
export const createRemoveConsole = (options: SybzRemoveConsoleOptions = {}): Plugin => {
  let root = process.cwd()
  const methods = new Set(options.methods ?? DEFAULT_METHODS)
  const preserveMethods = new Set(options.preserveMethods ?? [])
  const preserve = [...DEFAULT_PRESERVE, ...(options.preserve ?? [])]
  const comment: string | false =
    options.preserveComment === false ? false : (options.preserveComment ?? DEFAULT_PRESERVE_COMMENT)
  const include = createMatcher(options.include)
  const exclude = createMatcher(options.exclude)

  return {
    name: 'sybz:remove-console',
    apply: 'build',
    enforce: 'pre',
    configResolved(config) {
      root = config.root
    },
    transform(code, id) {
      if (!code) return
      if (!id || id.startsWith('\0') || id.startsWith('virtual:')) return

      const normalizedId = normalizePath(id)
      if (!options.transformNodeModules && normalizedId.includes('/node_modules/')) return
      if (normalizedId.includes('/.vitepress/cache/') || normalizedId.includes('/.vitepress/dist/')) return

      const cleanId = id.split('?')[0]
      if (!cleanId || !isAbsolute(cleanId) || !SOURCE_RE.test(cleanId)) return
      if (cleanId.includes('.d.ts')) return

      const file = normalizePath(relative(root, cleanId))
      if (!file || file.startsWith('..') || file.startsWith('/')) return
      if (include && !include(file) && !include(id)) return
      if (exclude?.(file) || exclude?.(id)) return

      const context = { methods, preserveMethods, preserve, comment }
      const transformed = cleanId.endsWith('.vue')
        ? removeConsoleFromVue(code, context)
        : removeConsoleCalls(code, context)

      if (transformed === code) return
      return { code: transformed, map: null }
    },
  }
}
