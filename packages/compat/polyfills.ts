/**
 * 组件库统一兼容入口（Chrome 60+）。
 *
 * 只要业务项目引用了组件库（主入口、按需入口或 UMD 产物），
 * 这里会一次性补齐语法降级后仍然缺失的运行时 API，业务项目不再需要
 * 手动 `import 'core-js/stable'`。
 */
import 'core-js/stable'
// 只安装 AbortController / AbortSignal，不劫持浏览器原生 fetch；
// Chrome 60 打开预览类组件时不会再因为 AbortController 未定义而报错。
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer'

if (typeof window !== 'undefined' && typeof window.ResizeObserver === 'undefined') {
  window.ResizeObserver = ResizeObserverPolyfill as unknown as typeof ResizeObserver
}
