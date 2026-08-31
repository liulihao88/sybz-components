#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { ensurePortalConfig, readPortalConfig } from '../src/config-file.mjs'

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const selectionKeys = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let args = process.argv.slice(2)

const printHelp = () => {
  console.log(`portal-dev - 成华、石景山门户与自定义网站自动登录/本地联调 CLI

用法
  portal-dev login [序号或按键]
  portal-dev [--portal <sjs|chenghua|custom>] [账号名称]
  portal-dev <profile 快捷别名>
  portal-dev dev [--project <项目路径>]
  portal-dev config [--portal <sjs|chenghua|custom>]
  portal-dev open
  portal-dev skill install [Codex skills 目录]
  portal-dev help | --help | -h

命令
  login          选择已配置账号，传入序号或按键时直接登录或联调
  config         新增账号，或按账号名称更新账号、别名和模式
  open           使用系统默认应用打开配置文件
  dev            启动石景山本地联调，默认使用当前项目
  skill install  安装随包提供的 Codex portal-dev Skill
  help           显示帮助

参数
  --portal <类型>  门户类型：sjs（默认）、chenghua 或 custom
  --project <路径> 需要 CLI 自动启动的前端项目路径
  --help, -h       显示帮助，不执行登录

账号选择
  login 1         直接选择第 1 个账号
  login 10        直接选择第 10 个账号
  login A         直接选择第 10 个账号（快捷键写法）
  1-9             选择第 1-9 个账号，无需回车
  A-Z             选择第 10-35 个账号，无需回车
  超过 35 个账号或终端不支持单键输入时，输入完整序号后回车。

联调默认值
  localOrigin     http://localhost:5173
  localPath       从门户 iframe 地址继承
  roomName        3D智能展厅智能体
  iframeHost      hia.sjsdoubao.com:31118
  iframePath      /exhibition-hall

环境变量
  CHROME_PATH                 手动指定 Chrome 或 Edge 可执行文件
  PORTAL_CHROME_DEBUG_PORT    Windows 门户 Chrome 复用端口，默认 9229

配置文件
  macOS / Linux   ~/.config/sybz-components/portal-dev.json
  Windows         %APPDATA%\\sybz-components\\portal-dev.json

示例
  portal-dev config --portal sjs
  portal-dev open
  portal-dev login
  portal-dev login 1
  portal-dev --portal chenghua 成华账号
  portal-dev --portal custom 内部系统
  portal-dev sjs-dev
  portal-dev skill install`)
}

if (args[0] === 'help' || args.includes('--help') || args.includes('-h')) {
  printHelp()
  process.exit(0)
}

if (args[0] === 'open') {
  const { configPath } = ensurePortalConfig()
  const [command, commandArgs] =
    process.platform === 'win32'
      ? ['cmd.exe', ['/d', '/c', 'start', '', configPath]]
      : process.platform === 'darwin'
        ? ['open', [configPath]]
        : ['xdg-open', [configPath]]
  const child = spawn(command, commandArgs, { detached: true, stdio: 'ignore' })
  await new Promise((resolveOpen, reject) => {
    child.once('error', reject)
    child.once('spawn', resolveOpen)
  })
  child.unref()
  console.log(`配置文件已打开：${configPath}`)
  process.exit(0)
}

const readSingleKey = (validKeys) =>
  new Promise((resolveKey, reject) => {
    const wasRaw = process.stdin.isRaw
    const cleanup = () => {
      process.stdin.removeListener('data', onData)
      if (!wasRaw) process.stdin.setRawMode(false)
      process.stdin.pause()
    }
    const onData = (input) => {
      for (const character of input.toUpperCase()) {
        if (character === '\u0003') {
          cleanup()
          process.stdout.write('\n')
          reject(new Error('已取消选择'))
          return
        }
        if (!validKeys.includes(character)) continue
        cleanup()
        process.stdout.write(`${character}\n`)
        resolveKey(character)
        return
      }
    }
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', onData)
  })

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

  const directSelection = args[1]?.trim().toUpperCase()
  let answer = directSelection
  let selectedIndex = /^\d+$/.test(directSelection || '')
    ? Number(directSelection) - 1
    : selectionKeys.indexOf(directSelection)

  if (!directSelection) {
    const singleKeyMode =
      options.length <= selectionKeys.length && Boolean(process.stdin.isTTY && process.stdin.setRawMode)
    console.log('请选择要登录的账号：')
    options.forEach(({ portal, account }, index) => {
      const label = singleKeyMode ? selectionKeys[index] : String(index + 1)
      console.log(`  ${label}. ${portalNames[portal]} - ${account.name}`)
    })

    if (singleKeyMode) {
      const validKeys = selectionKeys.slice(0, options.length)
      process.stdout.write('请按对应按键（无需回车）：')
      answer = await readSingleKey(validKeys)
      selectedIndex = validKeys.indexOf(answer)
    } else {
      const readline = createInterface({ input: process.stdin, output: process.stdout })
      answer = (await readline.question(`请输入序号（1-${options.length}）：`)).trim()
      readline.close()
      selectedIndex = Number(answer) - 1
    }
  }
  if (!Number.isInteger(selectedIndex) || !options[selectedIndex]) throw new Error(`无效的选项：${answer || '(空)'}`)

  const selected = options[selectedIndex]
  args = ['--profile', selected.account.name, '--portal', selected.portal]
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
  const { configPath, created } = ensurePortalConfig()
  console.log(`portal-dev Skill 已安装到 ${targetDir}`)
  console.log(`${created ? '默认配置文件已创建' : '配置文件已存在'}：${configPath}`)
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
