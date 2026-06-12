<template>
  <s-tooltip v-if="mergedProps.content" :content="mergedProps.content" v-bind="mergedProps.tooltipAttrs">
    <el-button v-bind="buttonAttrs" :class="['s-button-content', buttonClass]" @click="handleClick">
      <template v-for="(arg, name, index) in $slots" v-slot:[name]>
        <slot :name="name" v-bind="arg" :index="index" />
      </template>
    </el-button>
  </s-tooltip>
  <el-button v-bind="buttonAttrs" :class="buttonClass" @click="handleClick" v-else>
    <template v-for="(arg, name, index) in $slots" v-slot:[name]>
      <slot :name="name" v-bind="arg" :index="index" />
    </template>
  </el-button>
</template>

<script setup lang="tsx">
import { computed, ref, useAttrs } from 'vue'
import { processWidth, toLine } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SButton',
  inheritAttrs: false,
})

interface SButtonSelfProps {
  time?: number
  content?: string
  tooltipAttrs?: Record<string, any>
  theme?: '' | 'chenghua'
  variant?: '' | 'outline' | 'gradient'
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<SButtonSelfProps>(), {
  time: 0,
  content: '',
  tooltipAttrs: () => ({}),
  theme: '',
  variant: '',
  width: '',
  height: '',
})

const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('sButton', props)

// 抛出事件
const emits = defineEmits(['click'])

const lastClickTime = ref<number | null>(null)

const loading = ref(false)

const normalizeIcon = (icon: unknown) => {
  if (typeof icon !== 'string' || !icon || icon.startsWith('el-icon-')) return icon
  return `el-icon-${toLine(icon)}`
}

const buttonAttrs = computed(() => {
  const normalizedAttrs = { ...attrs }
  const buttonHeight = processWidth(mergedProps.value.height, true)

  if ('icon' in normalizedAttrs) {
    normalizedAttrs.icon = normalizeIcon(normalizedAttrs.icon)
  }

  if ('loadingIcon' in normalizedAttrs) {
    normalizedAttrs.loadingIcon = normalizeIcon(normalizedAttrs.loadingIcon)
  }

  if ('loading-icon' in normalizedAttrs) {
    normalizedAttrs['loading-icon'] = normalizeIcon(normalizedAttrs['loading-icon'])
  }

  return {
    loading: loading.value,
    ...normalizedAttrs,
    style: [
      {
        ...processWidth(mergedProps.value.width),
        height: buttonHeight,
        minHeight: buttonHeight,
      },
      normalizedAttrs.style,
    ],
  }
})

const buttonClass = computed(() => ({
  's-button--chenghua': mergedProps.value.theme === 'chenghua',
  's-button--chenghua-outline': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'outline',
  's-button--chenghua-gradient': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'gradient',
}))

const handleClick = () => {
  if (mergedProps.value.time === 0) {
    emits('click')
    return
  }

  const now = Date.now()
  if (lastClickTime.value === null || now - lastClickTime.value >= mergedProps.value.time) {
    loading.value = true
    emits('click')
    lastClickTime.value = now

    setTimeout(() => {
      loading.value = false
    }, mergedProps.value.time)
  }
}
</script>

