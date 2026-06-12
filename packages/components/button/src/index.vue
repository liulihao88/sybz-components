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
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<SButtonSelfProps>(), {
  time: 0,
  content: '',
  tooltipAttrs: () => ({}),
  theme: '',
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
        height: processWidth(mergedProps.value.height, true),
      },
      normalizedAttrs.style,
    ],
  }
})

const buttonClass = computed(() => ({
  's-button--chenghua': mergedProps.value.theme === 'chenghua',
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
  --ch-button-text-secondary: #979797;
  --el-button-font-weight: 500;
  --el-button-border-radius: 8px;

  min-height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  font-family: 'PingFang SC', sans-serif;
  font-size: 14px;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;

  &:not(.el-button--primary):not(.is-link):not(.is-text) {
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
    --el-button-bg-color: var(--ch-button-primary);
    --el-button-border-color: var(--ch-button-primary);
    --el-button-text-color: #ffffff;
    --el-button-hover-bg-color: var(--ch-button-primary-hover);
    --el-button-hover-border-color: var(--ch-button-primary-hover);
    --el-button-hover-text-color: #ffffff;
    --el-button-active-bg-color: var(--ch-button-primary-active);
    --el-button-active-border-color: var(--ch-button-primary-active);
    --el-button-active-text-color: #ffffff;
    --el-button-disabled-bg-color: rgba(22, 93, 255, 0.45);
    --el-button-disabled-border-color: rgba(22, 93, 255, 0.12);
    --el-button-disabled-text-color: #ffffff;

    min-height: 44px;
    padding: 0 20px;
    font-size: 16px;
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
}
</style>
