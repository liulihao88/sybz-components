<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'

type RouteHistoryItem = {
  path: string
  title: string
}

const STORAGE_KEY = 'sybz-docs-route-history'
const MAX_HISTORY_LENGTH = 50
const route = useRoute()
const router = useRouter()
const historyItems = ref<RouteHistoryItem[]>([])
const currentIndex = ref(-1)
const mounted = ref(false)
let pendingPath = ''

const normalizePath = (path: string) => path.replace(/\/$/, '') || '/'
const currentPath = () => normalizePath(route.path)
const currentTitle = () => route.data.title || currentPath()
const isNotFoundRoute = () => route.data.isNotFound === true

const saveHistory = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems.value))
  } catch {
    // 浏览器存储不可用时，历史按钮在当前页面生命周期内仍可正常使用。
  }
}

const loadHistory = () => {
  try {
    const storedHistory = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(storedHistory)) return []

    return storedHistory
      .filter((item): item is RouteHistoryItem => typeof item?.path === 'string' && typeof item?.title === 'string')
      .reduce<RouteHistoryItem[]>((items, item) => {
        const path = normalizePath(item.path)
        return [...items.filter((historyItem) => historyItem.path !== path), { ...item, path }]
      }, [])
      .slice(-MAX_HISTORY_LENGTH)
  } catch {
    return []
  }
}

const recordCurrentRoute = () => {
  const path = currentPath()

  if (isNotFoundRoute()) {
    const removedIndex = historyItems.value.findIndex((item) => item.path === path)
    if (removedIndex >= 0) {
      historyItems.value.splice(removedIndex, 1)
      if (removedIndex <= currentIndex.value) currentIndex.value -= 1
      saveHistory()
    }
    pendingPath = ''
    return
  }

  const title = currentTitle()

  if (pendingPath === path) {
    currentIndex.value = historyItems.value.findIndex((item) => item.path === path)
    pendingPath = ''
    return
  }

  if (historyItems.value[currentIndex.value]?.path === path) {
    historyItems.value[currentIndex.value].title = title
    saveHistory()
    return
  }

  const previousItems = historyItems.value.slice(0, currentIndex.value + 1).filter((item) => item.path !== path)

  historyItems.value = [...previousItems, { path, title }].slice(-MAX_HISTORY_LENGTH)
  currentIndex.value = historyItems.value.length - 1
  saveHistory()
}

const previousItem = computed(() => historyItems.value[currentIndex.value - 1])
const nextItem = computed(() => historyItems.value[currentIndex.value + 1])

const goToHistory = async (index: number) => {
  const target = historyItems.value[index]
  if (!target) return

  pendingPath = target.path
  try {
    await router.go(target.path)
    if (currentPath() === target.path) {
      currentIndex.value = index
      saveHistory()
    } else {
      pendingPath = ''
    }
  } catch {
    pendingPath = ''
  }
}

watch(
  () => route.path,
  () => {
    if (mounted.value) recordCurrentRoute()
  },
)

onMounted(() => {
  historyItems.value = loadHistory()
  if (isNotFoundRoute()) {
    const path = currentPath()
    historyItems.value = historyItems.value.filter((item) => item.path !== path)
    currentIndex.value = historyItems.value.length - 1
    saveHistory()
    mounted.value = true
    return
  }

  const existingIndex = historyItems.value.findIndex((item) => item.path === currentPath())

  if (existingIndex >= 0) {
    currentIndex.value = existingIndex
    historyItems.value[existingIndex].title = currentTitle()
    saveHistory()
  } else {
    currentIndex.value = historyItems.value.length - 1
    recordCurrentRoute()
  }

  mounted.value = true
})
</script>

<template>
  <nav class="route-history-controls" aria-label="文档浏览历史">
    <s-button
      class="route-history-controls__button"
      :disabled="!previousItem"
      :content="previousItem ? `后退：${previousItem.title}` : '没有更早的访问记录'"
      :tooltip-attrs="{
        showAfter: 1000,
      }"
      aria-label="返回上一个访问页面"
      @click="goToHistory(currentIndex - 1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </s-button>
    <s-button
      class="route-history-controls__button"
      :disabled="!nextItem"
      :content="nextItem ? `前进：${nextItem.title}` : '没有更新的访问记录'"
      :tooltip-attrs="{
        showAfter: 1000,
      }"
      aria-label="前往下一个访问页面"
      @click="goToHistory(currentIndex + 1)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </s-button>
  </nav>
</template>

<style scoped>
.route-history-controls {
  display: none;
  order: -1;
  flex: 0 0 auto;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
}

.route-history-controls__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;
}

.route-history-controls__button:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.route-history-controls__button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.route-history-controls__button:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

.route-history-controls__button svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (min-width: 768px) {
  .route-history-controls {
    display: flex;
  }
}
</style>

<style>
@media (min-width: 768px) {
  .VPNavBarSearch {
    order: -2;
  }
}
</style>
