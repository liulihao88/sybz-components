<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'

type SidebarItem = {
  text?: string
  link?: string
  items?: SidebarItem[]
}

type QuickItem = {
  text: string
  shortText: string
  groupText: string
  link: string
  routeLink: string
  normalizedLink: string
}

type QuickGroup = {
  text: string
  items: QuickItem[]
}

const { theme, site } = useData()
const route = useRoute()
const router = useRouter()
const SIDEBAR_WIDTH = 148
const COLLAPSED_WIDTH = 30
const MIN_VISIBLE_HEIGHT = 28
const DEFAULT_POSITION = {
  left: 8,
  top: 78,
}
const STORAGE_KEY = 'sybz-component-quick-sidebar-position'
const EXPANDED_STORAGE_KEY = 'sybz-component-quick-sidebar-expanded'
const position = ref({ ...DEFAULT_POSITION })
const dragging = ref(false)
const expanded = ref(true)
const keyword = ref('')
let dragOffsetX = 0
let dragOffsetY = 0
let dragStartX = 0
let dragStartY = 0
let dragMoved = false
let suppressNextClick = false

type BrowserStorageName = 'localStorage' | 'sessionStorage'

const getStorageItem = (storageName: BrowserStorageName, key: string) => {
  if (typeof window === 'undefined') return null

  try {
    return window[storageName].getItem(key)
  } catch {
    return null
  }
}

const setStorageItem = (storageName: BrowserStorageName, key: string, value: string) => {
  if (typeof window === 'undefined') return

  try {
    window[storageName].setItem(key, value)
  } catch {
    // Storage can be blocked by browser privacy settings; UI state should still update.
  }
}

const cleanText = (text = '') =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeLink = (link: string) => {
  const [path, hash = ''] = link.split('#')
  const normalizedPath = path
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
    .replace(/\/home$/, '/home')

  return hash ? `${normalizedPath}#${hash}` : normalizedPath
}

const withBase = (link: string) => {
  const base = site.value.base.replace(/\/$/, '')
  const normalizedLink = link.startsWith('/') ? link : `/${link}`

  return `${base}${normalizedLink}`
}

