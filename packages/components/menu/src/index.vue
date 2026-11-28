<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'
import MenuNode from './MenuNode.vue'
import SIcon from '@/components/icon'
import type { SMenuFieldNames, SMenuIcon, SMenuItem, SMenuSelfProps, SMenuSizeConfig } from './types'

defineOptions({ name: 'SMenu', inheritAttrs: false })

const SIZE_PRESETS: Record<'small' | 'default' | 'large', SMenuSizeConfig> = {
  small: { fontSize: 14, height: 40, padding: 12, levelPadding: 12, margin: 2, iconSize: 16, listPadding: 12 },
  default: {},
  large: { fontSize: 18, height: 64, padding: 24, levelPadding: 24, margin: 6, iconSize: 20, listPadding: 20 },
}

const props = withDefaults(defineProps<SMenuSelfProps>(), {
  modelValue: '',
  options: () => [],
  fieldNames: () => ({}),
  router: true,
  defaultOpenAll: true,
  defaultOpeneds: () => [],
  width: 256,
  height: '100%',
  size: 'default',
  autoHeight: false,
  backgroundColor: '#1d293b',
  textColor: '#cbd5e1',
  activeTextColor: '#ffffff',
  collapse: false,
  collapsible: true,
  expandOnHover: true,
  variant: 'dark',
  theme: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [index: string]
  'update:collapse': [collapse: boolean]
  select: [...args: any[]]
}>()
defineSlots<{ default?: () => any; header?: () => any; append?: () => any; footer?: () => any }>()

const attrs = useAttrs()
const iconProp = (value: SMenuIcon) => value as any
const mergedProps = useGlobalComponentConfig('menu', props)
const { style } = useStyleProps()
const MENU_MOTION_DURATION = 280
// 宽度动画前 160ms 已完成约 98%，此时再接文字淡入，既不会挤压也不会等太久。
const MENU_EXPAND_TEXT_DELAY = 160
// 收起宽度固定 64px；悬停临时展开时用负外边距抵消多出的宽度，布局始终按 64px 占位。
const MENU_COLLAPSED_WIDTH = 64
const isCollapsed = ref(mergedProps.value.collapsible && mergedProps.value.collapse)
// epCollapsed 控制 Element Plus 的折叠 DOM，和视觉宽度拆开，避免它自带的整段菜单替换动画。
const epCollapsed = ref(isCollapsed.value)
const isExpanding = ref(false)
// isHoverExpanded 表示鼠标移入后临时展开；isHoverFloating 表示悬浮层样式，收起动画结束后才移除。
const isHoverExpanded = ref(false)
const isHoverFloating = ref(false)
let collapseTimer: ReturnType<typeof setTimeout> | undefined
const menuViewportRef = ref<HTMLElement>()
const menuRef = ref<any>()
const menuRowHeight = ref(0)
const menuVerticalPadding = ref(isCollapsed.value ? 4 : 16)
const menuDensity = ref(1)
let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined
let resizeFrame = 0

const toCssLength = (value: string | number | undefined, fallback: string) => {
  if (value === undefined || value === null || value === '') return fallback
  return processWidth(value, true) || fallback
}
const toPaddingX = (value: string | number | undefined) => {
  if (value === undefined || value === null || value === '') return ''
  if (typeof value === 'number') return `${value}px`
  // padding 简写只取左右方向的值，上下方向由 height / lineHeight 控制。
  const parts = String(value).trim().split(/\s+/)
  return toCssLength(parts.length === 1 ? parts[0] : parts[1] || parts[0], '')
}
const toPixelNumber = (value: string | number | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (value === undefined || value === null || value === '') return fallback
  const matched = String(value)
    .trim()
    .match(/^(\d+(?:\.\d+)?)px$/)
  return matched ? Number(matched[1]) : fallback
}
const resolvedSizeConfig = computed<SMenuSizeConfig>(() => {
  const size = mergedProps.value.size
  if (typeof size === 'string') return SIZE_PRESETS[size] || SIZE_PRESETS.default
  return size || SIZE_PRESETS.default
})
// 明暗主题只影响颜色，尺寸统一使用同一套默认值。
const DEFAULT_MENU_SIZE = {
  fontSize: 16,
  height: 56,
  margin: 4,
  iconSize: 16,
  padding: 20,
  levelPadding: 20,
  listPadding: 16,
}
const resolvedMenuSize = computed(() => {
  const config = resolvedSizeConfig.value
  const defaults = DEFAULT_MENU_SIZE
  const padding = toPaddingX(config.padding) || `${defaults.padding}px`
  const height = toCssLength(config.height, `${defaults.height}px`)
  return {
    fontSize: toCssLength(config.fontSize, `${defaults.fontSize}px`),
    height,
    lineHeight: toCssLength(config.lineHeight, height),
    width: toCssLength(config.width, '100%'),
    padding,
    levelPadding: toCssLength(config.levelPadding, padding),
    margin: toCssLength(config.margin, `${defaults.margin}px`),
    iconSize: toCssLength(config.iconSize, `${defaults.iconSize}px`),
    listPadding: toCssLength(config.listPadding, `${defaults.listPadding}px`),
    pixels: {
      fontSize: toPixelNumber(config.fontSize, defaults.fontSize),
      height: toPixelNumber(config.height, defaults.height),
      margin: toPixelNumber(config.margin, defaults.margin),
      iconSize: toPixelNumber(config.iconSize, defaults.iconSize),
    },
  }
})
const menuSizeStyle = computed(() => {
  const size = resolvedMenuSize.value
  return {
    '--el-menu-item-height': size.height,
    '--el-menu-sub-item-height': size.height,
    '--el-menu-item-font-size': size.fontSize,
    '--el-menu-base-level-padding': size.padding,
    '--el-menu-level-padding': size.levelPadding,
    '--s-menu-item-line-height': size.lineHeight,
    '--s-menu-item-margin': size.margin,
    '--s-menu-item-icon-size': size.iconSize,
    '--s-menu-item-width': size.width,
    '--s-menu-list-padding': size.listPadding,
  }
})
const externalPopperStyle = computed<any>(() => attrs['popper-style'] || attrs.popperStyle)
const menuPopperStyle = computed<any>(() =>
  externalPopperStyle.value ? [menuSizeStyle.value, externalPopperStyle.value] : menuSizeStyle.value,
)
const menuPopperClass = computed(() => {
  const external = attrs['popper-class'] || attrs.popperClass
  return external ? `s-menu-popper ${String(external)}` : 's-menu-popper'
})
// Element Plus 默认 hover 300ms 才弹出一级子菜单，收起状态会明显“顿一下”。
const menuShowTimeout = computed(() => {
  const value = attrs['show-timeout'] ?? attrs.showTimeout
  return value === undefined ? 100 : Number(value)
})
const menuHideTimeout = computed(() => {
  const value = attrs['hide-timeout'] ?? attrs.hideTimeout
  return value === undefined ? 150 : Number(value)
})
const baseRowHeight = computed(() => {
  const { height, margin } = resolvedMenuSize.value.pixels
  return height + margin * 2
})
// 悬停临时展开时视觉上按展开态处理，但 isCollapsed 仍是真实的收起状态。
const menuCollapsed = computed(() => isCollapsed.value && !isHoverExpanded.value)
const expandedMenuWidth = computed(() => processWidth(mergedProps.value.width, true) || '256px')

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
    // autoHeight 只压缩菜单项；收起时四边留 4px，展开时留 16px。
    menuVerticalPadding.value = menuCollapsed.value ? 4 : 16
    const availableHeight = Math.max(0, viewportHeight - menuVerticalPadding.value * 2)
    const rowHeight = count ? Math.min(baseRowHeight.value, availableHeight / count) : baseRowHeight.value
    // 向下取整，避免子像素累计让最后一项溢出。
    menuRowHeight.value = Math.floor(rowHeight * 64) / 64
    menuDensity.value = menuRowHeight.value / baseRowHeight.value
  })
}
const menuListStyle = computed(() =>
  mergedProps.value.autoHeight
    ? {
        '--s-menu-fit-row': `${menuRowHeight.value}px`,
        '--s-menu-fit-padding': `${menuVerticalPadding.value}px`,
        '--s-menu-fit-font': `${resolvedMenuSize.value.pixels.fontSize * menuDensity.value}px`,
        '--s-menu-fit-icon': `${resolvedMenuSize.value.pixels.iconSize * menuDensity.value}px`,
      }
    : undefined,
)
// SIcon 通过 size 属性输出内联 font-size，必须显式传入才能在预设和 autoHeight 下同步缩放。
const menuIconSize = computed(() =>
  mergedProps.value.autoHeight
    ? `${resolvedMenuSize.value.pixels.iconSize * menuDensity.value}px`
    : resolvedMenuSize.value.iconSize,
)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const clearCollapseTimer = () => {
  if (!collapseTimer) return
  clearTimeout(collapseTimer)
  collapseTimer = undefined
}
/**
 * 视觉宽度立即切换，Element Plus 的折叠 DOM 延后切换：
 * 收起时先在原 DOM 上把文字收干净，再换成弹层模式；展开时先换回内联 DOM 并保持文字隐藏，
 * 等宽度展开完成后再淡入文字。这样不会出现整段菜单被替换或文字被挤压的跳变。
 */
