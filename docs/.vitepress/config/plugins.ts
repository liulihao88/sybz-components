import path, { resolve } from 'path'
import fs from 'fs'
import ts from 'typescript'
// @ts-ignore
import MarkdownIt from 'markdown-it'
// @ts-ignore
import mdContainer from 'markdown-it-container'
// @ts-ignore
import type Token from 'markdown-it/lib/token'
import { highlight } from '../utils/highlight'
import { docRoot, projRoot } from './global.ts'
const localMd = MarkdownIt()
const utilsSrcDir = resolve(projRoot, 'packages/utils/src')

const isExported = (node: ts.Node) => node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)

const getDeclarationNames = (node: ts.Node) => {
  if (
    ts.isFunctionDeclaration(node) ||
    ts.isClassDeclaration(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeAliasDeclaration(node)
  ) {
    return node.name ? [node.name.text] : []
  }

  if (ts.isVariableStatement(node)) {
    return node.declarationList.declarations
      .map((declaration) => (ts.isIdentifier(declaration.name) ? declaration.name.text : ''))
      .filter(Boolean)
  }

  return []
}

const getRelatedAssignmentName = (node: ts.Node) => {
  if (!ts.isExpressionStatement(node)) return ''
  if (!ts.isBinaryExpression(node.expression)) return ''
  if (node.expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken) return ''

  const left = node.expression.left
  if (!ts.isPropertyAccessExpression(left)) return ''
  if (!ts.isIdentifier(left.expression)) return ''

  return left.expression.text
}

const collectUtilsSources = () => {
  const groups = new Map<string, { file: string; nodes: ts.Node[]; source: string }>()
  const tsFiles = fs.readdirSync(utilsSrcDir).filter((file) => file.endsWith('.ts'))

  for (const file of tsFiles) {
    const filePath = resolve(utilsSrcDir, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true)

    for (const statement of sourceFile.statements) {
      if (!isExported(statement)) continue

      for (const name of getDeclarationNames(statement)) {
        if (!groups.has(name)) {
          groups.set(name, { file, nodes: [], source })
        }

        groups.get(name)!.nodes.push(statement)
      }
    }

    for (const statement of sourceFile.statements) {
      const name = getRelatedAssignmentName(statement)
      if (!name || !groups.has(name)) continue

      groups.get(name)!.nodes.push(statement)
    }
  }

  return new Map(
    Array.from(groups.entries()).map(([name, group]) => {
      const firstNode = group.nodes[0]
      const lastNode = group.nodes[group.nodes.length - 1]

      return [
        name,
        {
          file: group.file,
          code: group.source.slice(firstNode.getFullStart(), lastNode.end).trim(),
        },
      ]
    }),
  )
}

const parseUtilsSourceNames = (params: string) =>
  params
    .replace(/^utils-source\s*/, '')
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean)

const renderUtilsSource = (sourceNames: string[]) => {
  const sources = collectUtilsSources()
  const blocks = sourceNames.map((name) => {
    const sourceInfo = sources.get(name)
    if (!sourceInfo) {
      throw new Error(`Incorrect utils source function: ${name}`)
    }

    return [
      `<h4>${name}</h4>`,
      `<p>来源：<code>packages/utils/src/${sourceInfo.file}</code></p>`,
      `<div class="language-ts">${highlight(sourceInfo.code, 'ts')}</div>`,
    ].join('\n')
  })

  return ['<h3>函数源码</h3>', ...blocks].join('\n')
}

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(tokens: Token[], index: number): string
}
export const mdPlugin = (md: MarkdownIt) => {
  md.use(mdContainer, 'utils-source', {
    validate(params) {
      return /^utils-source\s+.+$/.test(params.trim())
    },
    render(tokens, idx) {
      if (tokens[idx].nesting !== 1) {
        return ''
      }

      return renderUtilsSource(parseUtilsSourceNames(tokens[idx].info.trim()))
    },
  } as ContainerOpts)

  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        /* means the tag is opening */
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        // demo文件名称
        const sourceFile = sourceFileToken.children?.[0].content ?? ''
        if (sourceFileToken.type === 'inline') {
          // 读取示列代码文件
          source = fs.readFileSync(path.resolve(docRoot, 'components', `${sourceFile}.vue`), 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        // opening tag
        return `<Demo
                    source="${encodeURIComponent(highlight(source, 'vue'))}"
                    path="${sourceFile}"
                    raw-source="${encodeURIComponent(source)}"
                    description="${encodeURIComponent(localMd.render(description))}">`
      } else {
        // closing tag
        return '</Demo>\n'
      }
    },
  } as ContainerOpts)
}
