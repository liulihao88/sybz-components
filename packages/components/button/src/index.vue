<template>
  <s-tooltip
    v-if="mergedProps.content"
    :content="mergedProps.content"
    :dangerouslyUseHTMLString="htmlStringEnabled"
    :show-slot="false"
    v-bind="mergedProps.tooltipAttrs"
  >
    <template #trigger>
      <el-button v-bind="buttonAttrs" :class="['s-button-content', buttonClass]" @click="handleClick">
        <template v-for="(arg, name, index) in $slots" #[name]>
          <slot :name="name" v-bind="arg" :index="index" />
        </template>
      </el-button>
    </template>
  </s-tooltip>
  <el-button v-else v-bind="buttonAttrs" :class="buttonClass" @click="handleClick">
    <template v-for="(arg, name, index) in $slots" #[name]>
      <slot :name="name" v-bind="arg" :index="index" />
    </template>
  </el-button>
</template>

<script setup lang="ts">
import { computed, h, ref, useAttrs } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import { processWidth, toLine } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SButton',
  inheritAttrs: false,
})

interface SButtonSelfProps {
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top'
  time?: number
  content?: string
  tooltipAttrs?: Record<string, any>
  dangerouslyUseHTMLString?: boolean
  theme?: 'default' | 'chenghua' | 'shijingshan'
  variant?: '' | 'outline' | 'gradient'
  size?: 'small' | 'default' | 'large'
  width?: string | number
  height?: string | number
  hoverAnimation?: boolean
  ghost?: boolean
  iconPlacement?: 'start' | 'end'
}

const props = withDefaults(defineProps<SButtonSelfProps>(), {
  href: '',
  target: '_self',
  time: 0,
  content: '',
  tooltipAttrs: () => ({}),
  dangerouslyUseHTMLString: false,
  theme: 'default',
  variant: '',
  size: 'default',
  width: '',
  height: '',
  hoverAnimation: false,
  ghost: false,
  iconPlacement: 'start',
})

const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('button', props)
const htmlStringEnabled = computed(() => Boolean(mergedProps.value.dangerouslyUseHTMLString))

const emits = defineEmits<{
  click: [evt: MouseEvent]
}>()

const lastClickTime = ref<number | null>(null)

const loading = ref(false)

const normalizeIcon = (icon: unknown) => {
  if (typeof icon !== 'string' || !icon || icon.startsWith('el-icon-')) return icon
  if (icon.includes(':')) {
    return () => h(IconifyIcon, { icon, 'aria-hidden': true })
  }
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
    size: mergedProps.value.size || undefined,
    ...normalizedAttrs,
    tag: mergedProps.value.href ? 'a' : normalizedAttrs.tag,
    href: mergedProps.value.href || normalizedAttrs.href,
    target: mergedProps.value.href ? mergedProps.value.target : normalizedAttrs.target,
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
  's-button--theme': mergedProps.value.theme !== 'default',
  's-button--hover-animation': mergedProps.value.hoverAnimation,
  's-button--ghost': mergedProps.value.ghost,
  's-button--icon-end': mergedProps.value.iconPlacement === 'end',
  's-button--chenghua': mergedProps.value.theme === 'chenghua',
  's-button--chenghua-outline': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'outline',
  's-button--chenghua-gradient': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'gradient',
  's-button--shijingshan': mergedProps.value.theme === 'shijingshan',
  's-button--shijingshan-outline': mergedProps.value.theme === 'shijingshan' && mergedProps.value.variant === 'outline',
  's-button--shijingshan-gradient':
    mergedProps.value.theme === 'shijingshan' && mergedProps.value.variant === 'gradient',
}))

const handleClick = (evt: MouseEvent) => {
  if (mergedProps.value.time === 0) {
    emits('click', evt)
    return
  }

  const now = Date.now()
  if (lastClickTime.value === null || now - lastClickTime.value >= mergedProps.value.time) {
    loading.value = true
    emits('click', evt)
    lastClickTime.value = now

    setTimeout(() => {
      loading.value = false
    }, mergedProps.value.time)
  }
}
</script>

<style lang="scss" scoped>
.s-button--icon-end {
  flex-direction: row-reverse;

  .el-icon + span {
    margin-right: 6px;
    margin-left: 0;
  }

  &.el-button--large .el-icon + span {
    margin-right: 8px;
  }

  &.el-button--small .el-icon + span {
    margin-right: 4px;
  }
}

.s-button--ghost.s-button--ghost.s-button--ghost {
  --el-button-bg-color: transparent;
  --el-button-border-color: #ffffff;
  --el-button-text-color: #ffffff;
  --el-button-hover-bg-color: transparent;
  --el-button-hover-border-color: var(--el-color-primary-light-3);
  --el-button-hover-text-color: var(--el-color-primary-light-3);
  --el-button-active-bg-color: transparent;
  --el-button-active-border-color: var(--el-color-primary-dark-2);
  --el-button-active-text-color: var(--el-color-primary-dark-2);
  --el-button-disabled-bg-color: transparent;
  --el-button-disabled-border-color: rgba(255, 255, 255, 0.25);
  --el-button-disabled-text-color: rgba(255, 255, 255, 0.25);

  background: transparent;
  box-shadow: none;

  &.el-button--primary {
    --el-button-border-color: var(--el-color-primary);
    --el-button-text-color: var(--el-color-primary);
  }

  &.el-button--success {
    --el-button-border-color: var(--el-color-success);
    --el-button-text-color: var(--el-color-success);
    --el-button-hover-border-color: var(--el-color-success-light-3);
    --el-button-hover-text-color: var(--el-color-success-light-3);
    --el-button-active-border-color: var(--el-color-success-dark-2);
    --el-button-active-text-color: var(--el-color-success-dark-2);
  }

  &.el-button--warning {
    --el-button-border-color: var(--el-color-warning);
    --el-button-text-color: var(--el-color-warning);
    --el-button-hover-border-color: var(--el-color-warning-light-3);
    --el-button-hover-text-color: var(--el-color-warning-light-3);
    --el-button-active-border-color: var(--el-color-warning-dark-2);
    --el-button-active-text-color: var(--el-color-warning-dark-2);
  }

  &.el-button--danger {
    --el-button-border-color: var(--el-color-danger);
    --el-button-text-color: var(--el-color-danger);
    --el-button-hover-border-color: var(--el-color-danger-light-3);
    --el-button-hover-text-color: var(--el-color-danger-light-3);
    --el-button-active-border-color: var(--el-color-danger-dark-2);
    --el-button-active-text-color: var(--el-color-danger-dark-2);
  }

  &.el-button--info {
    --el-button-border-color: var(--el-color-info);
    --el-button-text-color: var(--el-color-info);
    --el-button-hover-border-color: var(--el-color-info-light-3);
    --el-button-hover-text-color: var(--el-color-info-light-3);
    --el-button-active-border-color: var(--el-color-info-dark-2);
    --el-button-active-text-color: var(--el-color-info-dark-2);
  }

  &.is-disabled,
  &.is-disabled:hover,
  &.is-disabled:focus,
  &.is-disabled:active {
    border-color: rgba(255, 255, 255, 0.25);
    background: transparent;
    color: rgba(255, 255, 255, 0.25);
    box-shadow: none;
  }
}
</style>
