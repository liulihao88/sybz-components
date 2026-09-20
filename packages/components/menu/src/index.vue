<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import MenuNode from './MenuNode.vue'
import SIcon from '@/components/icon'
import type { SMenuFieldNames, SMenuIcon, SMenuItem, SMenuSelfProps } from './types'

defineOptions({ name: 'SMenu', inheritAttrs: false })

const props = withDefaults(defineProps<SMenuSelfProps>(), {
  modelValue: '',
  options: () => [],
  fieldNames: () => ({}),
  router: true,
  defaultOpenAll: true,
  defaultOpeneds: () => [],
  width: 256,
  height: '100%',
  autoHeight: false,
  backgroundColor: '#1d293b',
  textColor: '#cbd5e1',
  activeTextColor: '#ffffff',
  collapse: false,
  variant: 'dark',
  theme: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [index: string]
  'update:collapse': [collapse: boolean]
  select: [...args: any[]]
  actionClick: [event: MouseEvent]
}>()
defineSlots<{ header?: () => any; footer?: () => any }>()

const attrs = useAttrs()
const iconProp = (value: SMenuIcon) => value as any
const mergedProps = useGlobalComponentConfig('menu', props)
const isCollapsed = ref(mergedProps.value.collapse)
const menuViewportRef = ref<HTMLElement>()
const menuRef = ref<any>()
const menuRowHeight = ref(0)
const menuVerticalPadding = ref(8)
const menuDensity = ref(1)
let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined
let resizeFrame = 0
const baseRowHeight = computed(() => {
  if (isCollapsed.value) return 64
  if (['shijingshan', 'sybz'].includes(mergedProps.value.theme)) return 44
  if (mergedProps.value.theme === 'chenghua') return 52
  return mergedProps.value.variant === 'light' ? 52 : 64
})

const updateMenuScale = () => {
  if (resizeFrame || !mergedProps.value.autoHeight) return
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = 0
    if (!mergedProps.value.autoHeight) return
    const viewportHeight = menuViewportRef.value?.clientHeight || 0
    const menuElement = menuRef.value?.$el as HTMLElement | undefined
    if (!menuElement) return
    const count = Array.from(
      menuElement.querySelectorAll<HTMLElement>('.el-menu-item, .el-sub-menu__title, .s-menu-node__group'),
    ).filter((item) => {
      if (!item.getClientRects().length) return false
      // 收起动画期间子节点仍有尺寸，但不应占用展开菜单的配额。
      for (let parent = item.parentElement; parent && parent !== menuElement; parent = parent.parentElement) {
        if (
          parent.classList.contains('el-sub-menu') &&
          !parent.classList.contains('is-opened') &&
          !(item.classList.contains('el-sub-menu__title') && parent === item.parentElement)
        )
          return false
      }
      return true
    }).length
    const availableHeight = Math.max(0, viewportHeight - 16)
    const rowHeight = count ? Math.min(baseRowHeight.value, availableHeight / count) : baseRowHeight.value
    // 向下取整，避免子像素累计让最后一项溢出。
    menuRowHeight.value = Math.floor(rowHeight * 64) / 64
    menuDensity.value = menuRowHeight.value / baseRowHeight.value
    menuVerticalPadding.value = Math.max(0, (viewportHeight - count * menuRowHeight.value) / 2)
  })
}
const menuListStyle = computed(() =>
  mergedProps.value.autoHeight
    ? {
        '--s-menu-fit-row': `${menuRowHeight.value}px`,
        '--s-menu-fit-padding': `${menuVerticalPadding.value}px`,
        '--s-menu-fit-font': `${(mergedProps.value.theme === 'sybz' || mergedProps.value.theme === 'shijingshan' ? 14 : 16) * menuDensity.value}px`,
        '--s-menu-fit-icon': `${20 * menuDensity.value}px`,
      }
    : undefined,
)