const setCollapsed = (value: boolean) => {
  if (value === isCollapsed.value) return
  clearCollapseTimer()
  if (!value) {
    // 真正展开后不再需要悬停浮层，负外边距一起归零，布局平滑过渡回展开宽度。
    isHoverExpanded.value = false
    isHoverFloating.value = false
  }
  if (prefersReducedMotion()) {
    isCollapsed.value = value
    epCollapsed.value = value
    isExpanding.value = false
    return
  }
  if (value) {
    isExpanding.value = false
    isCollapsed.value = true
    collapseTimer = setTimeout(() => {
      epCollapsed.value = true
      collapseTimer = undefined
    }, MENU_MOTION_DURATION)
    return
  }
  epCollapsed.value = false
  isExpanding.value = true
  isCollapsed.value = false
  collapseTimer = setTimeout(() => {
    isExpanding.value = false
    collapseTimer = undefined
  }, MENU_EXPAND_TEXT_DELAY)
}
// 收起状态下移入：临时展开成完整菜单，并用负外边距抵消多出的宽度，不挤占布局。
const handleMenuEnter = () => {
  if (!mergedProps.value.expandOnHover || !mergedProps.value.collapsible || !isCollapsed.value) return
  if (isHoverExpanded.value) return
  clearCollapseTimer()
  isHoverExpanded.value = true
  isHoverFloating.value = true
  // 折叠时 Element Plus 只渲染图标，先切回内联 DOM，文字和内联子菜单才能展开。
  epCollapsed.value = false
  if (prefersReducedMotion()) {
    isExpanding.value = false
    return
  }
  isExpanding.value = true
  collapseTimer = setTimeout(() => {
    isExpanding.value = false
    collapseTimer = undefined
  }, MENU_EXPAND_TEXT_DELAY)
}
const handleMenuLeave = () => {
  if (!isHoverExpanded.value) return
  isHoverExpanded.value = false
  isExpanding.value = false
  clearCollapseTimer()
  if (prefersReducedMotion()) {
    isHoverFloating.value = false
    epCollapsed.value = true
    return
  }
  // 收窄动画结束前保留浮层样式，避免展开层瞬间掉到页面内容下面。
  collapseTimer = setTimeout(() => {
    collapseTimer = undefined
    if (isHoverExpanded.value) return
    isHoverFloating.value = false
    if (isCollapsed.value) epCollapsed.value = true
  }, MENU_MOTION_DURATION)
}

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
  clearCollapseTimer()
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})
watch([() => mergedProps.value.autoHeight, () => baseRowHeight.value], () => nextTick(updateMenuScale))
watch(menuCollapsed, () => nextTick(updateMenuScale))
watch([() => mergedProps.value.collapse, () => mergedProps.value.collapsible], ([collapse, collapsible]) => {
  setCollapsed(collapsible && collapse)
})
watch([() => mergedProps.value.expandOnHover, () => mergedProps.value.collapsible], () => {
  if (isHoverExpanded.value && (!mergedProps.value.expandOnHover || !mergedProps.value.collapsible)) handleMenuLeave()
})
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
const resolvedFooter = computed(() => mergedProps.value.footer)
const themeAccent = computed(
  () =>
    ({
      default: '#2f6fed',
      chenghua: '#165dff',
      shijingshan: '#2a6df4',
      sybz: 'var(--s-sybz-primary)',
      gulou: '#2477f3',
    })[mergedProps.value.theme] || '#2f6fed',
)
const menuColors = computed(() =>
  mergedProps.value.variant === 'light'
    ? { background: '#ffffff', text: '#334155', activeText: themeAccent.value }
    : {
        background: mergedProps.value.backgroundColor,
        text: mergedProps.value.textColor,
        activeText: mergedProps.value.activeTextColor,
      },
)
const rootStyle = computed(() => {
  const collapsed = menuCollapsed.value
  const rootStyle: Record<string, string> = {
    width: collapsed ? `${MENU_COLLAPSED_WIDTH}px` : expandedMenuWidth.value,
    height: processWidth(mergedProps.value.height, true),
    '--s-menu-bg': menuColors.value.background,
    '--s-menu-text': menuColors.value.text,
    '--s-menu-accent': themeAccent.value,
  }
  // 悬停临时展开：宽度做动画，同时用等量的负外边距抵消，布局占位始终保持收起宽度。
  if (!collapsed && isCollapsed.value)
    rootStyle.marginRight = `calc(${MENU_COLLAPSED_WIDTH}px - (${expandedMenuWidth.value}))`
  return rootStyle
})
const toggleCollapse = () => {
  if (!mergedProps.value.collapsible) return
  setCollapsed(!isCollapsed.value)
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
      {
        'is-collapse': menuCollapsed,
        'is-expanding': isExpanding,
        'is-hover-expanded': isHoverFloating,
        'is-auto-height': mergedProps.autoHeight,
      },
    ]"
    :style="[rootStyle, menuSizeStyle, style]"
    @mouseenter="handleMenuEnter"
    @mouseleave="handleMenuLeave"
  >
    <button
      v-if="mergedProps.collapsible"
      class="s-menu__collapse-trigger"
      type="button"
      :aria-label="isCollapsed ? '展开菜单' : '收缩菜单'"
      :title="isCollapsed ? '展开菜单' : '收缩菜单'"
      @click="toggleCollapse"
    >
      <SIcon :icon="iconProp(isCollapsed ? Expand : Fold)" />
    </button>
    <header v-if="$slots.header || $slots.append || resolvedHeader" class="s-menu__header">
      <slot name="header">
        <el-tooltip
          v-if="resolvedHeader"
          :disabled="!menuCollapsed || !(resolvedHeader.collapsedTooltip || resolvedHeader.title)"
          placement="right"
          :content="resolvedHeader.collapsedTooltip || resolvedHeader.title"
        >
          <div
            class="s-menu__brand"
            :class="resolvedHeader.class"
            :style="resolvedHeader.style"
            @click="resolvedHeader.handler?.($event)"
          >
            <span v-if="resolvedHeader.icon" class="s-menu__brand-icon">
              <s-icon :icon="iconProp(resolvedHeader.icon)" />
            </span>
            <div class="s-menu__brand-content">
              <strong>{{ resolvedHeader.title }}</strong>
              <small v-if="resolvedHeader.subtitle">{{ resolvedHeader.subtitle }}</small>
            </div>
          </div>
        </el-tooltip>
      </slot>
      <div v-if="$slots.append" class="s-menu__append"><slot name="append" /></div>
    </header>
    <div ref="menuViewportRef" class="s-menu__viewport">
      <el-menu
        ref="menuRef"
        v-bind="attrs"
        class="s-menu__list"
        :style="menuListStyle"
        :popper-class="menuPopperClass"
        :popper-style="menuPopperStyle"
        :default-active="mergedProps.modelValue"
        :default-openeds="openedMenus"
        :router="mergedProps.router"
        :collapse="epCollapsed"
        :collapse-transition="false"
        :show-timeout="menuShowTimeout"
        :hide-timeout="menuHideTimeout"
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
          :collapsed="menuCollapsed"
          :icon-size="menuIconSize"
        />
      </el-menu>
      <div v-if="$slots.default" class="s-menu__content">
        <slot />
      </div>
    </div>
    <footer v-if="$slots.footer || mergedProps.footer" class="s-menu__footer">
      <slot name="footer">
        <div
          v-if="resolvedFooter"
          class="s-menu__account"
          :class="resolvedFooter.class"
          :style="resolvedFooter.style"
          @click="resolvedFooter.handler?.($event)"
        >
          <span>{{ resolvedFooter.avatar || resolvedFooter.title.slice(0, 1) }}</span>
          <div>
            <strong>{{ resolvedFooter.title }}</strong>
            <small v-if="resolvedFooter.subtitle">{{ resolvedFooter.subtitle }}</small>
          </div>
        </div>
      </slot>
    </footer>
  </aside>
