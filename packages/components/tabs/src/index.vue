<template>
  <div class="s-tabs-box" :class="boxClass" :style="boxStyle">
    <el-tabs v-bind="forwardedAttrs" v-model="tabsValue">
      <slot>
        <template v-for="tab in mergedProps.options" :key="tab[mergedProps.value]">
          <el-tab-pane :name="tab[mergedProps.value]" :label="tab[mergedProps.label]" v-bind="mergedProps.subAttrs">
            <template #label>
              <span class="s-tabs__label" @mouseenter="handleMouseEnter(tab[mergedProps.value])">
                <slot :name="tab[mergedProps.value] + '-label'">
                  <span class="s-tabs__label-text">{{ tab[mergedProps.label] }}</span>
                </slot>
              </span>
            </template>
            <slot :name="tab[mergedProps.value]"></slot>
          </el-tab-pane>
        </template>
      </slot>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { computed, useAttrs, type PropType } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { TabsPropsPublic } from 'element-plus'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'STabs',
  inheritAttrs: false,
})

type TabsType = '' | 'capsule' | TabsPropsPublic['type']
type TabsTheme = 'default' | 'chenghua' | 'shijingshan'

const attrs = useAttrs()
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: '',
  },
  options: {
    type: Array as PropType<Record<string, any>[]>,
    default: () => [],
  },
  label: {
    type: String,
    default: 'label',
  },
  value: {
    type: String,
    default: 'value',
  },
  subAttrs: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  type: {
    type: String as PropType<TabsType>,
    default: '',
  },
  theme: {
    type: String as PropType<TabsTheme>,
    default: 'default',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  headerMargin: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
})
const emits = defineEmits(['update:modelValue'])
const mergedProps = useGlobalComponentConfig('tabs', props)

const isCapsuleType = computed(() => mergedProps.value.type === 'capsule')
const isChenghuaTheme = computed(() => mergedProps.value.theme === 'chenghua')
const isShijingshanTheme = computed(() => mergedProps.value.theme === 'shijingshan')
const hasActiveTab = computed(
  () =>
    mergedProps.value.modelValue !== '' &&
    mergedProps.value.modelValue !== undefined &&
    mergedProps.value.modelValue !== null,
)

const forwardedAttrs = computed(() => {
  const nextAttrs = { ...attrs } as Record<string, unknown>

  delete nextAttrs.type
  delete nextAttrs.theme

  if (!isCapsuleType.value && mergedProps.value.type) {
    nextAttrs.type = mergedProps.value.type
  }

  return nextAttrs
})

