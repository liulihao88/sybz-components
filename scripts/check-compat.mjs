import { parse } from '@babel/parser'
import fg from 'fast-glob'
import { readFileSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'

/**
 * 产物兼容性校验：Chrome 60 能解析的语法上限约为 ES2017 + 对象展开。
 * 这里扫描最终 dist，拦截会直接导致低版本浏览器 SyntaxError 的高版本语法。
 *
 * 说明：markdown / mermaid / katex / codemirror / xlsx 等可选重组件依赖了
 * Chrome 60 无法解析的正则后行断言（lookbehind），且无法安全降级；这些
 * 组件按设计只面向现代浏览器。校验会自动跳过它们的懒加载 chunk，但会
 * 对核心组件、主入口 eager chunk、charts 和 polyfill 做严格检查。
 */
const root = resolve(import.meta.dirname, '..')
const dirFlagIndex = process.argv.indexOf('--dir')
const distDir = resolve(root, dirFlagIndex > -1 ? process.argv[dirFlagIndex + 1] : 'dist')

const MAX_REPORT = 60
const UMD_FILE = 'sybz-components-umd.js'
const HEAVY_COMPONENT_RE = /^components[/\\](markdown|json|documentPreview|preview)\.js$/
const MAIN_ENTRY = 'sybz-components-es.js'

const CLASS_FEATURES = new Set([
  'ClassProperty',
  'ClassPrivateProperty',
  'ClassPrivateMethod',
  'ClassAccessorProperty',
  'StaticBlock',
])

const describeNode = (node) => {
  if (CLASS_FEATURES.has(node.type)) return `class 高级语法（${node.type}）`
  if (node.type === 'OptionalMemberExpression' || node.type === 'OptionalCallExpression') return '可选链 ?.'
  if (node.type === 'LogicalExpression' && node.operator === '??') return '空值合并 ??'
  if (node.type === 'AssignmentExpression' && ['??=', '||=', '&&='].includes(node.operator)) {
    return `逻辑赋值 ${node.operator}`
  }
  if (node.type === 'ForOfStatement' && node.await) return 'for await...of'
  if (
    (node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression') &&
    node.async &&
    node.generator
  ) {
    return 'async generator'
  }
  if (node.type === 'CatchClause' && !node.param) return '可选 catch 绑定 catch {}'
  if (node.type === 'ImportMeta') return 'import.meta'
  if (node.type === 'BigIntLiteral') return 'BigInt 字面量'
  if (node.type === 'PrivateName') return '私有字段/私有字段 in 检查'
  if (node.type === 'RegExpLiteral') {
    const flags = node.flags || ''
    if (flags.includes('s')) return '正则 s（dotAll）标志'
    if (flags.includes('d')) return '正则 d（hasIndices）标志'
    if (flags.includes('v')) return '正则 v 标志'
    if (node.pattern.includes('\\p{')) return '正则 Unicode 属性转义 \\p{...}'
    if (node.pattern.includes('(?<=') || node.pattern.includes('(?<!')) return '正则后行断言'
    if (node.pattern.includes('(?<')) return '正则命名捕获组'
  }
  return null
}

const walk = (node, file, issues) => {
  if (issues.length >= MAX_REPORT) return
  if (!node || typeof node !== 'object') return

  if (Array.isArray(node)) {
    for (const child of node) walk(child, file, issues)
    return
  }

  if (typeof node.type === 'string') {
    const reason = describeNode(node)
    if (reason) {
      issues.push({
        file,
        line: node.loc?.start.line || 1,
        column: (node.loc?.start.column || 0) + 1,
        reason,
      })
      return
    }
  }

  for (const key of Object.keys(node)) {
    if (['loc', 'start', 'end', 'extra', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) {
      continue
    }
    walk(node[key], file, issues)
  }
}

const STATIC_IMPORT_RE = /\b(?:import|export)\s+(?:[^'"]*?\s+from\s+)?["']([^"']+)["']/g
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g

const files = fg.sync('**/*.js', { cwd: distDir, absolute: true, ignore: ['**/*.map'], onlyFiles: true })
if (!files.length) {
  console.error(`[check:compat] 未找到可检查的 JS 产物：${distDir}`)
  process.exit(1)
}

const fileSet = new Set(files)
const importCache = new Map()

const readImports = (file) => {
  if (importCache.has(file)) return importCache.get(file)
  const code = readFileSync(file, 'utf-8')
  const staticSpecs = new Set()
  const dynamicSpecs = new Set()
  for (const match of code.matchAll(STATIC_IMPORT_RE)) staticSpecs.add(match[1])
  for (const match of code.matchAll(DYNAMIC_IMPORT_RE)) dynamicSpecs.add(match[1])
  const result = { staticSpecs, dynamicSpecs }
  importCache.set(file, result)
  return result
}

const resolveSpec = (fromFile, spec) => {
  if (!spec.startsWith('.')) return null
  const base = resolve(dirname(fromFile), spec)
  if (fileSet.has(base)) return base
  const withJs = `${base}.js`
  return fileSet.has(withJs) ? withJs : null
}

const collectClosure = (roots, { includeDynamic = true } = {}) => {
  const seen = new Set()
  const queue = roots.filter((file) => fileSet.has(file))
  while (queue.length) {
    const file = queue.pop()
    if (seen.has(file)) continue
    seen.add(file)
    const { staticSpecs, dynamicSpecs } = readImports(file)
    for (const spec of staticSpecs) {
      const target = resolveSpec(file, spec)
      if (target) queue.push(target)
    }
    if (includeDynamic) {
      for (const spec of dynamicSpecs) {
        const target = resolveSpec(file, spec)
        if (target) queue.push(target)
      }
    }
  }
  return seen
}

const componentEntries = files.filter(
  (file) => file.includes(`${sep}components${sep}`) && !file.includes(`${sep}chunks${sep}`),
)
const coreComponentEntries = componentEntries.filter(
  (file) => !HEAVY_COMPONENT_RE.test(relative(distDir, file).replaceAll(sep, '/')),
)
const heavyComponentEntries = componentEntries.filter((file) =>
  HEAVY_COMPONENT_RE.test(relative(distDir, file).replaceAll(sep, '/')),
)

const chartEntries = files.filter(
  (file) => /(^|[/\\])charts[/\\][^/\\]+\.js$/.test(file) || file.endsWith(`${sep}charts.js`),
)
const polyfillFile = resolve(distDir, 'polyfill.js')
const mainEntry = resolve(distDir, MAIN_ENTRY)

// 主入口的 eager 依赖必须先完整检查；动态 import 指向的重组件 chunk 单独归入可选集合。
const mainStaticClosure = collectClosure([mainEntry], { includeDynamic: false })
const mainHeavyRoots = new Set()
for (const file of mainStaticClosure) {
  for (const spec of readImports(file).dynamicSpecs) {
    const target = resolveSpec(file, spec)
    if (target) mainHeavyRoots.add(target)
  }
}

const coreReachable = collectClosure([mainEntry, ...coreComponentEntries, ...chartEntries, polyfillFile], {
  includeDynamic: false,
})
const optionalReachable = collectClosure([...mainHeavyRoots, ...heavyComponentEntries])

const skipped = new Set()
for (const file of optionalReachable) {
  if (!coreReachable.has(file)) skipped.add(file)
}
const umdFile = resolve(distDir, UMD_FILE)
if (fileSet.has(umdFile)) skipped.add(umdFile)

const targets = files.filter((file) => !skipped.has(file))

const issues = []
for (const file of targets) {
  const code = readFileSync(file, 'utf-8')
  let ast
  try {
    ast = parse(code, {
      sourceType: 'unambiguous',
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      plugins: ['jsx', 'decorators-legacy'],
    })
  } catch (error) {
    issues.push({
      file,
      line: error.loc?.line || 1,
      column: (error.loc?.column || 0) + 1,
      reason: `无法解析：${error.message}`,
    })
    continue
  }
  walk(ast, file, issues)
  if (issues.length >= MAX_REPORT) break
}

if (skipped.size) {
  console.log(
    `[check:compat] 已跳过 ${skipped.size} 个可选重组件/UMD 产物（markdown/mermaid 等仅面向现代浏览器；Chrome 60 请使用 ESM 或按需引入）`,
  )
}

if (issues.length) {
  console.error(`[check:compat] 发现 ${issues.length} 处 Chrome 60 不兼容的语法：`)
  for (const issue of issues) {
    console.error(`  ${relative(root, issue.file)}:${issue.line}:${issue.column}  ${issue.reason}`)
  }
  if (issues.length >= MAX_REPORT) console.error(`  ...仅显示前 ${MAX_REPORT} 条`)
  process.exit(1)
}

console.log(`[check:compat] 通过：${targets.length} 个核心 JS 产物均未发现 Chrome 60 不支持的语法`)
