#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { relative, resolve } from 'node:path'
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

const gitRoot = () => {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' }).trim()
  } catch {
    throw new Error(`当前目录不在 Git 仓库中，无法安装 Husky：${cwd}`)
  }
}

const prepareHusky = () => {
  const root = gitRoot()
  const original = process.cwd()
  try {
    process.chdir(root)
    const result = husky()
    if (result && result !== 'HUSKY=0 skip install') throw new Error(`Husky 安装失败：${result}`)
    if (result) console.warn(result)
  } finally {
    process.chdir(original)
  }
  return root
}

const shellQuote = (value: string) => `'${value.replaceAll("'", "'\\''")}'`

const configurePreCommit = () => {
  const root = prepareHusky()
  const projectPath = relative(root, cwd)
  const huskyDir = resolve(root, '.husky')
  const hookPath = resolve(huskyDir, 'pre-commit')
  const oldCommand = 'pnpm exec sybz-code-standard staged'
  const command = projectPath ? `pnpm --dir ${shellQuote(projectPath)} exec sybz-code-standard staged` : oldCommand
  mkdirSync(huskyDir, { recursive: true })

  const current = existsSync(hookPath) ? readFileSync(hookPath, 'utf8').trimEnd() : ''
  const lines = current ? current.split('\n') : []
  if (!lines.some((line) => line.trim() === command)) {
    const oldIndex = lines.findIndex((line) => line.trim() === oldCommand)
    if (oldIndex >= 0) lines[oldIndex] = command
    else lines.push(command)
    writeFileSync(hookPath, `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o755 })
    console.log(`更新 ${relative(root, hookPath)}`)
  }

  if (projectPath) {
    const obsoleteDir = resolve(cwd, '.husky')
    const obsoleteHook = resolve(obsoleteDir, 'pre-commit')
    if (existsSync(obsoleteHook) && readFileSync(obsoleteHook, 'utf8').trim() === oldCommand) {
      unlinkSync(obsoleteHook)
      try {
        rmdirSync(obsoleteDir)
      } catch {
        /* 保留目录中的其他用户文件 */
      }
    }
  }
}

const init = (args: string[]) => {
  gitRoot()
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