<style lang="scss" scoped>
.s-button--chenghua {
  --ch-button-primary: #165dff;
  --ch-button-primary-hover: #1e6efc;
  --ch-button-primary-active: #0f4fd6;
  --ch-button-accent-start: #1e6efc;
  --ch-button-accent-end: #00c5e7;
  --ch-button-text-secondary: #979797;
  --el-button-font-weight: 500;
  --el-button-border-radius: 8px;

  border-radius: 8px;
  font-family: 'PingFang SC', sans-serif;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:not(.el-button--primary):not(.el-button--success):not(.el-button--warning):not(.el-button--danger):not(
      .el-button--info
    ):not(.is-link):not(.is-text) {
    --el-button-bg-color: #ffffff;
    --el-button-border-color: rgba(22, 93, 255, 0.45);
    --el-button-text-color: var(--ch-button-primary);
    --el-button-hover-bg-color: rgba(22, 93, 255, 0.06);
    --el-button-hover-border-color: var(--ch-button-primary);
    --el-button-hover-text-color: var(--ch-button-primary-hover);
    --el-button-active-bg-color: rgba(22, 93, 255, 0.1);
    --el-button-active-border-color: var(--ch-button-primary-active);
    --el-button-active-text-color: var(--ch-button-primary-active);
    --el-button-disabled-bg-color: #ffffff;
    --el-button-disabled-border-color: rgba(151, 151, 151, 0.35);
    --el-button-disabled-text-color: var(--ch-button-text-secondary);
  }

  &.el-button--primary {
    --ch-button-type-color: var(--ch-button-primary);
    --ch-button-type-hover: var(--ch-button-primary-hover);
    --ch-button-type-active: var(--ch-button-primary-active);
    --ch-button-type-disabled: rgba(22, 93, 255, 0.45);
    --ch-button-type-disabled-border: rgba(22, 93, 255, 0.12);
  }

  &.el-button--success {
    --ch-button-type-color: var(--el-color-success);
    --ch-button-type-hover: var(--el-color-success-light-3);
    --ch-button-type-active: var(--el-color-success-dark-2);
    --ch-button-type-disabled: var(--el-color-success-light-5);
    --ch-button-type-disabled-border: var(--el-color-success-light-7);
  }

  &.el-button--warning {
    --ch-button-type-color: var(--el-color-warning);
    --ch-button-type-hover: var(--el-color-warning-light-3);
    --ch-button-type-active: var(--el-color-warning-dark-2);
    --ch-button-type-disabled: var(--el-color-warning-light-5);
    --ch-button-type-disabled-border: var(--el-color-warning-light-7);
  }

  &.el-button--danger {
    --ch-button-type-color: var(--el-color-danger);
    --ch-button-type-hover: var(--el-color-danger-light-3);
    --ch-button-type-active: var(--el-color-danger-dark-2);
    --ch-button-type-disabled: var(--el-color-danger-light-5);
    --ch-button-type-disabled-border: var(--el-color-danger-light-7);
  }

  &.el-button--info {
    --ch-button-type-color: var(--el-color-info);
    --ch-button-type-hover: var(--el-color-info-light-3);
    --ch-button-type-active: var(--el-color-info-dark-2);
    --ch-button-type-disabled: var(--el-color-info-light-5);
    --ch-button-type-disabled-border: var(--el-color-info-light-7);
  }

  &.el-button--primary,
  &.el-button--success,
  &.el-button--warning,
  &.el-button--danger,
  &.el-button--info {
    --el-button-bg-color: var(--ch-button-type-color);
    --el-button-border-color: var(--ch-button-type-color);
    --el-button-text-color: #ffffff;
    --el-button-hover-bg-color: var(--ch-button-type-hover);
    --el-button-hover-border-color: var(--ch-button-type-hover);
    --el-button-hover-text-color: #ffffff;
    --el-button-active-bg-color: var(--ch-button-type-active);
    --el-button-active-border-color: var(--ch-button-type-active);
    --el-button-active-text-color: #ffffff;
    --el-button-disabled-bg-color: var(--ch-button-type-disabled);
    --el-button-disabled-border-color: var(--ch-button-type-disabled-border);
    --el-button-disabled-text-color: #ffffff;
  }

  &.is-link,
  &.is-text {
    --el-button-text-color: var(--ch-button-primary);
    --el-button-hover-text-color: var(--ch-button-primary-hover);
    --el-button-active-text-color: var(--ch-button-primary-active);
    --el-button-disabled-text-color: var(--ch-button-text-secondary);

    min-height: auto;
    padding: 0 8px;
    border-radius: 0;
    font-size: 14px;
  }

  :deep(.el-icon + span),
  :deep(span + .el-icon) {
    margin-left: 8px;
  }

  &.s-button--chenghua-outline {
    --el-button-bg-color: #ffffff;
    --el-button-border-color: var(--ch-button-primary);
    --el-button-text-color: var(--ch-button-primary);
    --el-button-hover-bg-color: rgba(22, 93, 255, 0.06);
    --el-button-hover-border-color: var(--ch-button-primary-hover);
    --el-button-hover-text-color: var(--ch-button-primary-hover);
    --el-button-active-bg-color: rgba(22, 93, 255, 0.1);
    --el-button-active-border-color: var(--ch-button-primary-active);
    --el-button-active-text-color: var(--ch-button-primary-active);
    --el-button-disabled-bg-color: #ffffff;
    --el-button-disabled-border-color: rgba(151, 151, 151, 0.35);
    --el-button-disabled-text-color: var(--ch-button-text-secondary);
  }

  &.s-button--chenghua-gradient {
    --el-button-bg-color: transparent;
    --el-button-border-color: transparent;
    --el-button-text-color: #ffffff;
    --el-button-hover-bg-color: transparent;
    --el-button-hover-border-color: transparent;
    --el-button-hover-text-color: #ffffff;
    --el-button-active-bg-color: transparent;
    --el-button-active-border-color: transparent;
    --el-button-active-text-color: #ffffff;
    --el-button-disabled-bg-color: transparent;
    --el-button-disabled-border-color: transparent;
    --el-button-disabled-text-color: rgba(255, 255, 255, 0.8);

    border-color: transparent;
    background: linear-gradient(90deg, var(--ch-button-accent-start) 0%, var(--ch-button-accent-end) 100%);
    color: #ffffff;
    box-shadow: 0 8px 18px rgba(22, 93, 255, 0.18);

    &:hover,
    &:focus {
      border-color: transparent;
      background: linear-gradient(90deg, #165dff 0%, #00b8df 100%);
      color: #ffffff;
      box-shadow: 0 10px 22px rgba(22, 93, 255, 0.22);
    }

    &:active {
      border-color: transparent;
      background: linear-gradient(90deg, #0f4fd6 0%, #00a4c9 100%);
      color: #ffffff;
      box-shadow: 0 6px 14px rgba(22, 93, 255, 0.18);
    }

    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus,
    &.is-disabled:active {
      border-color: transparent;
      background: linear-gradient(90deg, rgba(30, 110, 252, 0.45) 0%, rgba(0, 197, 231, 0.45) 100%);
      color: rgba(255, 255, 255, 0.8);
      box-shadow: none;
    }
  }
}
</style>
