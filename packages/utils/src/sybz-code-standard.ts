#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
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

const backupFile = (filePath: string) => {
  const backupPath = `${filePath}.sybz-code-standard.bak`
  copyFileSync(filePath, backupPath)
  return backupPath
}

const writeConfigFile = (relativePath: string, content: string, force: boolean) => {
  const filePath = resolve(cwd, relativePath)

  if (!existsSync(filePath)) {
    writeFileSync(filePath, content, 'utf8')
    console.log(`创建 ${relativePath}`)
    return
  }

  if (readFileSync(filePath, 'utf8') === content) return

  if (!force) {
    console.warn(`跳过 ${relativePath}：已存在自定义内容，可使用 init --force 强制覆盖`)
    return
  }

  const backupPath = backupFile(filePath)
  writeFileSync(filePath, content, 'utf8')
  console.log(`覆盖 ${relativePath}（原文件已备份为 ${backupPath}）`)
}

const configurePackageJson = (force: boolean) => {
  const packageJsonPath = resolve(cwd, 'package.json')
  if (!existsSync(packageJsonPath)) throw new Error(`当前目录不存在 package.json：${cwd}`)

  const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)
  packageJson.scripts ??= {}
  let shouldBackup = false

  for (const [name, command] of Object.entries(scripts)) {
    const current = packageJson.scripts[name]
    if (!current || current === command || force) {
      if (force && current && current !== command) shouldBackup = true
      packageJson.scripts[name] = command
    } else {
      console.warn(`保留 scripts.${name}：已存在自定义命令，可使用 init --force 强制覆盖`)
    }
  }

  if (shouldBackup) {
    const backupPath = backupFile(packageJsonPath)
    console.log(`备份 package.json 为 ${backupPath}`)
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

const init = (args: string[]) => {
  const force = args.includes('--force')
  configurePackageJson(force)
  for (const [filePath, content] of Object.entries(generatedFiles)) writeConfigFile(filePath, content, force)
  configurePreCommit()
  console.log(`\n前端代码统一规范已${force ? '强制覆盖并' : ''}接入。`)
}

const [command = 'init', ...args] = process.argv.slice(2)

switch (command) {
  case 'init':
    init(args)
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
