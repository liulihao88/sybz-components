import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const waitForExitSignal = () =>
  new Promise((resolve) => {
    const keepAlive = setInterval(() => undefined, 60_000)
    const finish = () => {
      clearInterval(keepAlive)
      process.removeListener('SIGINT', finish)
      process.removeListener('SIGTERM', finish)
      resolve()
    }
    process.once('SIGINT', finish)
    process.once('SIGTERM', finish)
  })
const escapeAppleScript = (value) => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ')

const runAppleScript = async (script) => {
  const { stdout } = await execFileAsync('/usr/bin/osascript', ['-e', script])
  return stdout.trim()
}

const openTab = async (url) => {
  const result = await runAppleScript(`
    tell application "Google Chrome"
      activate
      if (count windows) = 0 then make new window
      set currentWindow to front window
      tell currentWindow
        set newTab to make new tab with properties {URL:"${escapeAppleScript(url)}"}
        set active tab index to (count tabs)
      end tell
      return "tab id " & (id of newTab) & " of window id " & (id of currentWindow)
    end tell
  `)
  const match = result.match(/tab id (\d+) of window id (\d+)/)
  if (!match) throw new Error(`无法识别 Chrome 新标签页：${result}`)
  return { tabId: Number(match[1]), windowId: Number(match[2]) }
}

const execute = (tab, javascript) =>
  runAppleScript(
    `tell application "Google Chrome" to return (execute tab id ${tab.tabId} of window id ${tab.windowId} javascript "${escapeAppleScript(javascript)}") as text`,
  )

const pageState = async (tab) =>
  JSON.parse(
    await execute(
      tab,
      `(() => JSON.stringify({url: location.href, frameUrls: Array.from(document.querySelectorAll('iframe')).map((frame) => frame.src).filter(Boolean)}))()`,
    ),
  )

const findTargetUrl = (state, iframeHost, iframePath) =>
  state.frameUrls
    .map((value) => {
      try {
        return new URL(value, state.url)
      } catch {
        return undefined
      }
    })
    .find((url) => url?.host === iframeHost && url.pathname.startsWith(iframePath) && url.searchParams.has('token'))

const clickText = async (tab, text) =>
  (await execute(
    tab,
    `(() => {
      const label = ${JSON.stringify(text)};
      const visible = (element) => { const style = getComputedStyle(element); const rect = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0; };
      const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], div, span')).filter((element) => visible(element) && (element.textContent || '').includes(label)).sort((a, b) => (a.textContent || '').length - (b.textContent || '').length);
      if (!candidates[0]) return 'false'; candidates[0].click(); return 'true';
    })()`,
  )) === 'true'

const fillSearch = async (tab, roomName) =>
  (await execute(
    tab,
    `(() => {
      const input = document.querySelector('input[placeholder*="搜索"], input[placeholder*="查找"], input[type="search"]');
      if (!input) return 'false';
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      setter.call(input, ${JSON.stringify(roomName)}); input.dispatchEvent(new Event('input', {bubbles:true})); input.dispatchEvent(new Event('change', {bubbles:true})); return 'true';
    })()`,
  )) === 'true'

const waitForPortalReady = async (tab) => {
  let stableCount = 0
  for (let index = 0; index < 120; index += 1) {
    const ready =
      (await execute(
        tab,
        `(() => {
          const visible = (element) => { const style = getComputedStyle(element); const rect = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.width > 0 && rect.height > 0; };
          const loading = Array.from(document.querySelectorAll('.el-loading-mask, .ant-spin-spinning, .n-spin-body, .loading-mask, .loading-overlay, .v-loading-mask, [aria-busy="true"]')).some(visible);
          return document.readyState === 'complete' && !loading ? 'true' : 'false';
        })()`,
      )) === 'true'
    stableCount = ready ? stableCount + 1 : 0
    if (stableCount >= 2) {
      await sleep(800)
      return
    }
    await sleep(500)
  }
  throw new Error('门户页面 loading 等待超时')
}

