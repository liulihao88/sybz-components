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
const DEFAULT_POSITION = {
  left: 8,
  top: 78,
}
const STORAGE_KEY = 'sybz-component-quick-sidebar-position'
const position = ref({ ...DEFAULT_POSITION })
const dragging = ref(false)
const expanded = ref(true)
const keyword = ref('')
const detailItem = ref<QuickItem | null>(null)
let dragOffsetX = 0
let dragOffsetY = 0
let detailTimer: number | undefined

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
const shouldShow = computed(() => route.path.includes('/components/'))
const currentPath = computed(() => route.path.replace(/\/$/, ''))

const isCurrent = (item: QuickItem) =>
  item.normalizedLink.replace(/\/$/, '') === currentPath.value ||
  item.routeLink.replace(/\/$/, '') === currentPath.value

const clampPosition = (left: number, top: number) => {
  if (typeof window === 'undefined') return { left, top }

  return {
    left: Math.min(Math.max(0, left), Math.max(0, window.innerWidth - 180)),
    top: Math.min(Math.max(48, top), Math.max(48, window.innerHeight - 120)),
  }
}

const savePosition = () => {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(position.value))
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

const hideDetail = () => {
  if (detailTimer !== undefined) {
    window.clearTimeout(detailTimer)
    detailTimer = undefined
  }

  detailItem.value = null
}

const showDetailLater = (item: QuickItem) => {
  hideDetail()
  detailTimer = window.setTimeout(() => {
    detailItem.value = item
  }, 3000)
}

const goTo = async (item: QuickItem) => {
  hideDetail()
  await router.go(item.routeLink)
  scrollSidebarToItem(item)
}

const toggleExpanded = () => {
  expanded.value = !expanded.value
  hideDetail()
}

const handleDragMove = (event: PointerEvent) => {
  if (!dragging.value) return
  const nextPosition = clampPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY)
  position.value = nextPosition
}

const handleDragEnd = () => {
  if (!dragging.value) return
  dragging.value = false
  savePosition()
  window.removeEventListener('pointermove', handleDragMove)
  window.removeEventListener('pointerup', handleDragEnd)
  window.removeEventListener('pointercancel', handleDragEnd)
}

const handleDragStart = (event: PointerEvent) => {
  if (event.button !== 0) return

  dragging.value = true
  dragOffsetX = event.clientX - position.value.left
  dragOffsetY = event.clientY - position.value.top
  window.addEventListener('pointermove', handleDragMove)
  window.addEventListener('pointerup', handleDragEnd)
  window.addEventListener('pointercancel', handleDragEnd)
}

onMounted(() => {
  const rawPosition = window.localStorage.getItem(STORAGE_KEY)
  if (!rawPosition) return

  try {
    const parsedPosition = JSON.parse(rawPosition)
    if (typeof parsedPosition.left !== 'number' || typeof parsedPosition.top !== 'number') return
    position.value = clampPosition(parsedPosition.left, parsedPosition.top)
  } catch {
    position.value = { ...DEFAULT_POSITION }
  }
})

onUnmounted(() => {
  handleDragEnd()
  hideDetail()
})
</script>

<template>
  <aside
    v-if="shouldShow"
    class="component-quick-sidebar"
    :class="{ dragging, collapsed: !expanded }"
    :style="{ left: `${position.left}px`, top: `${position.top}px` }"
    aria-label="组件快速跳转"
  >
    <button
      v-if="!expanded"
      class="component-quick-sidebar__collapsed-button"
      type="button"
      title="展开快捷导航"
      @click="toggleExpanded"
    >
      开
    </button>
    <div v-else class="component-quick-sidebar__body">
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
          @pointerdown.prevent="handleDragStart"
        >
          拖
        </button>
        <button
          class="component-quick-sidebar__collapse"
          type="button"
          title="收起快捷导航"
          @click="toggleExpanded"
        >
          收
        </button>
      </div>
      <section v-for="group in filteredGroups" :key="group.text" class="component-quick-sidebar__group">
        <div class="component-quick-sidebar__title">
          {{ group.text }}
        </div>
        <div class="component-quick-sidebar__grid">
          <button
            v-for="item in group.items"
            :key="item.normalizedLink"
            type="button"
            class="component-quick-sidebar__item"
            :class="{ current: isCurrent(item) }"
            @mouseenter="showDetailLater(item)"
            @mouseleave="hideDetail"
            @focus="showDetailLater(item)"
            @blur="hideDetail"
            @click="goTo(item)"
          >
            {{ item.shortText || item.text }}
          </button>
        </div>
      </section>
      <div v-if="!filteredGroups.length" class="component-quick-sidebar__empty">无匹配</div>
    </div>
    <div v-if="expanded && detailItem" class="component-quick-sidebar__detail" @mouseenter="hideDetail">
      <strong>{{ detailItem.text }}</strong>
      <span>分类: {{ detailItem.groupText }}</span>
      <span>路径: {{ detailItem.normalizedLink }}</span>
    </div>
  </aside>
</template>

<style scoped>
.component-quick-sidebar {
  position: fixed;
  z-index: 43;
  display: none;
  width: 148px;
  pointer-events: none;
}

.component-quick-sidebar.collapsed {
  width: 30px;
}

.component-quick-sidebar__collapsed-button {
  width: 30px;
  height: 28px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  pointer-events: auto;
}

.component-quick-sidebar__collapsed-button:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.component-quick-sidebar__body {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 6px 5px;
  background: var(--vp-c-bg);
  background: color-mix(in srgb, var(--vp-c-bg) 92%, transparent);
  box-shadow: 0 8px 24px rgb(0 0 0 / 8%);
  pointer-events: auto;
  user-select: none;
}

.component-quick-sidebar.dragging .component-quick-sidebar__body {
  box-shadow: 0 12px 32px rgb(0 0 0 / 14%);
}

.component-quick-sidebar__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px 24px;
  gap: 4px;
  margin-bottom: 5px;
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
}

.component-quick-sidebar__collapse:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.component-quick-sidebar__group + .component-quick-sidebar__group {
  margin-top: 5px;
  padding-top: 4px;
  border-top: 1px solid var(--vp-c-divider);
}

.component-quick-sidebar__title {
  margin-bottom: 3px;
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
  gap: 2px;
}

.component-quick-sidebar__item {
  display: block;
  width: 100%;
  min-height: 18px;
  border: 0;
  border-radius: 3px;
  padding: 1px 3px;
  color: var(--vp-c-text-2);
  background: transparent;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.component-quick-sidebar__detail {
  position: absolute;
  top: 0;
  left: calc(100% + 8px);
  display: grid;
  gap: 3px;
  width: 210px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 8px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  box-shadow: 0 10px 30px rgb(0 0 0 / 14%);
  pointer-events: none;
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
