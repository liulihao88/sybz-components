<template>
  <s-tooltip
    v-if="mergedProps.content"
    :content="mergedProps.content"
    :dangerously-use-html-string="htmlStringEnabled"
    v-bind="mergedProps.tooltipAttrs"
  >
    <el-button v-bind="buttonAttrs" :class="['s-button-content', buttonClass]" @click="handleClick">
      <template v-for="(arg, name, index) in $slots" #[name]>
        <slot :name="name" v-bind="arg" :index="index" />
      </template>
    </el-button>
  </s-tooltip>
  <el-button v-else v-bind="buttonAttrs" :class="buttonClass" @click="handleClick">
    <template v-for="(arg, name, index) in $slots" #[name]>
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
  dangerouslyUseHTMLString?: boolean
  dangerouslyUseHtmlString?: boolean
  theme?: '' | 'chenghua'
  variant?: '' | 'outline' | 'gradient'
  size?: '' | 'small' | 'default' | 'large'
  width?: string | number
  height?: string | number
  hoverAnimation?: boolean
}

const props = withDefaults(defineProps<SButtonSelfProps>(), {
  time: 0,
  content: '',
  tooltipAttrs: () => ({}),
  dangerouslyUseHTMLString: undefined,
  dangerouslyUseHtmlString: false,
  theme: '',
  variant: '',
  size: '',
  width: '',
  height: '',
  hoverAnimation: false,
})

const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('button', props)
const htmlStringEnabled = computed(() =>
  Boolean(mergedProps.value.dangerouslyUseHTMLString ?? mergedProps.value.dangerouslyUseHtmlString),
)

const emits = defineEmits<{
  click: [evt: MouseEvent]
}>()

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
    size: mergedProps.value.size || undefined,
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
  's-button--hover-animation': mergedProps.value.hoverAnimation,
  's-button--chenghua': mergedProps.value.theme === 'chenghua',
  's-button--chenghua-outline': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'outline',
  's-button--chenghua-gradient': mergedProps.value.theme === 'chenghua' && mergedProps.value.variant === 'gradient',
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