onMounted(() => {
  resizeObserver = new ResizeObserver(updateMenuScale)
  if (menuViewportRef.value) resizeObserver.observe(menuViewportRef.value)
  // 只监听外部可用空间；不能监听自己修改尺寸的 ul。
  mutationObserver = new MutationObserver((records) => {
    if (records.some((record) => record.type === 'childList' || record.target !== menuRef.value?.$el)) updateMenuScale()
  })
  if (menuRef.value?.$el)
    mutationObserver.observe(menuRef.value.$el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style'],
    })
  nextTick(updateMenuScale)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(resizeFrame)
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})
watch(
  () => [mergedProps.value.autoHeight, baseRowHeight.value],
  () => nextTick(updateMenuScale),
)
watch(
  () => mergedProps.value.collapse,
  (value) => {
    isCollapsed.value = value
  },
)
const fields = computed<Required<SMenuFieldNames>>(() => ({
  index: 'index',
  path: 'path',
  title: 'title',
  icon: 'icon',
  children: 'children',
  disabled: 'disabled',
  route: 'route',
  ...mergedProps.value.fieldNames,
}))
const itemIndex = (item: SMenuItem) => String(item[fields.value.index] || item[fields.value.path] || '')
const collectParentIndexes = (items: SMenuItem[], result: string[] = []) => {
  items.forEach((item) => {
    const children = item[fields.value.children] as SMenuItem[] | undefined
    if (!children?.length) return
    const index = itemIndex(item)
    if (index) result.push(index)
    collectParentIndexes(children, result)
  })
  return result
}
const openedMenus = computed(() =>
  mergedProps.value.defaultOpenAll
    ? Array.from(new Set([...collectParentIndexes(mergedProps.value.options), ...mergedProps.value.defaultOpeneds]))
    : mergedProps.value.defaultOpeneds,
)
const resolvedHeader = computed(() => mergedProps.value.header || mergedProps.value.headerConfig)
const menuColors = computed(() => {
  if (mergedProps.value.theme === 'chenghua') {
    return { background: '#ffffff', text: '#000000', activeText: '#165dff' }
  }
  if (mergedProps.value.theme === 'shijingshan') {
    return { background: '#1e293b', text: '#ffffff', activeText: '#ffffff' }
  }
  if (mergedProps.value.theme === 'sybz') {
    return { background: 'var(--s-sybz-nav-bg)', text: '#ffffff', activeText: '#ffffff' }
  }
  if (mergedProps.value.variant === 'light') {
    return { background: '#ffffff', text: '#536f8d', activeText: '#008f83' }
  }
  return {
    background: mergedProps.value.backgroundColor,
    text: mergedProps.value.textColor,
    activeText: mergedProps.value.activeTextColor,
  }
})
const rootStyle = computed(() => ({
  width: processWidth(isCollapsed.value ? 64 : mergedProps.value.width, true),
  height: processWidth(mergedProps.value.height, true),
  '--s-menu-bg': menuColors.value.background,
}))
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapse', isCollapsed.value)
}
const handleSelect = (...args: any[]) => {
  emit('update:modelValue', args[0])
  emit('select', ...args)
}
</script>

<template>
  <aside
    class="s-menu"
    :class="[
      `s-menu--${mergedProps.variant}`,
      `s-menu--theme-${mergedProps.theme}`,
      { 'is-collapse': isCollapsed, 'is-auto-height': mergedProps.autoHeight },
    ]"
    :style="rootStyle"
  >
    <button
      class="s-menu__collapse-trigger"
      type="button"
      :aria-label="isCollapsed ? '展开菜单' : '收缩菜单'"
      :title="isCollapsed ? '展开菜单' : '收缩菜单'"
      @click="toggleCollapse"
    >
      <SIcon :icon="iconProp(isCollapsed ? Expand : Fold)" />
    </button>
    <header v-if="$slots.header || resolvedHeader || mergedProps.actionConfig" class="s-menu__header">
      <slot name="header">
        <div v-if="resolvedHeader" class="s-menu__brand">
          <span v-if="resolvedHeader.icon" class="s-menu__brand-icon">
            <s-icon :icon="iconProp(resolvedHeader.icon)" />
          </span>
          <div class="s-menu__brand-content">
            <strong>{{ resolvedHeader.title }}</strong>
            <small v-if="resolvedHeader.subtitle">{{ resolvedHeader.subtitle }}</small>
          </div>
        </div>
        <button
          v-if="mergedProps.actionConfig"
          class="s-menu__action"
          type="button"
          @click="emit('actionClick', $event)"
        >
          <s-icon v-if="mergedProps.actionConfig.icon" :icon="iconProp(mergedProps.actionConfig.icon)" />
          {{ mergedProps.actionConfig.text }}
        </button>
      </slot>
    </header>
    <div ref="menuViewportRef" class="s-menu__viewport">
      <el-menu
        ref="menuRef"
        v-bind="attrs"
        class="s-menu__list"
        :style="menuListStyle"
        :default-active="mergedProps.modelValue"
        :default-openeds="openedMenus"
        :router="mergedProps.router"
        :collapse="isCollapsed"
        :background-color="menuColors.background"
        :text-color="menuColors.text"
        :active-text-color="menuColors.activeText"
        @select="handleSelect"
      >
        <MenuNode
          v-for="(item, index) in mergedProps.options"
          :key="itemIndex(item) || String(item[fields.title] || index)"
          :item="item"
          :field-names="fields"
          :collapsed="isCollapsed"
        />
      </el-menu>
    </div>
    <footer v-if="$slots.footer || mergedProps.footer" class="s-menu__footer">
      <slot name="footer">
        <div v-if="mergedProps.footer" class="s-menu__account">
          <span>{{ mergedProps.footer.avatar || mergedProps.footer.title.slice(0, 1) }}</span>
          <div>
            <strong>{{ mergedProps.footer.title }}</strong>
            <small v-if="mergedProps.footer.subtitle">{{ mergedProps.footer.subtitle }}</small>
          </div>
        </div>
      </slot>
    </footer>
  </aside>
