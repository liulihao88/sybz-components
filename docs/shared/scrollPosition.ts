type RouterLike = {
  onBeforeRouteChange?: (...args: any[]) => unknown
  onAfterRouteChanged?: (...args: any[]) => unknown
}

type ScrollSnapshot = {
  left: number
  top: number
  updatedAt: number
}

const STORAGE_PREFIX = 'sybz-components-docs-scroll:'
const MAX_AGE = 1000 * 60 * 60 * 12
const LISTENER_FLAG = '__sybzDocsScrollPositionListenerInstalled__'
const ROUTER_FLAG = '__sybzDocsScrollPositionRouterInstalled__'

const canUseDOM = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

const getStorageKey = () => `${STORAGE_PREFIX}${window.location.pathname}${window.location.search}`

const getScrollSnapshot = (): ScrollSnapshot => ({
  left: window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
  top: window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0,
  updatedAt: Date.now(),
})

const readScrollSnapshot = (key = getStorageKey()) => {
  try {
    const raw = window.sessionStorage.getItem(key)
    if (!raw) return null

    const snapshot = JSON.parse(raw) as ScrollSnapshot
    const isValid =
      Number.isFinite(snapshot.left) &&
      Number.isFinite(snapshot.top) &&
      Number.isFinite(snapshot.updatedAt) &&
      Date.now() - snapshot.updatedAt < MAX_AGE

    return isValid ? snapshot : null
  } catch {
    return null
  }
}

const saveScrollSnapshot = (key = getStorageKey()) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(getScrollSnapshot()))
  } catch {}
}

const restoreScrollSnapshot = (key = getStorageKey()) => {
  const snapshot = readScrollSnapshot(key)
  if (!snapshot) return

  const scrollToSnapshot = () => {
    window.scrollTo({
      left: snapshot.left,
      top: snapshot.top,
      behavior: 'auto',
    })
  }

  scrollToSnapshot()
  window.requestAnimationFrame(scrollToSnapshot)
  window.requestAnimationFrame(() => window.requestAnimationFrame(scrollToSnapshot))
  ;[80, 240, 600, 1000].forEach((delay) => window.setTimeout(scrollToSnapshot, delay))
}

export const installScrollPositionRestore = (router?: RouterLike) => {
  if (!canUseDOM()) return

  const runtimeWindow = window as Window &
    Record<typeof LISTENER_FLAG, boolean | undefined> &
    Record<typeof ROUTER_FLAG, boolean | undefined>

  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  if (!runtimeWindow[LISTENER_FLAG]) {
    runtimeWindow[LISTENER_FLAG] = true
    let savePending = false
    const scheduleSave = () => {
      if (savePending) return

      savePending = true
      window.requestAnimationFrame(() => {
        savePending = false
        saveScrollSnapshot()
      })
    }

    window.addEventListener('scroll', scheduleSave, { passive: true })
    window.addEventListener('pagehide', saveScrollSnapshot)
    window.addEventListener('beforeunload', saveScrollSnapshot)
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveScrollSnapshot()
      }
    })
  }

  restoreScrollSnapshot()

  const beforeRouteChange = router?.onBeforeRouteChange
  const afterRouteChanged = router?.onAfterRouteChanged

  if (router && !runtimeWindow[ROUTER_FLAG]) {
    runtimeWindow[ROUTER_FLAG] = true
    router.onBeforeRouteChange = (...args: any[]) => {
      saveScrollSnapshot()
      return beforeRouteChange?.(...args)
    }

    router.onAfterRouteChanged = (...args: any[]) => {
      const result = afterRouteChanged?.(...args)
      restoreScrollSnapshot()
      return result
    }
  }
}
