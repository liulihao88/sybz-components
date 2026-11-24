import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import type { Plugin } from 'vite'

export type SybzConsoleMethod = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface SybzConsoleSourceOptions {
  /** 需要追加源码位置的 console 方法，默认全部常用方法。 */
  methods?: SybzConsoleMethod[]
  /** 只处理匹配的文件，支持字符串或正则；匹配文件相对路径和完整 id。 */
  include?: RegExp | string[]
  /** 跳过匹配的文件，支持字符串或正则；匹配文件相对路径和完整 id。 */
  exclude?: RegExp | string[]
  /** 是否在生产构建中也保留源码前缀，默认只在开发服务中启用。 */
  build?: boolean
  /** 是否输出可点击的 IDE 跳转链接，默认开发环境开启；设为 false 时只输出静态 `[file:line]`。 */
  jump?: boolean
  /** 点击跳转时使用的编辑器命令，默认 `code`（VS Code）。 */
  editor?: string
  /**
   * 自定义静态日志前缀，返回空字符串时跳过该条日志。
   * 仅在 `jump: false` 或生产构建中生效；默认返回 `[src/components/Foo.vue:12]`。
   */
  format?: (file: string, line: number) => string
}

interface ConsoleCall {
  start: number
  paren: number
}

interface InjectContext {
  file: string
  fileId?: number
  lineOffset: number
  methods: Set<string>
  options: SybzConsoleSourceOptions
  jump: boolean
}

const DEFAULT_METHODS: SybzConsoleMethod[] = ['log', 'info', 'warn', 'error', 'debug']
const GO_TO_EDITORS = new Set(['code', 'code-insiders', 'cursor', 'vscodium', 'windsurf', 'trae'])
const SOURCE_RE = /\.(?:[cm]?[jt]sx?|vue)$/
const SCRIPT_RE = /<script\b[^>]*>([\s\S]*?)<\/script>/g
const IDENTIFIER_RE = /[\w$]/
const METHOD_RE = /[A-Za-z]/

const normalizePath = (value: string) => value.replace(/\\/g, '/')

const countNewlines = (value: string) => {
  let count = 0
  for (let index = 0; index < value.length; index++) {
    if (value[index] === '\n') count++
  }
  return count
}

const createMatcher = (matcher: RegExp | string[] | undefined) => {
  if (!matcher) return undefined
  const matchers = Array.isArray(matcher) ? matcher : [matcher]

  return (value: string) =>
    matchers.some((item) => {
      if (item instanceof RegExp) {
        item.lastIndex = 0
        return item.test(value)
      }
      return value.includes(item)
    })
}

/**
 * 找到代码里所有 `console.xxx(` 调用，跳过字符串、模板字符串和注释。
 * 这里不做完整 AST 解析，只服务于开发日志定位，控制台调用不会出现在正则字面量里。
 */
const findConsoleCalls = (code: string, methods: Set<string>): ConsoleCall[] => {
  const calls: ConsoleCall[] = []
  type State = 'code' | 'single' | 'double' | 'template' | 'line-comment' | 'block-comment'
  let state: State = 'code'

  for (let index = 0; index < code.length; index++) {
    const char = code[index]
    const next = code[index + 1]

    if (state === 'line-comment') {
      if (char === '\n') state = 'code'
      continue
    }
    if (state === 'block-comment') {
      if (char === '*' && next === '/') {
        state = 'code'
        index++
      }
      continue
    }
    if (state === 'single' || state === 'double') {
      if (char === '\\') {
        index++
        continue
      }
      if ((state === 'single' && char === "'") || (state === 'double' && char === '"')) state = 'code'
      continue
    }
    if (state === 'template') {
      if (char === '\\') {
        index++
        continue
      }
      if (char === '`') state = 'code'
      continue
    }

    if (char === '/' && next === '/') {
      state = 'line-comment'
      index++
      continue
    }
    if (char === '/' && next === '*') {
      state = 'block-comment'
      index++
      continue
    }
    if (char === "'") {
      state = 'single'
      continue
    }
    if (char === '"') {
      state = 'double'
      continue
    }
    if (char === '`') {
      state = 'template'
      continue
    }

    if (!code.startsWith('console', index)) continue
    if (index > 0 && IDENTIFIER_RE.test(code[index - 1])) continue

    let cursor = index + 7
    while (/\s/.test(code[cursor] || '')) cursor++
    if (code[cursor] !== '.') continue
    cursor++
    while (/\s/.test(code[cursor] || '')) cursor++

    const methodStart = cursor
    while (METHOD_RE.test(code[cursor] || '')) cursor++
    const method = code.slice(methodStart, cursor)
    if (!methods.has(method)) continue

    while (/\s/.test(code[cursor] || '')) cursor++
    if (code[cursor] !== '(') continue

    calls.push({ start: index, paren: cursor })
    index = cursor
  }

  return calls
}

const createStaticPrefix = (context: InjectContext, line: number) => {
  const format = context.options.format ?? ((source: string, lineNumber: number) => `[${source}:${lineNumber}]`)

  try {
    const prefix = format(context.file, line)
    return prefix ? JSON.stringify(prefix) : ''
  } catch {
    return JSON.stringify(`[${context.file}:${line}]`)
  }
}

const createJumpPrefix = (context: InjectContext, line: number) => {
  // 控制台里只有 URL 可以被点击，用文件 id + 行号把链接压短。
  const url = `(typeof window === 'undefined' ? '' : window.location.origin) + '/s/${context.fileId?.toString(36)}/${line.toString(36)}'`

  // 浏览器控制台只有 URL 可以被点击；用 ↗ 作为最左侧的视觉入口，后面跟短链接。
  return [
    `'%c↗%c ' + ${url}`,
    `'color:#2f6fed;font-weight:700;padding-right:2px;'`,
    `'color:#2f6fed;font-size:11px;text-decoration:underline;cursor:pointer;'`,
  ].join(', ')
}

