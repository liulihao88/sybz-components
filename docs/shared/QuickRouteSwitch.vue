<script setup lang="ts">
import { Search, Switch, Close, LocationFilled } from '@element-plus/icons-vue'
import { computed, nextTick, ref, watch } from 'vue'
import { useData, useRoute, useRouter } from 'vitepress'

type SidebarItem = {
  text?: string
  link?: string
  items?: SidebarItem[]
}

type RouteItem = {
  text: string
  link: string
  normalizedLink: string
  routeLink: string
}

type RouteGroup = {
  text: string
  items: RouteItem[]
}

const { theme, site } = useData()
const route = useRoute()
const router = useRouter()
const visible = ref(false)
const keyword = ref('')
const activeIndex = ref(0)
const searchInputRef = ref<HTMLInputElement>()

const cleanText = (text = '') =>
  text
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeLink = (link: string) => {
  const [path, hash = ''] = link.split('#')
  let normalizedPath = path
    .replace(/\/index\.md$/, '/')
    .replace(/\.md$/, '')
    .replace(/\/home$/, '/home')

  if (!site.value.cleanUrls && !normalizedPath.endsWith('/') && !normalizedPath.endsWith('.html')) {
    normalizedPath += '.html'
  }

  return hash ? `${normalizedPath}#${hash}` : normalizedPath
}

const withBase = (link: string) => {
  const base = site.value.base.replace(/\/$/, '')
  const normalizedLink = link.startsWith('/') ? link : `/${link}`
  return `${base}${normalizedLink}`
}

const flattenItems = (items: SidebarItem[] = []): RouteItem[] =>
  items.flatMap((item) => {
    const children = item.items ? flattenItems(item.items) : []

    if (!item.link || !item.text) return children

    const normalizedLink = normalizeLink(item.link)

    return [
      {
        text: cleanText(item.text),
        link: item.link,
        normalizedLink,
        routeLink: withBase(normalizedLink),
      },
      ...children,
    ]
  })

const routeGroups = computed<RouteGroup[]>(() => {
  const sidebar = theme.value.sidebar
  const componentSidebar = Array.isArray(sidebar) ? sidebar : sidebar?.['/components'] || []

  return componentSidebar
    .map((group: SidebarItem) => ({
      text: cleanText(group.text),
      items: flattenItems(group.items || []),
    }))
    .filter((group: RouteGroup) => group.text && group.items.length)
})

const flatRouteItems = computed(() => routeGroups.value.flatMap((group) => group.items))

const filteredGroups = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  const groups = routeGroups.value

  if (!query) return groups

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        `${group.text} ${item.text} ${item.normalizedLink}`.toLowerCase().includes(query),
      ),
    }))
    .filter((group) => group.items.length)
})

const flatFilteredItems = computed(() => filteredGroups.value.flatMap((group) => group.items))
const totalRouteCount = computed(() => flatRouteItems.value.length)
const selectedRouteIndex = computed(() => {
  const item = flatFilteredItems.value[activeIndex.value]
  return item ? getRouteIndex(item) : 0
})

const currentPath = computed(() => route.path.replace(/\/$/, ''))

const isCurrent = (item: RouteItem) =>
  item.normalizedLink.replace(/\/$/, '') === currentPath.value ||
  item.routeLink.replace(/\/$/, '') === currentPath.value

const getRouteIndex = (item: RouteItem) =>
  flatRouteItems.value.findIndex((routeItem) => routeItem.normalizedLink === item.normalizedLink) + 1

const waitForFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

const navigateTo = async (href: string) => {
  try {
    await router.go(href)
  } catch {
    window.location.assign(href)
  }
}

const scrollActiveSidebarItem = async () => {
  await nextTick()
  await waitForFrame()
  await waitForFrame()

  const sidebar = document.querySelector<HTMLElement>('.VPSidebar')
  const activeItem = sidebar?.querySelector<HTMLElement>('.VPSidebarItem.is-active')
  if (!sidebar || !activeItem) return

  const sidebarRect = sidebar.getBoundingClientRect()
  const activeRect = activeItem.getBoundingClientRect()
  const activeOffsetTop = activeRect.top - sidebarRect.top + sidebar.scrollTop
  const targetTop = activeOffsetTop - sidebar.clientHeight / 2 + activeItem.clientHeight / 2

  sidebar.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth',
  })
}

