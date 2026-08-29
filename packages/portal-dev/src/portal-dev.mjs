import { existsSync, readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright-core'
import { readPortalConfig } from './config-file.mjs'
import { recognizeCaptcha } from './recognize-captcha.mjs'
import { runInExistingChrome } from './macos-chrome.mjs'

const sleep = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds))
const args = process.argv.slice(2)
const portalConfig = readPortalConfig()
const commandAlias = args[0] && args[0] !== 'dev' && !args[0].startsWith('-') ? args[0] : undefined
const savedCommand = commandAlias
  ? Object.entries(portalConfig.profiles)
      .flatMap(([portal, profiles]) =>
        (Array.isArray(profiles) ? profiles : []).map((profile) => ({ ...profile, portal })),
      )
      .find((profile) => profile.alias === commandAlias)
  : undefined
if (commandAlias && !savedCommand)
  throw new Error(`未找到快捷命令“${commandAlias}”，请运行 portal-dev config 为账号配置别名`)
const readArg = (name) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}
const readPositionalAccount = () => {
  const valueOptions = new Set(['--portal', '--project'])
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]
    if (valueOptions.has(argument)) {
      index += 1
      continue
    }
    if (argument === 'dev' || argument === commandAlias || argument.startsWith('-')) continue
    return argument
  }
  return undefined
}

const portal = savedCommand?.portal || readArg('--portal') || 'sjs'
if (!['sjs', 'chenghua', 'custom'].includes(portal))
  throw new Error(`不支持的门户：${portal}，可选值为 sjs、chenghua、custom`)
const devMode = savedCommand?.mode === 'dev' || args[0] === 'dev'
if (devMode && portal !== 'sjs') throw new Error('门户联调目前只支持石景山；成华和自定义命令只负责登录')

const findProject = () => {
  const explicit = savedCommand?.project || readArg('--project')
  if (explicit) return resolve(explicit)
  let current = process.cwd()
  while (true) {
    if (existsSync(resolve(current, 'package.json'))) return current
    const parent = dirname(current)
    if (parent === current) break
    current = parent
  }
  throw new Error('未找到前端项目，请先进入项目目录，或使用 --project <路径> 指定')
}

const projectDir = devMode ? findProject() : undefined
if (projectDir && !existsSync(resolve(projectDir, 'package.json')))
  throw new Error(`目标项目不存在或缺少 package.json：${projectDir}`)
const configuredAccounts = portalConfig.profiles[portal]
const portalAccounts = Array.isArray(configuredAccounts)
  ? configuredAccounts.filter(
      (account) => account?.name && typeof account.username === 'string' && typeof account.password === 'string',
    )
  : []
if (!portalAccounts.length) {
  throw new Error(
    `尚未配置${portal === 'custom' ? '自定义网站' : portal === 'chenghua' ? '成华' : '石景山'}账号，请先运行 portal-dev config --portal ${portal}`,
  )
}

const selectAccount = () => {
  if (savedCommand) return savedCommand
  const accountName = readPositionalAccount()
  if (accountName) {
    const matched = portalAccounts.find((account) => account.name === accountName)
    if (!matched) throw new Error(`未找到账号“${accountName}”，请检查账号名称或重新配置`)
    return matched
  }
  return portalAccounts[0]
}

const portalAccount = selectAccount()

const configs = {
  sjs: {
    loginUrl: 'http://115.190.54.111:1880/passport/login/userLogin',
    username: portalAccount.username,
    password: portalAccount.password,
  },
  chenghua: {
    loginUrl: 'https://www.chenghua-ai.com/passport/login/userLogin',
    username: portalAccount.username,
    password: portalAccount.password,
  },
  custom: {
    loginUrl: portalAccount.loginUrl,
    username: portalAccount.username,
    password: portalAccount.password,
  },
}
const config = configs[portal]
if (!config.username || !config.password) throw new Error(`账号“${portalAccount.name}”的配置不完整，请重新配置`)
if (portal === 'custom' && !config.loginUrl) throw new Error(`账号“${portalAccount.name}”缺少登录页 URL，请重新配置`)