const fillAndSubmit = async (tab, { username, password, captchaText, custom }) =>
  JSON.parse(
    await execute(
      tab,
      `(() => {
        const values = ${JSON.stringify({ username, password, captchaText })};
        const visible = (element) => { const style = getComputedStyle(element); const rect = element.getBoundingClientRect(); return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0; };
        const inputs = Array.from(document.querySelectorAll('input')).filter(visible);
        const setValue = (element, value) => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; setter.call(element, value); element.dispatchEvent(new Event('input', {bubbles:true})); element.dispatchEvent(new Event('change', {bubbles:true})); };
        const attribute = (input, name) => input.getAttribute(name) || '';
        const passwordInput = inputs.find((input) => attribute(input, 'autocomplete') === 'current-password' || /^password$/i.test(attribute(input, 'name')) || input.type === 'password' || /密码/.test(attribute(input, 'placeholder')));
        const captchaInput = inputs.find((input) => /验证码/.test(attribute(input, 'placeholder')) || /captcha|code/i.test(attribute(input, 'name')));
        const usernameInput = inputs.find((input) => attribute(input, 'autocomplete') === 'username' || /^(username|account|login|user|email|phone)$/i.test(attribute(input, 'name')) || /用户名|账号|邮箱|手机/.test(attribute(input, 'placeholder'))) || inputs.find((input) => input !== passwordInput && input !== captchaInput && /^(text|email|tel|number)$/.test(input.type));
        const missing = [!usernameInput && '账号输入框', !passwordInput && '密码输入框', !${custom} && !captchaInput && '验证码输入框'].filter(Boolean);
        if (missing.length) return JSON.stringify({submitted:false, reason:'未找到' + missing.join('、')});
        setValue(usernameInput, values.username); setValue(passwordInput, values.password); if (captchaInput) setValue(captchaInput, values.captchaText);
        const button = Array.from(document.querySelectorAll('button, input[type="submit"], [role="button"], .btn-box .btn')).filter(visible).find((element) => element.type === 'submit' || /登录|Login|Sign in/i.test(element.textContent || element.value || ''));
        if (!button) return JSON.stringify({submitted:false, reason:'未找到登录按钮'}); button.click(); return JSON.stringify({submitted:true});
      })()`,
    ),
  )

const login = async (tab, config, recognizeCaptcha, custom) => {
  for (let attempt = 1; attempt <= (custom ? 1 : 5); attempt += 1) {
    let captchaText = ''
    if (!custom) {
      const captchaUrl = await execute(
        tab,
        `(() => { const image = document.querySelector('img.code-img, img[class*="captcha" i], img[alt*="验证码"], img[title*="验证码"]'); return image ? (image.currentSrc || image.src || '') : ''; })()`,
      )
      if (!captchaUrl) {
        const state = await pageState(tab)
        if (!state.url.includes('/passport/login/')) return
        throw new Error('未找到图形验证码')
      }
      captchaText = await recognizeCaptcha(captchaUrl)
      console.log(`已识别图形验证码（第 ${attempt}/5 次）`)
    }
    const result = await fillAndSubmit(tab, { ...config, captchaText, custom })
    if (!result.submitted) {
      const state = await pageState(tab)
      if (custom || !state.url.includes('/passport/login/')) return
      throw new Error(result.reason || '登录表单字段不完整或未找到登录按钮')
    }
    await sleep(1800)
    const state = await pageState(tab)
    if (custom || !state.url.includes('/passport/login/')) return
    if (attempt < 5)
      await execute(
        tab,
        `(() => { const image = document.querySelector('img.code-img, img[class*="captcha" i]'); if (image) image.click(); return ''; })()`,
      )
  }
  throw new Error('自动登录失败，已达到最多重试次数')
}

export const runInExistingChrome = async ({
  config,
  devMode,
  localOrigin,
  localPath,
  iframeHost,
  iframePath,
  roomName,
  portal,
  portalName,
  recognizeCaptcha,
}) => {
  console.log('正在使用当前打开的 Google Chrome 登录门户。')
  const tab = await openTab(config.loginUrl)
  await sleep(800)
  const state = await pageState(tab)
  if (portal === 'custom') {
    if (state.url === config.loginUrl || state.url.startsWith(`${config.loginUrl}#`))
      await login(tab, config, recognizeCaptcha, true)
  } else if (state.url.includes('/passport/login/')) await login(tab, config, recognizeCaptcha, false)

  if (!devMode) {
    if (portal === 'chenghua') {
      await execute(tab, `location.href = 'https://www.chenghua-ai.com/chat/pages/application'; ''`)
    }
    console.log(`${portalName}登录流程已完成。`)
    return
  }

  console.log('正在等待门户页面加载完成。')
  await waitForPortalReady(tab)
  console.log('门户页面已加载，正在进入智能体样板间。')
  let sampleRoomClicked = false
  let searched = false
  for (let index = 0; index < 180; index += 1) {
    const currentState = await pageState(tab)
    const targetUrl = findTargetUrl(currentState, iframeHost, iframePath)
    if (targetUrl) {
      const destination = new URL(`${localPath || targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`, localOrigin)
      await openTab(destination.href)
      console.log(`门户本地调试已就绪：${localOrigin}${targetUrl.pathname}`)
      console.log('Token 未打印、未写入文件。按 Ctrl+C 结束。')
      await waitForExitSignal()
      return
    }
    if (!sampleRoomClicked) sampleRoomClicked = await clickText(tab, '智能体样板间')
    else if (!searched) searched = await fillSearch(tab, roomName)
    else (await clickText(tab, roomName)) || (await clickText(tab, '3D智能展厅'))
    await sleep(1000)
  }
  throw new Error(`未找到目标智能体入口：${roomName}`)
}
