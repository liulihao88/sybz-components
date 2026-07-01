<template>
  <div ref="tabsBoxRef" class="s-tabs-box" :class="boxClass">
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
import { computed, ref, useAttrs } from 'vue'

defineOptions({
  name: 'STabs',
  inheritAttrs: false,
})
interface TabsProps {
  modelValue: string | number | boolean
  options?: Record<string, any>[]
  label?: string
  value?: string
  subAttrs?: Record<string, any>
  trigger?: 'click' | 'hover'
  size?: 'small' | 'default' | 'large'
}

const attrs = useAttrs()
const props = withDefaults(defineProps<TabsProps>(), {
  options: () => [],
  label: 'label',
  value: 'value',
  subAttrs: () => ({}),
  trigger: 'click', // 默认为点击触发，可选值为 'click' 或 'hover'
  size: 'default',
})
const emits = defineEmits(['update:modelValue'])
const tabsBoxRef = ref<HTMLElement>()

const isCapsuleType = computed(() => attrs.type === 'capsule')

const forwardedAttrs = computed(() => {
  const nextAttrs = { ...attrs } as Record<string, unknown>

  if (isCapsuleType.value) {
    delete nextAttrs.type
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
  },
  `s-tabs-box--size-${props.size || 'default'}`,
])

// 鼠标悬停时切换标签页
const handleMouseEnter = (tabVal: string) => {
  if (props.trigger === 'hover') {
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
      background-color 0.24s ease,
      box-shadow 0.24s ease,
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
    animation: s-tabs-capsule-label-pop 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
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

@keyframes s-tabs-capsule-label-pop {
  0% {
    transform: translateY(1px);
  }

  60% {
    transform: translateY(-1px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
