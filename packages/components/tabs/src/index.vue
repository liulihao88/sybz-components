<template>
  <div class="s-tabs-box" :class="boxClass">
    <el-tabs v-bind="forwardedAttrs" v-model="tabsValue">
      <slot>
        <template v-for="tab in props.options" :key="tab[props.value]">
          <el-tab-pane :name="tab[props.value]" :label="tab[props.label]" v-bind="subAttrs">
            <template #label>
              <span class="s-tabs__label" @mouseenter="handleMouseEnter(tab[props.value])">
                <slot :name="tab[props.value] + '-label'">
                  <span class="s-tabs__label-text">{{ tab[props.label] }}</span>
                </slot>
              </span>
            </template>
            <slot :name="tab[props.value]"></slot>
          </el-tab-pane>
        </template>
      </slot>
    </el-tabs>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useAttrs, watch, type PropType } from 'vue'
import type { TabsPropsPublic } from 'element-plus'

defineOptions({
  name: 'STabs',
  inheritAttrs: false,
})

type TabsType = '' | 'capsule' | TabsPropsPublic['type']
type TabsTheme = '' | 'chenghua'

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
    default: '',
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default',
  },
})
const emits = defineEmits(['update:modelValue'])
const slideDirection = ref<'left' | 'right' | ''>('')
let slideDirectionTimer: ReturnType<typeof setTimeout> | undefined

const isCapsuleType = computed(() => props.type === 'capsule')
const isChenghuaTheme = computed(() => props.theme === 'chenghua')

const forwardedAttrs = computed(() => {
  const nextAttrs = { ...attrs } as Record<string, unknown>

  delete nextAttrs.type
  delete nextAttrs.theme

  if (!isCapsuleType.value && props.type) {
    nextAttrs.type = props.type
  }

  return nextAttrs
})

const tabsValue = computed({
  get() {
    return props.modelValue || props.options[0]?.[props.value]
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const boxClass = computed(() => [
  {
    's-tabs-box--capsule': isCapsuleType.value,
    's-tabs-box--chenghua': isChenghuaTheme.value,
    's-tabs-box--capsule-slide-left': isCapsuleType.value && slideDirection.value === 'left',
    's-tabs-box--capsule-slide-right': isCapsuleType.value && slideDirection.value === 'right',
  },
  `s-tabs-box--size-${props.size || 'default'}`,
])

// 鼠标悬停时切换标签页
const handleMouseEnter = (tabVal: string) => {
  if (props.trigger === 'hover') {
    emits('update:modelValue', tabVal)
  }
}

watch(
  () => tabsValue.value,
  (value, oldValue) => {
    if (!isCapsuleType.value || oldValue === undefined || value === oldValue) {
      return
    }

    const values = props.options.map((item) => item[props.value])
    const currentIndex = values.findIndex((item) => item === value)
    const oldIndex = values.findIndex((item) => item === oldValue)

    if (currentIndex === -1 || oldIndex === -1 || currentIndex === oldIndex) {
      return
    }

    slideDirection.value = currentIndex > oldIndex ? 'right' : 'left'

    if (slideDirectionTimer) {
      clearTimeout(slideDirectionTimer)
    }

    slideDirectionTimer = setTimeout(() => {
      slideDirection.value = ''
    }, 320)
  },
)

onBeforeUnmount(() => {
  if (slideDirectionTimer) {
    clearTimeout(slideDirectionTimer)
  }
})
</script>
<style lang="scss" scoped>
.s-tabs-box {
  --s-tabs-item-height: 40px;
  --s-tabs-item-padding-x: 20px;
  --s-tabs-font-size: 16px;
  --s-tabs-icon-size: 18px;
  --s-tabs-label-gap: 6px;

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
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;

  --s-tabs-capsule-bg: #f3f5fb;
  --s-tabs-capsule-border-color: rgba(16, 24, 40, 0.08);
  --s-tabs-capsule-active-bg: var(--el-color-primary);
  --s-tabs-capsule-active-color: #ffffff;
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
    align-items: stretch;
    justify-content: flex-start;
    min-height: calc(
      var(--s-tabs-capsule-height) + (var(--s-tabs-capsule-outer-gap) * 2) + (var(--s-tabs-capsule-border-width) * 2)
    );
    width: auto;
    max-width: 100%;
    margin: 0 0 16px;
  }

  :deep(.el-tabs__nav-wrap) {
    box-sizing: border-box;
    flex: none;
    display: inline-flex;
    align-items: stretch;
    width: auto;
    max-width: 100%;
    margin-bottom: 0;
    padding: var(--s-tabs-capsule-outer-gap);
    border: var(--s-tabs-capsule-border-width) solid var(--s-tabs-capsule-border-color);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.28)), var(--s-tabs-capsule-bg);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.78),
      0 8px 24px rgba(17, 24, 39, 0.08);
  }

  :deep(.el-tabs__nav-wrap::after),
  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__nav-scroll) {
    display: inline-flex;
    width: auto;
    max-width: 100%;
  }

  :deep(.el-tabs__nav) {
    position: relative;
    display: inline-flex;
    float: none;
    align-items: stretch;
    gap: var(--s-tabs-capsule-item-gap);
    width: auto;
    border: 0;
  }

  :deep(.el-tabs__item) {
    position: relative;
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
      background-color 0.22s ease,
      box-shadow 0.22s ease,
      color 0.2s,
      transform 0.2s;
  }

  :deep(.el-tabs__item:hover) {
    color: var(--s-tabs-capsule-active-bg);
  }

  :deep(.el-tabs__item.is-active) {
    background: var(--s-tabs-capsule-active-bg);
    box-shadow:
      0 10px 20px var(--s-tabs-capsule-active-shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.16);
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

.s-tabs-box--capsule-slide-left {
  :deep(.el-tabs__item.is-active) {
    animation: s-tabs-capsule-slide-left 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

.s-tabs-box--capsule-slide-right {
  :deep(.el-tabs__item.is-active) {
    animation: s-tabs-capsule-slide-right 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

@keyframes s-tabs-capsule-slide-left {
  0% {
    opacity: 0.9;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes s-tabs-capsule-slide-right {
  0% {
    opacity: 0.9;
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
