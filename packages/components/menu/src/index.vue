<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import MenuNode from './MenuNode.vue'
import SIcon from '@/components/icon'
import type { SMenuFieldNames, SMenuItem, SMenuSelfProps } from './types'

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
  backgroundColor: '#1d293b',
  textColor: '#cbd5e1',
  activeTextColor: '#ffffff',
  collapse: false,
  variant: 'dark',
  theme: 'default',
})

const emit = defineEmits<{
  'update:modelValue': [index: string]
  select: [...args: any[]]
  actionClick: [event: MouseEvent]
}>()
defineSlots<{ header?: () => any; footer?: () => any }>()

const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('menu', props)
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
  width: processWidth(mergedProps.value.width, true),
  height: processWidth(mergedProps.value.height, true),
  '--s-menu-bg': menuColors.value.background,
}))
const handleSelect = (...args: any[]) => {
  emit('update:modelValue', args[0])
  emit('select', ...args)
}
const isComponentIcon = (icon: unknown) => Boolean(icon && typeof icon !== 'string')
</script>

<template>
  <aside
    class="s-menu"
    :class="[
      `s-menu--${mergedProps.variant}`,
      `s-menu--theme-${mergedProps.theme}`,
      { 'is-collapse': mergedProps.collapse },
    ]"
    :style="rootStyle"
  >
    <header v-if="$slots.header || resolvedHeader || mergedProps.actionConfig" class="s-menu__header">
      <slot name="header">
        <div v-if="resolvedHeader" class="s-menu__brand">
          <span v-if="resolvedHeader.icon" class="s-menu__brand-icon">
            <el-icon v-if="isComponentIcon(resolvedHeader.icon)"><component :is="resolvedHeader.icon" /></el-icon>
            <SIcon v-else :icon="String(resolvedHeader.icon)" />
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
          <el-icon v-if="isComponentIcon(mergedProps.actionConfig.icon)">
            <component :is="mergedProps.actionConfig.icon" />
          </el-icon>
          <SIcon v-else-if="mergedProps.actionConfig.icon" :icon="String(mergedProps.actionConfig.icon)" />
          {{ mergedProps.actionConfig.text }}
        </button>
      </slot>
    </header>
    <el-menu
      v-bind="attrs"
      class="s-menu__list"
      :default-active="mergedProps.modelValue"
      :default-openeds="openedMenus"
      :router="mergedProps.router"
      :collapse="mergedProps.collapse"
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
      />
    </el-menu>
    <footer v-if="$slots.footer || mergedProps.footerConfig" class="s-menu__footer">
      <slot name="footer">
        <div v-if="mergedProps.footerConfig" class="s-menu__account">
          <span>{{ mergedProps.footerConfig.avatar || mergedProps.footerConfig.title.slice(0, 1) }}</span>
          <div>
            <strong>{{ mergedProps.footerConfig.title }}</strong>
            <small v-if="mergedProps.footerConfig.subtitle">{{ mergedProps.footerConfig.subtitle }}</small>
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
  overflow: hidden;
  box-sizing: border-box;
  background: var(--s-menu-bg);

  &__header,
  &__footer {
    flex: none;
  }

  &__list {
    flex: 1;
    min-height: 0;
    overflow: auto;
    border-right: 0;
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
