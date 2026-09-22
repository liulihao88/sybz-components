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
  collapsible: true,
  variant: 'dark',
  theme: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [index: string]
  'update:collapse': [collapse: boolean]
  select: [...args: any[]]
  actionClick: [event: MouseEvent]
}>()
defineSlots<{ header?: () => any; append?: () => any; footer?: () => any }>()

const attrs = useAttrs()
const iconProp = (value: SMenuIcon) => value as any
const mergedProps = useGlobalComponentConfig('menu', props)
const isCollapsed = ref(mergedProps.value.collapsible && mergedProps.value.collapse)
const menuViewportRef = ref<HTMLElement>()
const menuRef = ref<any>()
const menuRowHeight = ref(0)
const menuVerticalPadding = ref(isCollapsed.value ? 4 : 16)
const menuDensity = ref(1)
let resizeObserver: ResizeObserver | undefined
let mutationObserver: MutationObserver | undefined
let resizeFrame = 0
const baseRowHeight = computed(() => {
  if (isCollapsed.value) return 64
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
    // autoHeight 只压缩菜单项；收起时四边留 4px，展开时留 16px。
    menuVerticalPadding.value = isCollapsed.value ? 4 : 16
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
        '--s-menu-fit-font': `${16 * menuDensity.value}px`,
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
watch([() => mergedProps.value.autoHeight, () => baseRowHeight.value], () => nextTick(updateMenuScale))
watch([() => mergedProps.value.collapse, () => mergedProps.value.collapsible], ([collapse, collapsible]) => {
  isCollapsed.value = collapsible && collapse
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
const rootStyle = computed(() => ({
  width: processWidth(isCollapsed.value ? 64 : mergedProps.value.width, true),
  height: processWidth(mergedProps.value.height, true),
  '--s-menu-bg': menuColors.value.background,
  '--s-menu-text': menuColors.value.text,
  '--s-menu-accent': themeAccent.value,
}))
const toggleCollapse = () => {
  if (!mergedProps.value.collapsible) return
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
      { 'is-collapse': isCollapsed, 'is-auto-height': mergedProps.autoHeight },
    ]"
    :style="rootStyle"
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
    <header v-if="$slots.header || $slots.append || resolvedHeader || mergedProps.actionConfig" class="s-menu__header">
      <slot name="header">
        <el-tooltip
          v-if="resolvedHeader"
          :disabled="!isCollapsed || !(resolvedHeader.collapsedTooltip || resolvedHeader.title)"
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
      <div v-if="$slots.append" class="s-menu__append"><slot name="append" /></div>
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
    .s-menu__list {
      padding: 4px;
    }

    .s-menu__brand {
      justify-content: center;
      align-items: center;
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
      height: 56px;
      margin: 4px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
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

  &__header,
  &__footer {
    flex: none;
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
    min-height: 0;
    overflow: auto;
  }

  &__list {
    box-sizing: border-box;
    margin: 0;
    padding: 16px;
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
    width: 100%;
    height: 54px;
    margin: 16px 0 0;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border: 0;
    border-radius: 10px;
    background: var(--s-menu-accent);
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
  &__action:hover {
    background: var(--s-menu-accent);
  }
  &__action > .el-icon {
    font-size: 22px;
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
    margin: 4px 0;
    border-radius: 8px;
    font-size: 16px;
  }

  :deep(.el-menu-item.is-active) {
    background: var(--s-menu-accent);
    color: #fff;
  }
  :deep(.el-icon) {
    font-size: 20px;
  }

  &--light {
    border: 1px solid #dce5ef;

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
      height: 48px;
      margin: 2px 0;
      font-size: 15px;
    }
    :deep(.el-menu-item.is-active) {
      border-left: 4px solid var(--s-menu-accent);
      background: color-mix(in srgb, var(--s-menu-accent) 10%, #fff);
      color: var(--s-menu-accent);
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background: color-mix(in srgb, var(--s-menu-accent) 5%, #fff);
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
      background: var(--s-menu-accent);
      color: #fff;
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background: color-mix(in srgb, var(--s-menu-accent) 20%, var(--s-menu-bg));
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
      background: color-mix(in srgb, var(--s-menu-accent) 10%, #fff);
      color: var(--s-menu-accent);
    }
    :deep(.el-menu-item:not(.is-active):hover),
    :deep(.el-sub-menu__title:hover) {
      background: color-mix(in srgb, var(--s-menu-accent) 5%, #fff);
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
