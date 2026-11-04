import { onBeforeUnmount, onMounted, ref, toValue } from 'vue'
import type { MaybeRefOrGetter, Ref } from 'vue'

export interface UseRefreshOptions {
  enableShortcut?: MaybeRefOrGetter<boolean>
  shortcut?: MaybeRefOrGetter<string>
}

export interface UseRefreshReturn {
  refreshKey: Ref<number>
  refresh: () => void
}

export default function useRefresh(options: UseRefreshOptions = {}): UseRefreshReturn {
  const refreshKey = ref(0)

  function refresh() {
    console.clear()
    refreshKey.value += 1
  }

  function handleKeydown(event: KeyboardEvent) {
    if (toValue(options.enableShortcut) === false) return
    const isMac = navigator.userAgent.includes('Macintosh')
    const shortcut = toValue(options.shortcut) ?? (isMac ? 'Meta+Enter' : 'Ctrl+Enter')
    const parts = shortcut
      .toLowerCase()
      .split('+')
      .map((part) => part.trim())
    const key = parts.pop()
    const modifiers = new Set(parts.map((part) => (part === 'mod' ? (isMac ? 'meta' : 'ctrl') : part)))

    if (!key || parts.length !== modifiers.size) return
    if ([...modifiers].some((part) => !['ctrl', 'meta', 'alt', 'shift'].includes(part))) return
    if (event.key.toLowerCase() !== key) return
    if (event.ctrlKey !== modifiers.has('ctrl')) return
    if (event.metaKey !== modifiers.has('meta')) return
    if (event.altKey !== modifiers.has('alt')) return
    if (event.shiftKey !== modifiers.has('shift')) return

    event.preventDefault()
    refresh()
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))

  return { refreshKey, refresh }
}
