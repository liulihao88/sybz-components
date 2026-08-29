#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { readPortalConfig } from '../src/config-file.mjs'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
let args = process.argv.slice(2)

if (args[0] === 'login') {
  const portalNames = { sjs: '石景山', chenghua: '成华', custom: '自定义网站' }
  const { profiles } = readPortalConfig()
  const options = Object.keys(portalNames).flatMap((portal) =>
    (Array.isArray(profiles[portal]) ? profiles[portal] : [])
      .filter(
        (account) =>
          account?.name &&
          typeof account.username === 'string' &&
          typeof account.password === 'string' &&
          (portal !== 'custom' || account.loginUrl),
      )
      .map((account) => ({ portal, account })),
  )

  if (!options.length) throw new Error('没有可登录的已配置账号，请先运行 portal-dev config')

  console.log('请选择要登录的账号：')
  options.forEach(({ portal, account }, index) => {
    console.log(`  ${index + 1}. ${portalNames[portal]} - ${account.name}`)
  })

  const readline = createInterface({ input: process.stdin, output: process.stdout })
  const answer = (await readline.question(`请输入序号（1-${options.length}）：`)).trim()
  readline.close()
  const selectedIndex = Number(answer) - 1
  if (!Number.isInteger(selectedIndex) || !options[selectedIndex]) throw new Error(`无效的选项：${answer || '(空)'}`)

  const selected = options[selectedIndex]
  args = ['--portal', selected.portal, selected.account.name]
}

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
  portal-dev login
  portal-dev config [--portal sjs|chenghua|custom]
  portal-dev <快捷命令别名>
  portal-dev --portal sjs|chenghua|custom [账号名称]
  portal-dev skill install [Codex skills 目录]

首次使用只需运行一次 portal-dev config。
运行 portal-dev login 可列出所有已配置账号，输入序号直接登录。
每个账号都可在 portal-dev config 时配置别名和登录/联调模式。`)
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
