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

if (args.includes('--help') || args.includes('-h')) {
  console.log(`用法：
  portal-dev --portal sjs [--project <目录>]
  portal-dev --portal chenghua [--project <目录>]
  portal-dev skill install [Codex skills 目录]

默认门户为 sjs，默认项目目录为当前目录。凭据从项目 .env.local、.env 或进程环境变量读取。`)
  process.exit(0)
}

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