</template>

<style scoped lang="scss">
.s-menu {
  --s-menu-motion-duration: 280ms;
  --s-menu-motion-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --s-menu-submenu-duration: 200ms;
  --s-menu-submenu-easing: cubic-bezier(0, 0, 0.58, 1);

  display: flex;
  flex-direction: column;
  overflow: visible;
  box-sizing: border-box;
  background: var(--s-menu-bg);
  position: relative;
  transition:
    width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
    margin-right var(--s-menu-motion-duration) var(--s-menu-motion-easing);

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
    transition:
      opacity 0.15s ease,
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }
  &__collapse-trigger:hover {
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 4px 12px rgb(15 23 42 / 22%);
  }
  &:hover &__collapse-trigger,
  &__collapse-trigger:focus-visible {
    opacity: 1;
  }

  // 悬停临时展开的菜单浮在页面内容上方；收起动画结束后才移除层级和阴影。
  &.is-hover-expanded {
    z-index: 1000;
    box-shadow: 0 12px 32px rgb(15 23 42 / 24%);
  }

  &.is-collapse {
    .s-menu__list {
      padding: 4px;
    }

    .s-menu__brand {
      justify-content: center;
      align-items: center;
    }
    :deep(.s-menu__brand-content),
    :deep(.s-menu__account > div),
    :deep(.s-menu__slot-text) {
      max-width: 0;
      opacity: 0;
      transform: translateX(-6px);
      visibility: hidden;
    }
    .s-menu__account {
      justify-content: center;
      align-items: center;
    }

    .s-menu__brand-icon,
    .s-menu__account > span {
      width: 32px;
      height: 32px;
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      width: 100%;
      height: var(--el-menu-item-height);
      margin: var(--s-menu-item-margin) 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 0 0 18px;
    }

    :deep(.el-menu-item .el-icon),
    :deep(.el-sub-menu__title .el-icon) {
      margin: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    :deep(.el-sub-menu > .el-sub-menu__title) {
      position: relative;
    }
    :deep(.el-sub-menu > .el-sub-menu__title::before) {
      position: absolute;
      top: 50%;
      left: 0;
      width: 3px;
      height: 24px;
      transform: translateY(-50%);
      border-radius: 2px;
      background: color-mix(in srgb, var(--s-menu-text) 40%, transparent);
      content: '';
    }
    :deep(.el-sub-menu__title .el-sub-menu__icon-arrow) {
      display: none;
    }
    :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
      color: var(--s-menu-accent);
    }
    :deep(.el-sub-menu.is-active > .el-sub-menu__title > .s-icon) {
      color: var(--s-menu-accent);
    }
    :deep(.el-sub-menu.is-active > .el-sub-menu__title::before) {
      background: var(--s-menu-accent);
    }
  }

  // 展开过程中先保持头尾文字隐藏，等侧栏宽度到位后再和菜单文字一起淡入。
  &.is-expanding {
    :deep(.s-menu__brand-content),
    :deep(.s-menu__account > div),
    :deep(.s-menu__slot-text) {
      max-width: 0;
      opacity: 0;
      transform: translateX(-6px);
      visibility: hidden;
    }
  }

  &__header,
  &__footer {
    flex: none;
    overflow: hidden;
    padding: 16px;
  }
  &__header {
    border-bottom: 1px solid #294057;
  }
  &__append:not(:first-child) {
    margin-top: 16px;
  }
  &__footer {
    border-top: 1px solid #294057;
  }

  &__viewport {
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__content {
    box-sizing: border-box;
    padding: 0 var(--s-menu-list-padding) var(--s-menu-list-padding);
  }
  // 收起和展开过程中只显示菜单图标，自定义内容等展开完成后再出现。
  &.is-collapse &__content,
  &.is-expanding &__content {
    display: none;
  }

  &__list {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: var(--s-menu-list-padding);
    border-right: 0;
    transition:
      width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      padding var(--s-menu-motion-duration) var(--s-menu-motion-easing);
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

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    transition:
      background-color 220ms ease,
      color 220ms ease,
      padding var(--s-menu-motion-duration) var(--s-menu-motion-easing);
  }
  // 覆盖 Element Plus 折叠时对文字设置的零尺寸与隐藏状态，收起和展开期间统一做淡出/淡入。
  :deep(.s-menu__list .el-menu-item > span),
  :deep(.s-menu__list .el-sub-menu__title > span) {
    display: inline-block;
    width: auto;
    height: auto;
    max-width: 100%;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transition:
      max-width 180ms var(--s-menu-submenu-easing),
      opacity 160ms ease,
      visibility 0s;
  }
  &.is-collapse :deep(.s-menu__list .el-menu-item > span),
  &.is-collapse :deep(.s-menu__list .el-sub-menu__title > span),
  &.is-expanding :deep(.s-menu__list .el-menu-item > span),
  &.is-expanding :deep(.s-menu__list .el-sub-menu__title > span) {
    max-width: 0;
    opacity: 0;
    visibility: hidden;
    transition:
      max-width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      opacity 180ms ease,
      visibility 0s var(--s-menu-motion-duration);
  }
  &.is-collapse :deep(.s-menu__list .s-menu-node__tag),
  &.is-expanding :deep(.s-menu__list .s-menu-node__tag) {
    padding-left: 0;
    padding-right: 0;
  }
  :deep(.s-menu__list .s-menu-node__suffix) {
    max-width: 100%;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transition:
      max-width 180ms var(--s-menu-motion-easing),
      opacity 160ms ease,
      visibility 0s;
  }
  &.is-collapse :deep(.s-menu__list .s-menu-node__suffix),
  &.is-expanding :deep(.s-menu__list .s-menu-node__suffix) {
    max-width: 0;
    margin-left: 0 !important;
    opacity: 0;
    visibility: hidden;
    transition:
      max-width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      opacity 180ms ease,
      visibility 0s var(--s-menu-motion-duration);
  }

  // 内联子菜单和分组标题跟随侧栏一起淡出，避免收起过程中残留子项内容。
  // 这里必须保留 max-height / padding 的过渡，否则会覆盖 Element Plus 二级菜单的展开动画。
  :deep(.s-menu__list .el-sub-menu > .el-menu) {
    // 建立 BFC：展开第一帧不会溢出；scrollHeight 也会把子项 margin 计入，动画终点不再突然多出 8px。
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transition:
      max-height var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-top var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-bottom var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      opacity 160ms ease,
      visibility 0s;
  }
  &.is-collapse :deep(.s-menu__list .el-sub-menu > .el-menu),
  &.is-expanding :deep(.s-menu__list .el-sub-menu > .el-menu) {
    opacity: 0;
    visibility: hidden;
    transition:
      max-height var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-top var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-bottom var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      opacity 180ms ease,
      visibility 0s var(--s-menu-motion-duration);
  }
  :deep(.s-menu__list .s-menu-node__group) {
    max-height: 80px;
    overflow: hidden;
    opacity: 1;
    visibility: visible;
    transition:
      max-height var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      padding var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      opacity 160ms ease,
      visibility 0s;
  }
  &.is-collapse :deep(.s-menu__list .s-menu-node__group),
  &.is-expanding :deep(.s-menu__list .s-menu-node__group) {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0;
    visibility: hidden;
    transition:
      max-height var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      padding var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      opacity 180ms ease,
      visibility 0s var(--s-menu-motion-duration);
  }

  // Element Plus 默认用 300ms ease-in-out 展开二级菜单，起步太慢，看起来像先顿一下。
  :deep(.el-collapse-transition-enter-active),
  :deep(.el-collapse-transition-leave-active) {
    transition:
      max-height var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-top var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      padding-bottom var(--s-menu-submenu-duration) var(--s-menu-submenu-easing);
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 14px;
    color: var(--s-menu-text);
  }
  &__brand-icon {
    display: grid;
    width: 44px;
    height: 44px;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background: var(--s-menu-accent);
    color: #fff;
    transition:
      width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      height var(--s-menu-motion-duration) var(--s-menu-motion-easing);
  }
  &__brand-icon > .el-icon {
    width: 26px;
    height: 26px;
    font-size: 26px;
  }
  &__brand-content {
    min-width: 0;
  }
  :deep(.s-menu__brand-content),
  :deep(.s-menu__account > div),
  :deep(.s-menu__slot-text) {
    max-width: 100%;
    overflow: hidden;
    opacity: 1;
    white-space: nowrap;
    visibility: visible;
    transition:
      max-width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      opacity 160ms ease,
      transform var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      visibility 0s;
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
  &__account {
    display: flex;
    gap: 12px;
    align-items: center;
    color: var(--s-menu-text);
  }
  &__account > span {
    display: grid;
    width: 42px;
    height: 42px;
    flex: none;
    place-items: center;
    border-radius: 50%;
    background: color-mix(in srgb, var(--s-menu-text) 18%, transparent);
    font-size: 20px;
    font-weight: 700;
    transition:
      width var(--s-menu-motion-duration) var(--s-menu-motion-easing),
      height var(--s-menu-motion-duration) var(--s-menu-motion-easing);
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
    height: var(--el-menu-item-height);
    line-height: var(--s-menu-item-line-height);
    margin: var(--s-menu-item-margin) 0;
    width: var(--s-menu-item-width);
    border-radius: 8px;
    font-size: var(--el-menu-item-font-size);
  }

  :deep(.el-menu-item.is-active) {
    background-color: var(--s-menu-accent);
    color: #fff;
  }
  :deep(.el-icon) {
    font-size: var(--s-menu-item-icon-size);
  }
  // 箭头样式是 width: inherit，标题设置 width 后会被拉满并压到文字上，这里恢复为右侧预留的图标宽度。
  :deep(.el-sub-menu__title .el-sub-menu__icon-arrow) {
    width: var(--el-menu-icon-width, 24px);
    opacity: 1;
    transition:
      transform var(--s-menu-submenu-duration) var(--s-menu-submenu-easing),
      opacity 160ms ease;
  }
  &.is-expanding :deep(.el-sub-menu__title .el-sub-menu__icon-arrow) {
    opacity: 0;
  }

  &--light {
    // 用内阴影代替边框，避免浅色主题的 1px 边框挤小菜单项可用宽度。
    border: 0;
    box-shadow: inset 0 0 0 1px #dce5ef;

    // 悬停展开时保留内描边，并在外侧补一层浮层阴影。
    &.is-hover-expanded {
      box-shadow:
        inset 0 0 0 1px #dce5ef,
        0 12px 32px rgb(15 23 42 / 16%);
    }

    .s-menu__header,
    .s-menu__footer {
      border-color: #dce5ef;
    }
    .s-menu__brand {
      color: #193957;
    }
    .s-menu__brand-icon {
      border: 1px solid #b9cee4;
      border-radius: 10px;
      background: #fff;
      color: var(--s-menu-accent);
    }
    .s-menu__account {
      color: #193957;
    }
    .s-menu__account > span {
      background: color-mix(in srgb, var(--s-menu-accent) 10%, #fff);
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: var(--s-menu-text);
    }
    :deep(.el-menu-item::before) {
      position: absolute;
      top: 25%;
      bottom: 25%;
      left: 0;
      width: 4px;
      border-radius: 0 4px 4px 0;
      background-color: var(--s-menu-accent);
      content: '';
      transform: scaleY(0);
      transition: transform 220ms var(--s-menu-motion-easing);
    }
    :deep(.el-menu-item.is-active::before) {
      transform: scaleY(1);
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background-color: color-mix(in srgb, var(--s-menu-accent) 5%, #fff);
    }
  }

  &--dark {
    .s-menu__collapse-trigger {
      border-color: #475569;
      background: var(--s-menu-bg);
      color: #ffffff;
    }
    .s-menu__header,
    .s-menu__footer {
      border-color: #294057;
    }
    :deep(.el-menu-item.is-active) {
      background-color: var(--s-menu-accent);
      color: #fff;
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background-color: color-mix(in srgb, var(--s-menu-accent) 20%, var(--s-menu-bg));
    }
  }
  &--light {
    .s-menu__brand,
    .s-menu__account {
      color: var(--s-menu-text);
    }
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      color: var(--s-menu-text);
    }
    :deep(.el-menu-item.is-active) {
      background-color: color-mix(in srgb, var(--s-menu-accent) 10%, #fff);
      color: var(--s-menu-accent);
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background-color: color-mix(in srgb, var(--s-menu-accent) 5%, #fff);
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
    padding: var(--s-menu-fit-padding);
    border: 0;
    transition: padding var(--s-menu-motion-duration) var(--s-menu-motion-easing);
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
      background-color 220ms ease,
      color 220ms ease,
      padding var(--s-menu-motion-duration) var(--s-menu-motion-easing);
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

@media (prefers-reduced-motion: reduce) {
  .s-menu,
  .s-menu *,
  .s-menu :deep(*) {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
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

// 折叠后的子菜单弹层在 body 下，无法继承 .s-menu 上的尺寸变量，通过 popper-style 重新注入。
:global(.s-menu-popper .el-menu-item),
:global(.s-menu-popper .el-sub-menu__title) {
  height: var(--el-menu-item-height);
  line-height: var(--s-menu-item-line-height);
  margin: var(--s-menu-item-margin) 0;
  font-size: var(--el-menu-item-font-size);
}
:global(.s-menu-popper .el-icon) {
  font-size: var(--s-menu-item-icon-size);
}
</style>