const tabsValue = computed({
  get() {
    return mergedProps.value.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const boxClass = computed(() => [
  {
    's-tabs-box--capsule': isCapsuleType.value,
    's-tabs-box--no-active': isCapsuleType.value && !hasActiveTab.value,
    's-tabs-box--has-width': Boolean(mergedProps.value.width),
    's-tabs-box--custom-header-margin': mergedProps.value.headerMargin !== undefined,
    's-tabs-box--chenghua': isChenghuaTheme.value,
    's-tabs-box--shijingshan': isShijingshanTheme.value,
  },
  `s-tabs-box--size-${mergedProps.value.size || 'default'}`,
])
const boxStyle = computed(() => ({
  ...(mergedProps.value.width ? { width: processWidth(mergedProps.value.width, true) } : {}),
  ...(mergedProps.value.headerMargin !== undefined
    ? {
        '--s-tabs-header-margin':
          typeof mergedProps.value.headerMargin === 'number'
            ? processWidth(mergedProps.value.headerMargin, true)
            : mergedProps.value.headerMargin,
      }
    : {}),
}))

// 鼠标悬停时切换标签页
const handleMouseEnter = (tabVal: string) => {
  if (mergedProps.value.trigger === 'hover') {
    emits('update:modelValue', tabVal)
  }
}
</script>
<style lang="scss" scoped>
.s-tabs-box {
  --s-tabs-item-height: 40px;
  --s-tabs-item-padding-x: 20px;
  --s-tabs-font-size: 16px;
  --s-tabs-icon-size: 18px;
  --s-tabs-label-gap: 6px;

  &.s-tabs-box--custom-header-margin :deep(.el-tabs__header) {
    margin: var(--s-tabs-header-margin);
  }

  &.s-tabs-box--size-small {
    --s-tabs-item-height: 32px;
    --s-tabs-item-padding-x: 12px;
    --s-tabs-font-size: 14px;
    --s-tabs-icon-size: 16px;
    --s-tabs-label-gap: 4px;
  }

  &.s-tabs-box--size-large {
    --s-tabs-item-height: 48px;
    --s-tabs-item-padding-x: 24px;
    --s-tabs-font-size: 18px;
    --s-tabs-icon-size: 22px;
    --s-tabs-label-gap: 8px;
  }

  :deep(.el-tabs__item) {
    height: var(--s-tabs-item-height);
    padding: 0 var(--s-tabs-item-padding-x);
    font-size: var(--s-tabs-font-size);
    line-height: var(--s-tabs-item-height);
  }

  :deep(.el-tabs__nav-wrap:after) {
    height: 1px;
  }

  :deep(.s-tabs__label) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--s-tabs-label-gap);
    max-width: 100%;
  }

  :deep(.s-tabs__label .el-icon) {
    flex: 0 0 auto;
    font-size: var(--s-tabs-icon-size);
  }

  :deep(.s-tabs__label-text) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.s-tabs-box--capsule {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: auto;
  max-width: 100%;

  --s-tabs-capsule-bg: #f3f5fb;
  --s-tabs-capsule-border-color: rgba(16, 24, 40, 0.08);
  --s-tabs-capsule-active-bg: color-mix(in srgb, var(--el-color-primary) 11%, #ffffff);
  --s-tabs-capsule-active-border-color: color-mix(in srgb, var(--el-color-primary) 32%, transparent);
  --s-tabs-capsule-active-color: var(--el-color-primary);
  --s-tabs-capsule-hover-bg: rgba(16, 24, 40, 0.055);
  --s-tabs-capsule-hover-color: var(--el-color-primary);
  --s-tabs-capsule-color: #1f2937;
  --s-tabs-capsule-muted-color: #7b8190;
  --s-tabs-capsule-active-shadow: rgba(64, 158, 255, 0.22);
  --s-tabs-capsule-height: 48px;
  --s-tabs-capsule-padding-x: 20px;
  --s-tabs-capsule-font-size: 16px;
  --s-tabs-capsule-icon-size: 22px;
  --s-tabs-capsule-label-gap: 8px;
  --s-tabs-capsule-item-gap: 4px;
  --s-tabs-capsule-outer-gap: 4px;
  --s-tabs-capsule-border-width: 1px;

  &.s-tabs-box--size-small {
    --s-tabs-capsule-height: 40px;
    --s-tabs-capsule-padding-x: 14px;
    --s-tabs-capsule-font-size: 14px;
    --s-tabs-capsule-icon-size: 18px;
    --s-tabs-capsule-label-gap: 6px;
    --s-tabs-capsule-item-gap: 2px;
  }

  &.s-tabs-box--size-large {
    --s-tabs-capsule-height: 56px;
    --s-tabs-capsule-padding-x: 24px;
    --s-tabs-capsule-font-size: 18px;
    --s-tabs-capsule-icon-size: 24px;
    --s-tabs-capsule-label-gap: 10px;
    --s-tabs-capsule-item-gap: 4px;
  }

  :deep(.el-tabs) {
    display: inline-flex;
    flex-direction: column;
    width: auto;
    max-width: 100%;
  }

  :deep(.el-tabs__header) {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    height: calc(
      var(--s-tabs-capsule-height) + (var(--s-tabs-capsule-outer-gap) * 2) + (var(--s-tabs-capsule-border-width) * 2)
    );
    width: auto;
    max-width: 100%;
  }

  :deep(.el-tabs__nav-wrap) {
    box-sizing: border-box;
    flex: none;
    display: inline-flex;
    align-items: center;
    height: 100%;
    width: auto;
    max-width: 100%;
    margin-bottom: 0;
    padding: var(--s-tabs-capsule-outer-gap);
    border: var(--s-tabs-capsule-border-width) solid var(--s-tabs-capsule-border-color);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.28)), var(--s-tabs-capsule-bg);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.78),
      0 4px 18px rgba(17, 24, 39, 0.08);
  }

  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

  :deep(.el-tabs__active-bar) {
    z-index: 2;
    bottom: 0;
    display: block;
    height: var(--s-tabs-capsule-height) !important;
    border-radius: 999px;
    background: transparent !important;
    transition:
      width 0.42s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: width, transform;
  }

  :deep(.el-tabs__active-bar::before) {
    position: absolute;
    inset: 0 calc(var(--s-tabs-capsule-padding-x) * -1);
    box-sizing: border-box;
    border: 1px solid var(--s-tabs-capsule-active-border-color);
    border-radius: inherit;
    background: var(--s-tabs-capsule-active-bg);
    box-shadow:
      0 4px 14px var(--s-tabs-capsule-active-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
    content: '';
  }

  &.s-tabs-box--no-active :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__nav-scroll) {
    display: block;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  :deep(.el-tabs__nav) {
    position: relative;
    display: inline-flex;
    float: none;
    align-items: center;
    gap: var(--s-tabs-capsule-item-gap);
    width: max-content;
    border: 0;
  }

  &.s-tabs-box--has-width {
    :deep(.el-tabs),
    :deep(.el-tabs__header),
    :deep(.el-tabs__nav-wrap),
    :deep(.el-tabs__nav-scroll) {
      width: 100%;
    }
  }

  :deep(.el-tabs__nav-prev),
  :deep(.el-tabs__nav-next) {
    z-index: 5;
    top: 50%;
    width: 24px;
    height: 28px;
    border: 0;
    border-radius: 50%;
    color: var(--s-tabs-capsule-active-color);
    background: transparent;
    line-height: 28px;
    transform: translateY(-50%);
    transition:
      color 0.2s ease,
      background-color 0.2s ease,
      transform 0.24s ease;
  }

  :deep(.el-tabs__nav-prev) {
    left: 6px;
  }
  :deep(.el-tabs__nav-next) {
    right: 6px;
  }

  :deep(.el-tabs__nav-prev:hover),
  :deep(.el-tabs__nav-next:hover) {
    color: var(--s-tabs-capsule-active-color);
    background: var(--s-tabs-capsule-hover-bg);
    transform: translateY(-50%);
  }

  :deep(.el-tabs__nav-prev.is-disabled),
  :deep(.el-tabs__nav-next.is-disabled) {
    opacity: 0;
    pointer-events: none;
  }

  :deep(.el-tabs__nav-wrap.is-scrollable) {
    padding-left: 32px;
    padding-right: 32px;
  }

  :deep(.el-tabs__item) {
    position: relative;
    z-index: 3;
    min-width: 0;
    height: var(--s-tabs-capsule-height);
    padding: 0 var(--s-tabs-capsule-padding-x) !important;
    border: 0;
    border-radius: 999px;
    color: var(--s-tabs-capsule-color);
    font-size: var(--s-tabs-capsule-font-size);
    font-weight: 700;
    line-height: var(--s-tabs-capsule-height);
    transition:
      background-color 0.2s,
      color 0.2s,
      box-shadow 0.2s,
      transform 0.2s;
  }

  :deep(.el-tabs__item:not(.is-active):hover) {
    background: var(--s-tabs-capsule-hover-bg);
    box-shadow: inset 0 0 0 1px rgba(16, 24, 40, 0.035);
    color: var(--s-tabs-capsule-hover-color);
    transform: translateY(-1px);
  }

  :deep(.el-tabs__item.is-active) {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    color: var(--s-tabs-capsule-active-color);
  }

  :deep(.el-tabs__item.is-active .s-tabs__label) {
    color: inherit;
  }

  :deep(.s-tabs__label) {
    gap: var(--s-tabs-capsule-label-gap);
    height: 100%;
    color: inherit;
    letter-spacing: 0;
  }

  :deep(.s-tabs__label .el-icon) {
    flex: 0 0 auto;
    font-size: var(--s-tabs-capsule-icon-size);
  }
}
</style>
