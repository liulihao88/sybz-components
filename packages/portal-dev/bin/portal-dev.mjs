#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)

if (args[0] === 'skill' && args[1] === 'install') {
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (!homeDir) throw new Error('无法识别用户目录，请设置 HOME 或 USERPROFILE')
  const sourceDir = resolve(packageDir, 'skills/portal-dev')
  const targetRoot = args[2] ? resolve(args[2]) : resolve(homeDir, '.codex/skills')
  const targetDir = resolve(targetRoot, 'portal-dev')
  if (!existsSync(sourceDir)) throw new Error(`Skill 源目录不存在：${sourceDir}`)
  mkdirSync(targetRoot, { recursive: true })
  rmSync(targetDir, { recursive: true, force: true })
  cpSync(sourceDir, targetDir, { recursive: true })
  console.log(`portal-dev Skill 已安装到 ${targetDir}`)
  process.exit(0)
}

if (args[0] === 'config') {
  const child = spawn(process.execPath, [resolve(packageDir, 'src/configure.mjs'), ...args.slice(1)], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  })
  child.on('error', (error) => {
    throw error
  })
  child.on('exit', (code, signal) => (signal ? process.kill(process.pid, signal) : process.exit(code ?? 0)))
} else if (args.includes('--help') || args.includes('-h')) {
  console.log(`用法：
  portal-dev
  portal-dev config [--portal sjs|chenghua|custom]
  portal-dev config command
  portal-dev <快捷命令别名>
  portal-dev --portal sjs|chenghua|custom [账号名称]
  portal-dev skill install [Codex skills 目录]

首次使用只需运行一次 portal-dev config。
默认快捷命令：portal-dev ds 登录石景山，portal-dev sc 登录成华。
运行 portal-dev config command 可新增或修改快捷命令。`)
  process.exit(0)
} else {
  const child = spawn(process.execPath, [resolve(packageDir, 'src/portal-dev.mjs'), ...args], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  })

  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal))
  child.on('error', (error) => {
    throw error
  })
  child.on('exit', (code, signal) => (signal ? process.kill(process.pid, signal) : process.exit(code ?? 0)))
}