const openDialog = () => {
  keyword.value = ''
  visible.value = true
}

const closeDialog = () => {
  visible.value = false
}

const goTo = async (item: RouteItem) => {
  closeDialog()
  await navigateTo(item.routeLink)
  scrollActiveSidebarItem().catch(() => undefined)
}

const chooseActive = () => {
  const item = flatFilteredItems.value[activeIndex.value]
  if (item) goTo(item)
}

const moveActive = (offset: number) => {
  const total = flatFilteredItems.value.length
  if (!total) return
  activeIndex.value = (activeIndex.value + offset + total) % total
}

watch(visible, async (isVisible) => {
  if (!isVisible) return
  activeIndex.value = Math.max(0, flatFilteredItems.value.findIndex(isCurrent))
  await nextTick()
  searchInputRef.value?.focus()
})

watch(keyword, () => {
  activeIndex.value = 0
})
</script>

<template>
  <div class="quick-route-switch">
    <button class="quick-route-switch__trigger" type="button" title="快速切换路由" @click="openDialog">
      <el-icon><Switch /></el-icon>
      <span>快速跳转</span>
    </button>

    <Teleport to="body">
      <Transition name="quick-route-switch-fade">
        <div v-if="visible" class="quick-route-switch__overlay" @click.self="closeDialog">
          <section class="quick-route-switch__dialog" role="dialog" aria-modal="true" aria-label="快速切换路由">
            <header class="quick-route-switch__header">
              <div>
                <h2>快速跳转</h2>
                <p>{{ selectedRouteIndex }} / {{ totalRouteCount }} 个页面</p>
              </div>
              <button class="quick-route-switch__icon-button" type="button" title="关闭" @click="closeDialog">
                <el-icon><Close /></el-icon>
              </button>
            </header>

            <div class="quick-route-switch__search">
              <el-icon><Search /></el-icon>
              <input
                ref="searchInputRef"
                v-model="keyword"
                type="search"
                placeholder="搜索组件名或分类"
                @keydown.esc.prevent="closeDialog"
                @keydown.enter.prevent="chooseActive"
                @keydown.down.prevent="moveActive(1)"
                @keydown.up.prevent="moveActive(-1)"
              />
            </div>

            <div class="quick-route-switch__content">
              <template v-if="filteredGroups.length">
                <section v-for="group in filteredGroups" :key="group.text" class="quick-route-switch__group">
                  <h3>{{ group.text }}</h3>
                  <div class="quick-route-switch__grid">
                    <el-tooltip
                      v-for="item in group.items"
                      :key="item.normalizedLink"
                      effect="dark"
                      placement="top"
                      :show-after="500"
                      :hide-after="0"
                      :teleported="false"
                      popper-class="quick-route-switch-tooltip"
                    >
                      <template #content>
                        <div class="quick-route-switch__tooltip">
                          <strong>{{ item.text }}</strong>
                          <span>序号：{{ getRouteIndex(item) }} / {{ totalRouteCount }}</span>
                          <span>分类：{{ group.text }}</span>
                          <span>原始地址：{{ item.link }}</span>
                          <span>路由地址：{{ item.normalizedLink }}</span>
                          <span>跳转地址：{{ item.routeLink }}</span>
                          <span>当前路径：{{ currentPath || '/' }}</span>
                          <span>状态：{{ isCurrent(item) ? '当前页面' : '可跳转' }}</span>
                        </div>
                      </template>
                      <button
                        type="button"
                        class="quick-route-switch__item"
                        :class="{
                          current: isCurrent(item),
                          active: flatFilteredItems[activeIndex]?.normalizedLink === item.normalizedLink,
                        }"
                        @click="goTo(item)"
                      >
                        <span class="quick-route-switch__item-title">
                          <el-icon v-if="isCurrent(item)"><LocationFilled /></el-icon>
                          {{ item.text }}
                        </span>
                      </button>
                    </el-tooltip>
                  </div>
                </section>
              </template>
              <div v-else class="quick-route-switch__empty">没有匹配的路由</div>
            </div>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.quick-route-switch {
  display: none;
  align-items: center;
  margin-right: 12px;
}

