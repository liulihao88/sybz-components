import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { Ref } from 'vue'

export interface UseRefreshReturn {
  refreshKey: Ref<number>
  refresh: () => void
}

export default function useRefresh(): UseRefreshReturn {
  const refreshKey = ref(0)

  function refresh() {
    console.clear()
    refreshKey.value += 1
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return

    const isMac = navigator.userAgent.includes('Macintosh')
    const isRefreshShortcut = isMac ? event.metaKey : event.ctrlKey
    if (!isRefreshShortcut) return

    event.preventDefault()
    refresh()
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))

  return { refreshKey, refresh }
}