const getShortText = (text: string) =>
  text
    .replace(/utils 方法总览（A-Z）/g, 'utils')
    .replace(/Basic基础组件/g, 'Basic')
    .replace(/Complex复杂组件/g, 'Complex')
    .replace(/\s*组件\s*/g, '')
    .replace(/\s*函数\s*/g, '')
    .replace(/\s*方法\s*/g, '')
    .replace(/\s*布局\s*/g, '')
    .replace(/\s*基础\s*/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const flattenItems = (items: SidebarItem[] = [], groupText = ''): QuickItem[] =>
  items.flatMap((item) => {
    const children = flattenItems(item.items || [], groupText)

    if (!item.link || !item.text) return children

    const text = cleanText(item.text)
    const normalizedLink = normalizeLink(item.link)

    return [
      {
        text,
        shortText: getShortText(text),
        groupText,
        link: item.link,
        normalizedLink,
        routeLink: withBase(normalizedLink),
      },
      ...children,
    ]
  })

const groups = computed<QuickGroup[]>(() => {
  const sidebar = theme.value.sidebar
  const componentSidebar = Array.isArray(sidebar) ? sidebar : sidebar?.['/components'] || []

  return componentSidebar
    .map((group: SidebarItem) => {
      const text = cleanText(group.text)

      return {
        text,
        items: flattenItems(group.items || [], text),
      }
    })
    .filter((group: QuickGroup) => group.text && group.items.length)
})

const filteredGroups = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  if (!query) return groups.value

  return groups.value
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${group.text} ${item.text} ${item.shortText} ${item.link}`.toLowerCase().includes(query),
      ),
    }))
    .filter((group) => group.items.length)
})
const flatItems = computed(() => groups.value.flatMap((group) => group.items))
const shouldShow = computed(() => route.path.includes('/components/'))
const currentPath = computed(() => route.path.replace(/\/$/, ''))
const getSidebarWidth = (isExpanded = expanded.value) => (isExpanded ? SIDEBAR_WIDTH : COLLAPSED_WIDTH)
const currentSidebarWidth = computed(() => getSidebarWidth(expanded.value))
const sidebarStyle = computed(() => ({
  left: `${position.value.left}px`,
  top: `${position.value.top}px`,
  width: `${currentSidebarWidth.value}px`,
  minWidth: `${currentSidebarWidth.value}px`,
  maxWidth: `${currentSidebarWidth.value}px`,
  '--component-quick-sidebar-top': `${position.value.top}px`,
}))

const isCurrent = (item: QuickItem) =>
  item.normalizedLink.replace(/\/$/, '') === currentPath.value ||
  item.routeLink.replace(/\/$/, '') === currentPath.value

const getItemIndex = (item: QuickItem) =>
  flatItems.value.findIndex((routeItem) => routeItem.normalizedLink === item.normalizedLink) + 1

const clampPosition = (left: number, top: number, isExpanded = expanded.value) => {
  if (typeof window === 'undefined') return { left, top }
  const sidebarWidth = getSidebarWidth(isExpanded)
  const safeLeft = Number.isFinite(left) ? left : DEFAULT_POSITION.left
  const safeTop = Number.isFinite(top) ? top : DEFAULT_POSITION.top

  return {
    left: Math.min(Math.max(0, safeLeft), Math.max(0, window.innerWidth - sidebarWidth)),
    top: Math.min(Math.max(0, safeTop), Math.max(0, window.innerHeight - MIN_VISIBLE_HEIGHT)),
  }
}

const savePosition = () => {
  setStorageItem('localStorage', STORAGE_KEY, JSON.stringify(position.value))
}

const saveExpandedState = () => {
  setStorageItem('sessionStorage', EXPANDED_STORAGE_KEY, expanded.value ? 'expanded' : 'collapsed')
}

const syncPosition = () => {
  position.value = clampPosition(position.value.left, position.value.top)
  savePosition()
}

const getRoutePath = (item: QuickItem) => {
  try {
    return new URL(item.routeLink, window.location.origin).pathname.replace(/\/$/, '')
  } catch {
    return item.normalizedLink.replace(/\/$/, '')
  }
}

const scrollSidebarToItem = async (item: QuickItem) => {
  await nextTick()
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

  const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
  if (!sidebar) return

  const targetPath = getRoutePath(item)
  const links = Array.from(sidebar.querySelectorAll<HTMLAnchorElement>('a[href]'))
  const target = links.find((link) => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '')
    return linkPath === targetPath
  })

  if (!target) return

  const sidebarRect = sidebar.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const targetOffsetTop = targetRect.top - sidebarRect.top + sidebar.scrollTop

  sidebar.scrollTo({
    top: Math.max(0, targetOffsetTop - sidebar.clientHeight / 2 + target.clientHeight / 2),
    behavior: 'smooth',
  })
}

const setExpandedState = (nextExpanded: boolean) => {
  if (expanded.value === nextExpanded) return

  const currentRight = position.value.left + getSidebarWidth(expanded.value)

  expanded.value = nextExpanded
  position.value = clampPosition(currentRight - getSidebarWidth(nextExpanded), position.value.top, nextExpanded)
  savePosition()
  saveExpandedState()
}

const goTo = async (item: QuickItem) => {
  if (suppressNextClick) {
    suppressNextClick = false
    return
  }

  await router.go(item.routeLink)
  scrollSidebarToItem(item)
}

const toggleExpanded = () => {
  suppressNextClick = false
  setExpandedState(!expanded.value)
}

const collapseSidebar = () => {
  suppressNextClick = false
  setExpandedState(false)
}

const handleDragMove = (event: PointerEvent) => {
  if (!dragging.value) return

  if (Math.abs(event.clientX - dragStartX) > 3 || Math.abs(event.clientY - dragStartY) > 3) {
    dragMoved = true
  }

  const nextPosition = clampPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY)
  position.value = nextPosition
}

const handleDragEnd = () => {
  if (!dragging.value) return
  const shouldSuppressClick = dragMoved

  dragging.value = false
  savePosition()
  window.removeEventListener('pointermove', handleDragMove)
  window.removeEventListener('pointerup', handleDragEnd)
  window.removeEventListener('pointercancel', handleDragEnd)

  if (shouldSuppressClick) {
    suppressNextClick = true
    window.setTimeout(() => {
      suppressNextClick = false
    }, 100)
  }
}

const handleDragStart = (event: PointerEvent) => {
  if (event.button !== 0) return

  dragging.value = true
  dragStartX = event.clientX
  dragStartY = event.clientY
  dragMoved = false
  dragOffsetX = event.clientX - position.value.left
  dragOffsetY = event.clientY - position.value.top
  window.addEventListener('pointermove', handleDragMove)
  window.addEventListener('pointerup', handleDragEnd)
  window.addEventListener('pointercancel', handleDragEnd)
}

const handlePanelDragStart = (event: PointerEvent) => {
  const target = event.target as HTMLElement | null
  if (
    target?.closest(
      'button, input, textarea, select, [contenteditable="true"], .s-tooltip-box__text',
    )
  ) {
    return
  }

  handleDragStart(event)
}

onMounted(() => {
  const rawExpanded = getStorageItem('sessionStorage', EXPANDED_STORAGE_KEY)
  const rawPosition = getStorageItem('localStorage', STORAGE_KEY)

  if (rawExpanded === 'expanded' || rawExpanded === 'collapsed') {
    expanded.value = rawExpanded === 'expanded'
  }

  if (rawPosition) {
    try {
      const parsedPosition = JSON.parse(rawPosition)
      if (typeof parsedPosition.left === 'number' && typeof parsedPosition.top === 'number') {
        position.value = clampPosition(parsedPosition.left, parsedPosition.top)
      }
    } catch {
      position.value = { ...DEFAULT_POSITION }
    }
  }

  window.addEventListener('resize', syncPosition)
})

onUnmounted(() => {
  handleDragEnd()
  window.removeEventListener('resize', syncPosition)
})
</script>

<template>
  <aside
    v-if="shouldShow"
    class="component-quick-sidebar"
    :class="{ dragging, 'is-expanded': expanded, 'is-collapsed': !expanded }"
    :style="sidebarStyle"
    aria-label="组件快速跳转"
    :aria-expanded="expanded"
    :data-state="expanded ? 'expanded' : 'collapsed'"
  >
    <button
      v-if="!expanded"
      key="collapsed"
      class="component-quick-sidebar__collapsed-button"
      type="button"
      title="展开快捷导航"
      @pointerdown.stop
      @click.stop="toggleExpanded"
    >
      开
    </button>
    <div v-else key="expanded" class="component-quick-sidebar__body" @pointerdown="handlePanelDragStart">
      <div class="component-quick-sidebar__top">
        <input
          v-model="keyword"
          class="component-quick-sidebar__search"
          type="search"
          placeholder="搜索"
          aria-label="搜索组件"
        />
        <button
          class="component-quick-sidebar__handle"
          type="button"
          title="拖动快捷导航"
          @pointerdown.prevent.stop="handleDragStart"
        >
          拖
        </button>
        <button
          class="component-quick-sidebar__collapse"
          type="button"
          title="收起快捷导航"
          @pointerdown.stop
          @click.stop="collapseSidebar"
        >
          收
        </button>
      </div>
      <div class="component-quick-sidebar__content">
        <section v-for="group in filteredGroups" :key="group.text" class="component-quick-sidebar__group">
          <div class="component-quick-sidebar__title">
            {{ group.text }}
          </div>
          <div class="component-quick-sidebar__grid">
            <s-tooltip
              v-for="item in group.items"
              :key="item.normalizedLink"
              :show-after="2000"
              :hide-after="400"
              placement="bottom-start"
              effect="light"
              :enterable="true"
              :offset="4"
              popper-class="component-quick-sidebar-popper"
            >
              <button
                type="button"
                class="component-quick-sidebar__item"
                :class="{ current: isCurrent(item) }"
                @click="goTo(item)"
              >
                {{ item.shortText || item.text }}
              </button>
              <template #content>
                <div class="component-quick-sidebar__detail" @pointerdown.stop @click.stop>
                  <strong>{{ item.text }}</strong>
                  <span>序号: {{ getItemIndex(item) }} / {{ flatItems.length }}</span>
                  <span>分类: {{ item.groupText }}</span>
                  <span v-if="item.shortText !== item.text">简写: {{ item.shortText }}</span>
                  <span>原始地址: {{ item.link }}</span>
                  <span>路由地址: {{ item.normalizedLink }}</span>
                  <span>跳转地址: {{ item.routeLink }}</span>
                  <span>当前路径: {{ currentPath || '/' }}</span>
                  <span>状态: {{ isCurrent(item) ? '当前页面' : '可跳转' }}</span>
                </div>
              </template>
            </s-tooltip>
          </div>
        </section>
        <div v-if="!filteredGroups.length" class="component-quick-sidebar__empty">无匹配</div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.component-quick-sidebar {
  position: fixed;
  z-index: 43;
  display: none;
  width: 148px;
  box-sizing: border-box;
  pointer-events: none;
  touch-action: none;
}

.component-quick-sidebar *,
.component-quick-sidebar *::before,
.component-quick-sidebar *::after {
  box-sizing: border-box;
}

.component-quick-sidebar.is-collapsed,
.component-quick-sidebar[data-state='collapsed'],
.component-quick-sidebar[aria-expanded='false'] {
  width: 30px;
  height: 28px;
  overflow: hidden;
}

.component-quick-sidebar.is-collapsed .component-quick-sidebar__body,
.component-quick-sidebar[data-state='collapsed'] .component-quick-sidebar__body,
.component-quick-sidebar[aria-expanded='false'] .component-quick-sidebar__body {
  display: none !important;
}

.component-quick-sidebar__collapsed-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 28px;
  border: 1px solid color-mix(in srgb, #fff 42%, var(--vp-c-brand-1));
  border-radius: 6px;
  margin: 0;
  padding: 0;
  color: #fff;
  background: var(--vp-c-brand-1);
  box-shadow:
    0 8px 24px rgb(0 0 0 / 18%),
    0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
  appearance: none;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  text-align: center;
  pointer-events: auto;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.component-quick-sidebar__collapsed-button:hover {
  border-color: #fff;
  color: #fff;
  background: var(--vp-c-brand-2);
  box-shadow:
    0 10px 28px rgb(0 0 0 / 22%),
    0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 24%, transparent);
  transform: translateY(-1px);
}

:global(html.dark) .component-quick-sidebar__collapsed-button {
  border-color: color-mix(in srgb, #fff 72%, var(--vp-c-brand-1));
  box-shadow:
    0 10px 30px rgb(0 0 0 / 46%),
    0 0 0 3px color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent),
    0 0 18px color-mix(in srgb, var(--vp-c-brand-1) 52%, transparent);
}

:global(html.dark) .component-quick-sidebar__collapsed-button:hover {
  box-shadow:
    0 12px 34px rgb(0 0 0 / 52%),
    0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 52%, transparent),
    0 0 24px color-mix(in srgb, var(--vp-c-brand-1) 64%, transparent);
}

.component-quick-sidebar__body {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - var(--component-quick-sidebar-top) - 8px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 5px 4px;
  background: var(--vp-c-bg);
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  pointer-events: auto;
  user-select: none;
  cursor: grab;
  overflow: hidden;
}

.component-quick-sidebar.dragging .component-quick-sidebar__body {
  box-shadow: 0 12px 32px rgb(0 0 0 / 14%);
  cursor: grabbing;
}

.component-quick-sidebar__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px 24px;
  gap: 4px;
  flex: 0 0 auto;
  margin-bottom: 4px;
  cursor: default;
}

.component-quick-sidebar__search {
  min-width: 0;
  height: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0 5px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  font-size: 10px;
  font-weight: 700;
  line-height: 20px;
  outline: none;
  cursor: text;
}

.component-quick-sidebar__search:focus {
  border-color: var(--vp-c-brand-1);
}

.component-quick-sidebar__handle {
  display: block;
  width: 100%;
  height: 20px;
  border: 0;
  border-radius: 4px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  cursor: grab;
  font-size: 10px;
  font-weight: 800;
  line-height: 20px;
  touch-action: none;
}

.component-quick-sidebar.dragging .component-quick-sidebar__handle {
  cursor: grabbing;
}

.component-quick-sidebar__collapse {
  display: block;
  width: 100%;
  height: 20px;
  border: 0;
  border-radius: 4px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  font-size: 10px;
  font-weight: 800;
  line-height: 20px;
  cursor: pointer;
}

.component-quick-sidebar__collapse:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.component-quick-sidebar__content {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.component-quick-sidebar__content::-webkit-scrollbar {
  width: 5px;
}

.component-quick-sidebar__content::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.component-quick-sidebar__group + .component-quick-sidebar__group {
  margin-top: 3px;
  padding-top: 3px;
  border-top: 1px solid var(--vp-c-divider);
}

.component-quick-sidebar__title {
  margin-bottom: 2px;
  color: var(--vp-c-text-1);
  font-size: 10px;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.component-quick-sidebar__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px 2px;
}

.component-quick-sidebar__grid :deep(.s-tooltip-box__text) {
  display: block;
  width: 100%;
  max-width: none !important;
  overflow: visible;
  white-space: normal;
}

.component-quick-sidebar__item {
  display: block;
  width: 100%;
  min-height: 16px;
  border: 0;
  border-radius: 3px;
  padding: 0 3px;
  color: var(--vp-c-text-2);
  background: transparent;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.component-quick-sidebar__item:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.component-quick-sidebar__item.current {
  color: #fff;
  background: var(--vp-c-brand-1);
}

.component-quick-sidebar__empty {
  padding: 6px 0;
  color: var(--vp-c-text-3);
  font-size: 10px;
  font-weight: 800;
  text-align: center;
}

:global(.component-quick-sidebar-popper) {
  max-width: min(340px, calc(100vw - 24px));
  padding: 0;
  pointer-events: auto;
  user-select: text;
}

:global(.component-quick-sidebar-popper *) {
  user-select: text;
}

.component-quick-sidebar__detail {
  display: grid;
  gap: 4px;
  min-width: 0;
  max-width: min(320px, calc(100vw - 32px));
  max-height: min(320px, calc(100vh - 24px));
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  box-shadow: 0 10px 30px rgb(0 0 0 / 14%);
  user-select: text;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.component-quick-sidebar__detail::-webkit-scrollbar {
  width: 5px;
}

.component-quick-sidebar__detail::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: var(--vp-c-divider);
}

.component-quick-sidebar__detail strong {
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 900;
  line-height: 1.25;
}

.component-quick-sidebar__detail span {
  font-size: 11px;
  line-height: 1.35;
  word-break: break-all;
}

@media (min-width: 960px) {
  .component-quick-sidebar {
    display: block;
  }
}

</style>