const injectConsoleSource = (code: string, context: InjectContext) => {
  const calls = findConsoleCalls(code, context.methods)
  if (!calls.length) return code

  let result = code

  // 从后往前插入，前面的索引和行号不会被影响。
  for (let index = calls.length - 1; index >= 0; index--) {
    const call = calls[index]
    const line = context.lineOffset + countNewlines(code.slice(0, call.start))
    const prefix = context.jump ? createJumpPrefix(context, line) : createStaticPrefix(context, line)

    if (!prefix) continue

    const insertAt = call.paren + 1
    const rest = result.slice(insertAt)
    const whitespace = rest.match(/^\s*/)?.[0] ?? ''
    const hasArguments = rest[whitespace.length] !== ')'
    const inserted = hasArguments ? `${prefix}, ` : prefix
    result = result.slice(0, insertAt) + inserted + result.slice(insertAt)
  }

  return result
}

const injectVueSource = (code: string, context: InjectContext) => {
  let output = ''
  let cursor = 0
  let changed = false

  SCRIPT_RE.lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = SCRIPT_RE.exec(code))) {
    const scriptTag = match[0]
    const content = match[1]
    const contentStart = match.index + scriptTag.indexOf('>') + 1
    const contentEnd = contentStart + content.length
    const lineOffset = countNewlines(code.slice(0, contentStart)) + 1
    const transformed = injectConsoleSource(content, { ...context, lineOffset })

    output += code.slice(cursor, contentStart) + transformed
    cursor = contentEnd
    if (transformed !== content) changed = true
  }

  if (!changed) return code
  return output + code.slice(cursor)
}

const launchEditor = (editor: string, file: string, line: number) =>
  new Promise<void>((resolvePromise, reject) => {
    const position = `${file}:${line}:1`
    const args = GO_TO_EDITORS.has(editor) ? ['-g', position] : [position]

    try {
      const child = spawn(editor, args, {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
        shell: process.platform === 'win32',
      })

      child.once('spawn', () => {
        child.unref()
        resolvePromise()
      })
      child.once('error', reject)
    } catch (error) {
      reject(error)
    }
  })

const createOpenMiddleware = (root: string, editor: string, fileIds: Map<number, string>) => {
  const rootPrefix = root.endsWith(sep) ? root : `${root}${sep}`

  return (request: IncomingMessage, response: ServerResponse) => {
    const [idPart, linePart] = (request.url || '/').replace(/^\/+/, '').split('/')
    const file = fileIds.get(parseInt(idPart, 36)) || ''
    const line = Math.max(1, parseInt(linePart, 36) || 1)
    const absolutePath = resolve(root, file)

    if (!file || !absolutePath.startsWith(rootPrefix) || !existsSync(absolutePath)) {
      response.statusCode = 404
      response.end('Source file not found')
      return
    }

    launchEditor(editor, absolutePath, line)
      .then(() => {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html; charset=utf-8')
        // 控制台链接只能通过新标签页发起请求；打开成功后立即关闭，避免留下空白页。
        response.end(
          `<!doctype html><meta charset="utf-8"><title>Sybz</title><body><script>try { window.close(); } catch (error) {} document.body.textContent = ${JSON.stringify(
            `已打开 ${file}:${line}（${editor}）`,
          )};</script></body>`,
        )
      })
      .catch((error: unknown) => {
        response.statusCode = 500
        response.setHeader('Content-Type', 'text/plain; charset=utf-8')
        response.end(`无法打开编辑器 ${editor}：${String(error)}`)
      })
  }
}

/** 创建控制台日志源码定位插件。 */
export const createConsoleSource = (options: SybzConsoleSourceOptions = {}): Plugin => {
  let root = process.cwd()
  let isServe = false
  const editor = options.editor ?? 'code'
  const methods = new Set(options.methods ?? DEFAULT_METHODS)
  const include = createMatcher(options.include)
  const exclude = createMatcher(options.exclude)
  const fileIds = new Map<number, string>()
  const fileIdByName = new Map<string, number>()
  let nextFileId = 1
  const getFileId = (file: string) => {
    const cached = fileIdByName.get(file)
    if (cached) return cached
    const id = nextFileId++
    fileIdByName.set(file, id)
    fileIds.set(id, file)
    return id
  }

  return {
    name: 'sybz:console-source',
    apply: options.build ? undefined : 'serve',
    enforce: 'pre',
    configResolved(config) {
      root = config.root
      isServe = config.command === 'serve'
    },
    configureServer(server) {
      if (options.jump === false) return
      server.middlewares.use('/s', createOpenMiddleware(root, editor, fileIds))
    },
    transform(code, id) {
      if (!code) return
      if (!id || id.startsWith('\0') || id.startsWith('virtual:') || id.includes('/node_modules/')) return

      const cleanId = id.split('?')[0]
      if (!cleanId || !isAbsolute(cleanId) || !SOURCE_RE.test(cleanId)) return
      if (cleanId.includes('.d.ts')) return

      const file = normalizePath(relative(root, cleanId))
      if (!file || file.startsWith('..') || file.startsWith('/')) return
      if (include && !include(file) && !include(id)) return
      if (exclude?.(file) || exclude?.(id)) return

      const jump = isServe && options.jump !== false
      const context: InjectContext = {
        file,
        fileId: jump ? getFileId(file) : undefined,
        lineOffset: 1,
        methods,
        options,
        jump,
      }
      const transformed = cleanId.endsWith('.vue') ? injectVueSource(code, context) : injectConsoleSource(code, context)

      if (transformed === code) return
      return { code: transformed, map: null }
    },
  }
}