const localOrigin = (savedCommand?.localOrigin || 'http://localhost:5173').replace(/\/$/, '')
const localPath = savedCommand?.localPath
const iframeHost = savedCommand?.iframeHost || 'hia.sjsdoubao.com:31118'
const iframePath = savedCommand?.iframePath || '/exhibition-hall'
const roomName = savedCommand?.roomName || '3D智能展厅智能体'
const chromeCandidates = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
  win32: [
    `${process.env.PROGRAMFILES || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env['PROGRAMFILES(X86)'] || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.LOCALAPPDATA || ''}\\Google\\Chrome\\Application\\chrome.exe`,
  ],
  linux: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
}
const executablePath = chromeCandidates[process.platform]?.find(existsSync)
if (!executablePath) throw new Error('未找到 Chrome 或 Edge，请先安装浏览器')

const localUrl = new URL(localOrigin)
const isReady = async () => {
  try {
    return (await fetch(localOrigin, { redirect: 'manual' })).status < 500
  } catch {
    return false
  }
}

let devServer
if (devMode && !(await isReady())) {
  const packageJson = JSON.parse(readFileSync(resolve(projectDir, 'package.json'), 'utf8'))
  if (!packageJson.scripts?.dev) throw new Error(`目标项目没有 dev script：${projectDir}`)
  const runner = existsSync(resolve(projectDir, 'bun.lock'))
    ? 'bun'
    : existsSync(resolve(projectDir, 'pnpm-lock.yaml'))
      ? 'pnpm'
      : 'npm'
  console.log(`正在启动项目开发服务：${projectDir}`)
  devServer = spawn(runner, ['run', 'dev', '--', '--host', localUrl.hostname, '--port', localUrl.port || '80'], {
    cwd: projectDir,
    env: process.env,
    stdio: 'inherit',
  })
  for (let index = 0; index < 120 && !(await isReady()); index += 1) await sleep(500)
  if (!(await isReady())) throw new Error(`本地开发服务启动超时：${localOrigin}`)
}

if (process.platform === 'darwin') {
  await runInExistingChrome({
    config,
    devMode,
    localOrigin,
    localPath,
    iframeHost,
    iframePath,
    roomName,
    portal,
    portalName:
      portal === 'custom' ? `自定义网站“${portalAccount.name}”` : `${portal === 'chenghua' ? '成华' : '石景山'}门户`,
    recognizeCaptcha,
  })
}

const browser = await chromium.launch({ headless: false, executablePath })
const context = await browser.newContext()
const page = await context.newPage()
await page.goto(config.loginUrl, { waitUntil: 'domcontentloaded' })

const visibleLocator = async (selectors) => {
  for (const frame of page.frames()) {
    for (const selector of selectors) {
      const locator = frame.locator(selector).filter({ visible: true }).first()
      if (await locator.count().catch(() => 0)) return locator
    }
  }
  return null
}

const clickText = async (text) => {
  for (const frame of page.frames()) {
    const locator = frame.getByText(text, { exact: false }).filter({ visible: true }).first()
    if (await locator.count().catch(() => 0)) {
      await locator.click()
      return true
    }
  }
  return false
}

const login = async () => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    let captcha
    try {
      captcha = await visibleLocator([
        'img.code-img',
        'img[class*="captcha" i]',
        'img[alt*="验证码"]',
        'img[title*="验证码"]',
      ])
      if (!captcha) throw new Error('未找到图形验证码')
      const captchaUrl = await captcha.evaluate((image) => image.currentSrc || image.src || '')
      const captchaText = await recognizeCaptcha(
        captchaUrl && !captchaUrl.startsWith('blob:') ? captchaUrl : await captcha.screenshot(),
      )
      console.log(`已识别图形验证码（第 ${attempt}/3 次）`)
      const usernameInput = await visibleLocator([
        'input[autocomplete="username"]',
        'input[name="username"]',
        'input[placeholder*="用户名"]',
        'input[placeholder*="账号"]',
        'input[autocomplete="off"]:not([type="password"]):not([placeholder*="验证码"])',
      ])
      const passwordInput = await visibleLocator([
        'input[autocomplete="current-password"]',
        'input[name="password"]',
        'input[type="password"]',
        'input[placeholder*="密码"]',
      ])
      const captchaInput = await visibleLocator([
        'input[placeholder*="图形验证码"]',
        'input[placeholder*="验证码"]',
        'input[name*="captcha" i]',
        'input[name*="code" i]',
      ])
      if (!usernameInput || !passwordInput || !captchaInput) throw new Error('登录表单字段不完整')
      await usernameInput.fill(config.username)
      await passwordInput.fill(config.password)
      await captchaInput.fill(captchaText)
      const button = await visibleLocator([
        '.btn-box .btn',
        'button:has-text("登录")',
        '[role="button"]:has-text("登录")',
      ])
      if (!button) throw new Error('未找到登录按钮')
      await button.click()
      await sleep(1800)
      const stillLoginForm = Boolean(await visibleLocator(['input[type="password"]', 'input[placeholder*="验证码"]']))
      if (!page.url().includes('/passport/login/') && !stillLoginForm) return
      throw new Error('登录未成功')
    } catch (error) {
      console.error(`第 ${attempt} 次登录失败：${error instanceof Error ? error.message : error}`)
      if (attempt < 3) await captcha?.click().catch(() => undefined)
      await sleep(800)
    }
  }
  throw new Error('自动登录失败，已达到最多重试次数')
}

