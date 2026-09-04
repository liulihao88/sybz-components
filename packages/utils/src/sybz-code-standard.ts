#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'
import husky from 'husky'

const cwd = process.cwd()
const require = createRequire(import.meta.url)

const generatedFiles: Record<string, string> = {
  'eslint.config.js': "export { sybzEslintConfig as default } from '@sybz-components/utils/codeStandard'\n",
  '.prettierrc.js': "export { sybzPrettierConfig as default } from '@sybz-components/utils/codeStandard'\n",
  'lint-staged.config.js': "export { sybzLintStagedConfig as default } from '@sybz-components/utils/codeStandard'\n",
  '.editorconfig': `root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 120

[*.md]
trim_trailing_whitespace = false
`,
}

const scripts = {
  prepare: 'sybz-code-standard prepare',
  lint: 'sybz-code-standard eslint . --fix',
  'lint:check': 'sybz-code-standard eslint .',
  'lint:prettier': 'sybz-code-standard prettier . --write',
  'lint:prettier:check': 'sybz-code-standard prettier . --check',
}

const runPackageBin = (packageName: string, binPath: string, args: string[]) => {
  const packageJsonPath = require.resolve(`${packageName}/package.json`)
  const executablePath = resolve(packageJsonPath, '..', binPath)

  execFileSync(process.execPath, [executablePath, ...args], { cwd, stdio: 'inherit' })
}

const writeIfMissing = (relativePath: string, content: string) => {
  const filePath = resolve(cwd, relativePath)

  if (!existsSync(filePath)) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`创建 ${relativePath}`)
    return
  }

  if (readFileSync(filePath, 'utf8') !== content) {
    console.warn(`跳过 ${relativePath}：已存在自定义内容`)
  }
}

const configurePackageJson = () => {
  const packageJsonPath = resolve(cwd, 'package.json')
  if (!existsSync(packageJsonPath)) throw new Error(`当前目录不存在 package.json：${cwd}`)

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  packageJson.scripts ??= {}

  for (const [name, command] of Object.entries(scripts)) {
    const current = packageJson.scripts[name]
    if (!current || current === command) {
      packageJson.scripts[name] = command
    } else {
      console.warn(`保留 scripts.${name}：已存在自定义命令`)
    }
  }

  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8')
  console.log('更新 package.json scripts')
}

const prepareHusky = () => {
  const result = husky()
  if (result) console.warn(result)
}

const configurePreCommit = () => {
  prepareHusky()
  const huskyDir = resolve(cwd, '.husky')
  const hookPath = resolve(huskyDir, 'pre-commit')
  const command = 'pnpm exec sybz-code-standard staged'
  mkdirSync(huskyDir, { recursive: true })

  const current = existsSync(hookPath) ? readFileSync(hookPath, 'utf8').trimEnd() : ''
  if (current.includes('sybz-code-standard staged')) return

  writeFileSync(hookPath, `${current ? `${current}\n` : ''}${command}\n`, { encoding: 'utf8', mode: 0o755 })
  console.log('更新 .husky/pre-commit')
}

const init = () => {
  configurePackageJson()
  for (const [filePath, content] of Object.entries(generatedFiles)) writeIfMissing(filePath, content)
  configurePreCommit()
  console.log('\n前端代码统一规范已接入。')
}

const [command = 'init', ...args] = process.argv.slice(2)

switch (command) {
  case 'init':
    init()
    break
  case 'prepare':
    prepareHusky()
    break
  case 'eslint':
    runPackageBin('eslint', 'bin/eslint.js', args)
    break
  case 'prettier':
    runPackageBin('prettier', 'bin/prettier.cjs', args)
    break
  case 'staged':
    runPackageBin('lint-staged', 'bin/lint-staged.js', args)
    break
  default:
    console.error(`未知命令：${command}`)
    process.exitCode = 1
}
