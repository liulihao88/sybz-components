import { spawn } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright-core'
import { getPortalConfigPath } from './config-file.mjs'

const sleep = (milliseconds) => new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds))
const debugPort = Number(process.env.PORTAL_CHROME_DEBUG_PORT || 9229)
const debugOrigin = `http://127.0.0.1:${debugPort}`

const isChromeReady = async () => {
  try {
    const response = await fetch(`${debugOrigin}/json/version`, { signal: AbortSignal.timeout(800) })
    return response.ok
  } catch {
    return false
  }
}

const startChrome = async (executablePath) => {
  const profileDir = resolve(dirname(getPortalConfigPath()), 'chrome-profile')
  mkdirSync(profileDir, { recursive: true })
  const chrome = spawn(
    executablePath,
    [
      `--remote-debugging-port=${debugPort}`,
      '--remote-allow-origins=*',
      `--user-data-dir=${profileDir}`,
      '--no-first-run',
      '--no-default-browser-check',
    ],
    { detached: true, stdio: 'ignore' },
  )
  chrome.unref()

  for (let index = 0; index < 40 && !(await isChromeReady()); index += 1) await sleep(250)
  if (!(await isChromeReady())) throw new Error(`Chrome 调试端口启动超时：${debugOrigin}`)
}

export const connectWindowsChrome = async (executablePath) => {
  if (!(await isChromeReady())) {
    console.log('未发现可复用的门户 Chrome，正在首次启动。')
    await startChrome(executablePath)
  } else {
    console.log('正在复用已打开的门户 Chrome。')
  }

  const browser = await chromium.connectOverCDP(debugOrigin)
  const context = browser.contexts()[0]
  if (!context) throw new Error('无法读取门户 Chrome 的默认浏览器上下文')
  return { browser, context }
}
