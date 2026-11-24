import type { Plugin, ResolvedConfig } from 'vite'

export type SybzVersionCheckPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface SybzVersionCheckOptions {
  /** 轮询间隔，单位毫秒，默认 5 分钟；页面重新获得焦点时会立即检查一次。 */
  interval?: number
  /** 版本文件路径，默认 `version.json`，相对于构建 base。 */
  versionFile?: string
  /** 直接指定版本文件 URL，设置后忽略 versionFile/base。 */
  versionUrl?: string
  /** 手动指定版本号；默认每次构建生成唯一值。 */
  version?: string
  /** 更新提示文案，默认「发现新版本，请刷新页面」。 */
  text?: string
  /** 刷新按钮文案，默认「刷新」。 */
  reloadText?: string
  /** 提示位置，默认右下角。 */
  position?: SybzVersionCheckPosition
  /** 是否显示内置更新提示，默认 true；设为 false 时只派发事件，由业务自己弹 confirm/toast。 */
  prompt?: boolean
  /** 检测到新版本时派发的事件名，默认 `sybz:version-update`。 */
  eventName?: string
}

const POSITION_STYLES: Record<SybzVersionCheckPosition, string> = {
  'top-left': 'top:24px;left:24px;',
  'top-right': 'top:24px;right:24px;',
  'bottom-left': 'bottom:24px;left:24px;',
  'bottom-right': 'bottom:24px;right:24px;',
}

const formatBuildTime = (date: Date) => {
  const pad = (value: number) => String(value).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}`
}

const createVersion = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const joinBase = (base: string, file: string) => {
  if (/^(?:[a-z]+:)?\/\//i.test(file) || file.startsWith('/')) return file
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}${file.replace(/^\.?\//, '')}`
}

const createClientScript = (options: {
  versionUrl: string
  interval: number
  text: string
  reloadText: string
  position: SybzVersionCheckPosition
  prompt: boolean
  eventName: string
}) => `(function () {
  var currentVersion = window.__SYBZ_VERSION__;
  if (!currentVersion || typeof window.fetch !== 'function') return;
  var versionUrl = ${JSON.stringify(options.versionUrl)};
  var interval = ${JSON.stringify(options.interval)};
  var text = ${JSON.stringify(options.text)};
  var reloadText = ${JSON.stringify(options.reloadText)};
  var positionStyle = ${JSON.stringify(POSITION_STYLES[options.position] ?? POSITION_STYLES['bottom-right'])};
  var prompt = ${JSON.stringify(options.prompt)};
  var eventName = ${JSON.stringify(options.eventName)};
  var notified = false;

  function showUpdate() {
    if (!document.body) return;

    var box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.setAttribute('aria-live', 'polite');
    box.style.cssText = 'position:fixed;' + positionStyle + 'box-sizing:border-box;z-index:99999;display:flex;align-items:center;gap:12px;padding:12px 16px;border:1px solid #e5e7eb;border-radius:10px;background:#fff;color:#1f2937;box-shadow:0 8px 24px rgba(15,23,42,.18);font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;';

    var label = document.createElement('span');
    label.textContent = text;

    var button = document.createElement('button');
    button.type = 'button';
    button.textContent = reloadText;
    button.style.cssText = 'flex:none;box-sizing:border-box;width:auto;border:0;border-radius:6px;background:#2f6fed;color:#fff;padding:8px 14px;font:inherit;cursor:pointer;';
    button.onclick = function () { window.location.reload(); };

    box.appendChild(label);
    box.appendChild(button);
    document.body.appendChild(box);
  }

  function notify(data) {
    if (notified) return;
    notified = true;

    var detail = { version: data.version, currentVersion: currentVersion };
    var event;
    try {
      event = new CustomEvent(eventName, { detail: detail, cancelable: true });
    } catch (error) {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, true, detail);
    }

    var handled = false;
    try { handled = !window.dispatchEvent(event); } catch (error) {}
    if (!handled && prompt) showUpdate();
  }

  function checkVersion() {
    if (notified) return;
    var separator = versionUrl.indexOf('?') === -1 ? '?' : '&';
    window.fetch(versionUrl + separator + 't=' + Date.now(), { cache: 'no-store' })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        if (data && data.version && data.version !== currentVersion) notify(data);
      })
      .catch(function () {});
  }

  window.setInterval(checkVersion, interval);
  window.setTimeout(checkVersion, 1000);
  window.addEventListener('focus', checkVersion);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) checkVersion();
  });
})();`

/** 创建构建产物版本检测插件。 */
export const createVersionCheck = (options: SybzVersionCheckOptions = {}): Plugin => {
  let version = options.version ?? createVersion()
  let buildTime = formatBuildTime(new Date())
  const interval = Math.max(1000, Number(options.interval) || 5 * 60 * 1000)
  const versionFile = (options.versionFile ?? 'version.json').replace(/^\/+/, '')
  let config: ResolvedConfig | undefined
  let disabled = false

  return {
    name: 'sybz:version-check',
    apply: 'build',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      disabled = Boolean(config.build?.lib || config.build?.ssr)
    },
    buildStart() {
      // watch 模式下每次重新构建都应该生成新版本，客户端才能检测到更新。
      if (!options.version) version = createVersion()
      buildTime = formatBuildTime(new Date())
    },
    generateBundle() {
      if (disabled) return
      this.emitFile({
        type: 'asset',
        fileName: versionFile,
        source: JSON.stringify({ version, buildTime }),
      })
    },
    transformIndexHtml() {
      if (disabled) return
      const versionUrl = options.versionUrl ?? joinBase(config?.base || '/', versionFile)

      return [
        {
          tag: 'meta',
          attrs: { name: 'sybz-version', content: version },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: `window.__SYBZ_VERSION__ = ${JSON.stringify(version)};`,
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: createClientScript({
            versionUrl,
            interval,
            text: options.text ?? '发现新版本，请刷新页面',
            reloadText: options.reloadText ?? '刷新',
            position: options.position ?? 'bottom-right',
            prompt: options.prompt !== false,
            eventName: options.eventName ?? 'sybz:version-update',
          }),
          injectTo: 'body',
        },
      ]
    },
  }
}