</template>

<style scoped lang="scss">
.s-menu {
  display: flex;
  flex-direction: column;
  overflow: visible;
  box-sizing: border-box;
  background: var(--s-menu-bg);
  position: relative;
  transition: width 0.2s ease;

  &__collapse-trigger {
    position: absolute;
    z-index: 2;
    top: 50%;
    right: -12px;
    display: grid;
    width: 24px;
    height: 24px;
    padding: 0;
    transform: translateY(-50%);
    place-items: center;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    color: #334155;
    box-shadow: 0 2px 8px rgb(15 23 42 / 18%);
    cursor: pointer;
    pointer-events: auto;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  &:hover &__collapse-trigger,
  &__collapse-trigger:focus-visible {
    opacity: 1;
  }

  &.is-collapse {
    .s-menu__brand {
      justify-content: center;
      padding: 12px 8px;
    }
    .s-menu__brand-content,
    .s-menu__action,
    .s-menu__account > div {
      display: none;
    }
    :deep(.s-menu__brand-content),
    :deep(.s-menu__account > div),
    :deep(.s-menu__slot-text) {
      display: none;
    }
    .s-menu__account {
      justify-content: center;
      padding: 12px 8px;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      width: 56px;
      height: 56px;
      margin: 4px auto;
      justify-content: center;
      padding: 0;
    }

    :deep(.el-menu-item .el-icon),
    :deep(.el-sub-menu__title .el-icon) {
      margin: 0;
    }
  }

  &__header,
  &__footer {
    flex: none;
  }

  &__viewport {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: auto;
  }

  &__list {
    border-right: 0;
    transition: width 0.2s ease;
  }

  &.is-auto-height &__viewport {
    overflow: hidden;
  }

  // 菜单项应按内容自然排列，不能被外部 flex 布局拉伸分布。
  :deep(.s-menu__list.el-menu),
  :deep(.s-menu__list .el-menu) {
    display: block;
    height: auto;
    min-height: 0;
  }
  :deep(.el-menu-item),
  :deep(.el-sub-menu),
  :deep(.el-sub-menu__title) {
    flex: none;
  }

  :deep(.el-menu) {
    transition: width 0.2s ease;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 22px;
    border-bottom: 1px solid #294057;
    color: #fff;
  }
  &__brand-icon {
    display: grid;
    width: 44px;
    height: 44px;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background: #07c160;
    color: #fff;
  }
  &__brand-icon > .el-icon {
    width: 26px;
    height: 26px;
    font-size: 26px;
  }
  &__brand-content {
    min-width: 0;
  }
  &__brand strong {
    display: block;
    font-size: 22px;
  }
  &__brand small {
    display: block;
    margin-top: 4px;
    color: #8da0b8;
    font-size: 12px;
    letter-spacing: 1px;
  }
  &__action {
    display: flex;
    width: calc(100% - 32px);
    height: 54px;
    margin: 18px 16px 8px;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border: 0;
    border-radius: 10px;
    background: #216bd8;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  &__action:hover {
    background: #175ec8;
  }
  &__action > .el-icon {
    font-size: 22px;
  }
  &__account {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 18px 20px;
    border-top: 1px solid #294057;
    color: #fff;
  }
  &__account > span {
    display: grid;
    width: 42px;
    height: 42px;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background: #294057;
    font-size: 20px;
    font-weight: 700;
  }
  &__account strong,
  &__account small {
    display: block;
  }
  &__account small {
    margin-top: 4px;
    color: #8da0b8;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 56px;
    margin: 4px 8px;
    border-radius: 8px;
    font-size: 16px;
  }

  :deep(.el-menu-item.is-active) {
    background: #2f6fed;
  }
  :deep(.el-icon) {
    font-size: 20px;
  }

  &--light {
    border: 1px solid #dce5ef;

    .s-menu__brand {
      border-color: #dce5ef;
      color: #193957;
    }
    .s-menu__brand-icon {
      border: 1px solid #b9cee4;
      border-radius: 10px;
      background: #fff;
      color: #285b8d;
    }
    .s-menu__account {
      border-color: #dce5ef;
      color: #193957;
    }
    .s-menu__account > span {
      background: #e8f2ff;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 48px;
      margin: 2px 10px;
      font-size: 15px;
    }
    :deep(.el-menu-item.is-active) {
      border-left: 4px solid #16b8a6;
      background: #e8f7f5;
      color: #008f83;
    }
    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: #f1f6fb;
    }
  }

  &--theme-chenghua {
    border: 1px solid #e5e7eb;
    font-family: 'PingFang SC', sans-serif;

    .s-menu__brand {
      border-color: #e5e7eb;
      color: #000;
    }
    .s-menu__brand-icon {
      border-radius: 12px;
      background: linear-gradient(135deg, #1e6efc, #00c5e7);
    }
    .s-menu__action {
      height: 44px;
      border-radius: 8px;
      background: #165dff;
      font-size: 16px;
      font-weight: 500;
    }
    .s-menu__action:hover {
      background: #0e4ee8;
    }
    .s-menu__account {
      border-color: #e5e7eb;
      color: #000;
    }
    .s-menu__account > span {
      background: #e8f0ff;
      color: #165dff;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 44px;
      margin: 4px 8px;
      color: #000;
      font-size: 16px;
    }
    :deep(.el-menu-item.is-active) {
      background: #e8f0ff;
      color: #165dff;
      font-weight: 500;
    }
    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: #f3f7ff;
    }
  }

  &--theme-shijingshan {
    border: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    .s-menu__brand {
      min-height: 40px;
      padding: 12px;
      border-color: #334155;
      color: #fff;
    }
    .s-menu__brand-icon {
      width: 32px;
      height: 32px;
      background: #2a6df4;
    }
    .s-menu__brand strong {
      font-size: 18px;
    }
    .s-menu__action {
      height: 40px;
      margin: 12px 8px;
      border-radius: 8px;
      background: #2a6df4;
      font-size: 16px;
      font-weight: 500;
    }
    .s-menu__action:hover {
      background: #1e5fdc;
    }
    .s-menu__account {
      padding: 12px 8px;
      border-color: #334155;
      color: #fff;
    }
    .s-menu__account > span {
      width: 32px;
      height: 32px;
      background: #334155;
      font-size: 16px;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 40px;
      margin: 2px 8px;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
    }
    :deep(.el-menu-item.is-active) {
      background: #2a6df4;
      color: #fff;
      font-weight: 600;
    }
    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: #334155;
    }
  }
  &--theme-sybz {
    border: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

    .s-menu__brand {
      min-height: 40px;
      padding: 12px;
      border-color: var(--s-sybz-blue-700);
      color: #fff;
    }
    .s-menu__brand-icon {
      width: 32px;
      height: 32px;
      background: var(--s-sybz-primary);
    }
    .s-menu__brand strong {
      font-size: 18px;
    }
    .s-menu__action {
      height: 40px;
      margin: 12px 8px;
      border-radius: 8px;
      background: var(--s-sybz-primary);
      font-size: 16px;
      font-weight: 500;
    }
    .s-menu__action:hover {
      background: var(--s-sybz-primary-hover);
    }
    .s-menu__account {
      padding: 12px 8px;
      border-color: var(--s-sybz-blue-700);
      color: #fff;
    }
    .s-menu__account > span {
      width: 32px;
      height: 32px;
      background: var(--s-sybz-blue-700);
      font-size: 16px;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 40px;
      margin: 2px 8px;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
    }
    :deep(.el-menu-item.is-active) {
      background: var(--s-sybz-primary);
      color: #fff;
      font-weight: 600;
    }
    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: var(--s-sybz-blue-700);
    }
  }
}