const loginWithoutCaptcha = async () => {
  const usernameInput = await visibleLocator([
    'input[autocomplete="username"]',
    'input[name="username"]',
    'input[name="account"]',
    'input[name="login"]',
    'input[name="user"]',
    'input[name="email"]',
    'input[type="email"]',
    'input[type="tel"]',
    'input[placeholder*="用户名"]',
    'input[placeholder*="账号"]',
    'input[placeholder*="邮箱"]',
    'input[placeholder*="手机"]',
  ])
  const passwordInput = await visibleLocator([
    'input[autocomplete="current-password"]',
    'input[name="password"]',
    'input[type="password"]',
    'input[placeholder*="密码"]',
  ])
  if (!usernameInput || !passwordInput) throw new Error('未找到常见的用户名或密码输入框')
  await usernameInput.fill(config.username)
  await passwordInput.fill(config.password)
  const button = await visibleLocator([
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("登录")',
    '[role="button"]:has-text("登录")',
    'button:has-text("Login")',
    '[role="button"]:has-text("Login")',
    'button:has-text("Sign in")',
    '[role="button"]:has-text("Sign in")',
  ])
  if (!button) throw new Error('未找到常见的登录按钮')
  const originalUrl = page.url()
  await button.click()
  await Promise.race([
    page.waitForURL((url) => url.href !== originalUrl, { timeout: 15000 }),
    passwordInput.waitFor({ state: 'hidden', timeout: 15000 }),
  ]).catch(() => undefined)
  console.log(`自定义网站“${portalAccount.name}”已填写账号密码并点击登录。`)
}

if (portal === 'custom') await loginWithoutCaptcha()
else if (page.url().includes('/passport/login/') || portal === 'chenghua') await login()
if (!devMode) {
  if (portal === 'chenghua')
    await page.goto('https://www.chenghua-ai.com/chat/pages/application', { waitUntil: 'domcontentloaded' })
  console.log(
    `${portal === 'custom' ? `自定义网站“${portalAccount.name}”` : `${portal === 'chenghua' ? '成华' : '石景山'}门户`}登录流程已完成，按 Ctrl+C 结束。`,
  )
  await new Promise(() => undefined)
}

let sampleRoomClicked = false
let searched = false
let targetUrl
for (let index = 0; index < 180; index += 1) {
  for (const frame of page.frames()) {
    try {
      const candidate = new URL(frame.url())
      if (
        candidate.host === iframeHost &&
        candidate.pathname.startsWith(iframePath) &&
        candidate.searchParams.has('token')
      )
        targetUrl = candidate
    } catch {
      continue
    }
  }
  if (targetUrl) break
  if (!sampleRoomClicked) sampleRoomClicked = await clickText('智能体样板间')
  else if (!searched) {
    const search = await visibleLocator([
      'input[placeholder*="搜索"]',
      'input[placeholder*="查找"]',
      'input[type="search"]',
    ])
    if (search) {
      await search.fill(roomName)
      searched = true
      await sleep(800)
    }
  } else (await clickText(roomName)) || (await clickText('3D智能展厅'))
  await sleep(1000)
}

if (!targetUrl) throw new Error(`未找到目标智能体入口：${roomName}`)
const destination = new URL(`${localPath || targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`, localOrigin)
await context.newPage().then((localPage) => localPage.goto(destination.href))
console.log(`门户本地调试已就绪：${localOrigin}${targetUrl.pathname}`)
console.log('Token 未打印、未写入文件。按 Ctrl+C 结束。')

const shutdown = async () => {
  devServer?.kill('SIGTERM')
  await browser.close().catch(() => undefined)
  process.exit(0)
}
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
await new Promise(() => undefined)