@media (min-width: 960px) {
  .quick-route-switch {
    display: flex;
  }
}

.quick-route-switch__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0 10px;
  height: 34px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-size: 13px;
  line-height: 1;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}

.quick-route-switch__trigger:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quick-route-switch__trigger .el-icon {
  font-size: 15px;
}

.quick-route-switch__overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 44px 16px 16px;
  background: rgb(16 24 40 / 0.52);
  backdrop-filter: blur(4px);
}

.quick-route-switch__dialog {
  display: flex;
  flex-direction: column;
  width: min(1260px, 100%);
  max-height: calc(100vh - 58px);
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 24px 80px rgb(0 0 0 / 0.28);
}

.quick-route-switch__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px 6px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.quick-route-switch__header h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 800;
  line-height: 1.2;
}

.quick-route-switch__header p {
  margin: 2px 0 0;
  color: var(--vp-c-text-3);
  font-size: 10px;
}

.quick-route-switch__icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s;
}

.quick-route-switch__icon-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quick-route-switch__search {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 0 8px;
  height: 30px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-3);
}

.quick-route-switch__search:focus-within {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.quick-route-switch__search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  color: var(--vp-c-text-1);
  background: transparent;
  font-size: 11px;
}

.quick-route-switch__content {
  overflow: auto;
  padding: 0 12px 10px;
}

.quick-route-switch__group + .quick-route-switch__group {
  margin-top: 5px;
}

.quick-route-switch__group h3 {
  position: sticky;
  top: 0;
  z-index: 1;
  margin: 0 0 3px;
  padding: 4px 0 2px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  font-size: 11px;
  font-weight: 800;
}

.quick-route-switch__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 3px;
}

.quick-route-switch__item {
  display: flex;
  justify-content: center;
  min-width: 0;
  min-height: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 3px 5px;
  text-align: left;
  background: var(--vp-c-bg-soft);
  transition:
    border-color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.quick-route-switch__item:hover,
.quick-route-switch__item.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: inset 2px 0 0 var(--vp-c-brand-1);
}

.quick-route-switch__item:hover {
  color: var(--vp-c-brand-1);
}

.quick-route-switch__item.active {
  border-color: #1f2937;
  background: #1f2937;
  box-shadow: none;
}

.quick-route-switch__item.current {
  border-color: var(--vp-c-brand-1);
}

.quick-route-switch__item-title {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  max-width: 100%;
  color: var(--vp-c-text-1);
  font-size: 10px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quick-route-switch__item.active .quick-route-switch__item-title {
  color: #fff;
}

.quick-route-switch__item.active .quick-route-switch__item-title .el-icon {
  color: #fff;
}

.quick-route-switch__item-title .el-icon {
  flex: 0 0 auto;
  color: var(--vp-c-brand-1);
}

.quick-route-switch__tooltip {
  display: grid;
  gap: 4px;
  min-width: 280px;
  max-width: min(560px, 72vw);
  color: #f9fafb;
  font-size: 12px;
  line-height: 1.45;
  word-break: break-all;
}

.quick-route-switch__tooltip strong {
  margin-bottom: 2px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.35;
  word-break: break-word;
}

.quick-route-switch__tooltip span {
  color: #d1d5db;
}

:global(.quick-route-switch-tooltip) {
  max-width: min(600px, 76vw);
}

.quick-route-switch__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-3);
}

.quick-route-switch-fade-enter-active,
.quick-route-switch-fade-leave-active {
  transition: opacity 0.18s ease;
}

.quick-route-switch-fade-enter-from,
.quick-route-switch-fade-leave-to {
  opacity: 0;
}
</style>