// 覆盖主题及文档页的 ul/li 默认间距；所有高度都参与真实布局。
.s-menu.is-auto-height {
  :deep(.s-menu__list.el-menu) {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: var(--s-menu-fit-padding) 0;
    border: 0;
    transition: none;
  }
  :deep(.s-menu__list .el-menu),
  :deep(.s-menu__list .el-sub-menu) {
    margin: 0;
    padding: 0;
    border: 0;
  }
  :deep(.s-menu__list .el-menu-item),
  :deep(.s-menu__list .el-sub-menu__title),
  :deep(.s-menu__list .s-menu-node__group) {
    box-sizing: border-box;
    height: var(--s-menu-fit-row);
    min-height: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
    font-size: var(--s-menu-fit-font);
    line-height: var(--s-menu-fit-row);
    transition:
      background-color 0.2s,
      color 0.2s;
  }
  :deep(.s-menu__list .el-icon) {
    font-size: var(--s-menu-fit-icon);
  }
  :deep(.s-menu__list .s-menu-node__tag) {
    padding-top: 0;
    padding-bottom: 0;
    font-size: inherit;
    line-height: inherit;
  }
}

:global(.s-menu-detail-popper.el-popper) {
  border: 0;
  background: #243b52;
  box-shadow: 0 12px 32px rgb(15 35 55 / 24%);
}
:global(.s-menu-detail-popper.el-popper .el-popper__arrow::before) {
  border-color: #243b52;
  background: #243b52;
}
</style>
