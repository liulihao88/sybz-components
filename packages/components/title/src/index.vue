<template>
  <div class="s-title" :class="titleClass" :style="titleStyle" v-bind="$attrs">
    <div class="s-title__top" :class="parseClass">
      <div class="s-title__main" :style="{ marginLeft: mergedProps.inner ? '8px' : 0 }">
        <span :class="($slots.icon || mergedProps.type === 'icon') && 's-title__slot-icon-wrapper'">
          <slot name="icon">
            <span v-if="isThemeIcon" class="s-title__theme-icon" aria-hidden="true"></span>
            <svg
              v-else-if="mergedProps.type === 'icon'"
              class="s-title__default-icon"
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M800.512 474.944h-377.6a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32z m-377.6 203.776a24.256 24.256 0 0 0-24.32 24.32c0 13.504 10.816 24.32 24.32 24.32h377.6c13.504 0 24.32-10.816 24.32-24.32a24.576 24.576 0 0 0-24.32-24.32h-377.6z"
              />
              <path
                fill="currentColor"
                d="M928.064 209.6h-252.736l-5.376-15.68c-37.824-104.832-110.272-129.728-164.288-132.416h-409.728a62.592 62.592 0 0 0-62.72 62.144v776.704c0 34.048 28.096 62.144 62.72 62.144h832.128a62.72 62.72 0 0 0 62.72-62.144v-628.608a62.272 62.272 0 0 0-62.72-62.144z m-848.384-56.256c0-48.128 17.856-41.6 90.816-41.6h261.056c110.784 0 139.456 23.808 160.512 61.056l15.68 36.736h-528.064v-56.192z m773.248 759.424H170.496c-74.56 0-86.464-5.952-86.464-85.952v-566.464h784.576c78.912 0 70.784 30.784 70.784 85.952v492.928c0.064 72.448-25.344 73.536-86.464 73.536z"
              />
              <path
                fill="currentColor"
                d="M196.992 536.576h78.912v-78.912h-78.912v78.912z m0 205.952h78.912v-78.912h-78.912v78.912z"
              />
            </svg>
          </slot>
        </span>
        <component :is="mergedProps.tag" class="s-title__text" v-bind="titleA11yAttrs">
          <slot name="title">
            {{ mergedProps.title }}
          </slot>
        </component>
        <span v-if="mergedProps.subTitle" class="s-title__subTitle" v-bind="mergedProps.subAttrs">
          {{ mergedProps.subTitle }}
        </span>
        <span v-if="$slots.default" class="s-title__content">
          <slot></slot>
        </span>
      </div>
      <div v-if="$slots.extra || $slots.right || mergedProps.extra" class="s-title__slot-extra-wrapper">
        <slot name="extra">{{ mergedProps.extra }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'STitle',
})
defineSlots<{
  default?: () => any
  title?: () => any
  icon?: () => any
  extra?: () => any
}>()
type TitleSize = 'small' | 'default' | 'large'
type TitleType = '' | 'simple' | 'icon' | 'form'
type TitleTag = 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
interface TitleProps {
  title?: string
  extra?: string
  size?: TitleSize
  subTitle?: string
  subAttrs?: Record<string, any>
  inner?: boolean
  margin?: string | number
  gap?: string | number
  t?: string | number
  b?: string | number
  l?: string | number
  tb?: string | number
  height?: string | number
  type?: TitleType
  theme?: 'default' | 'chenghua' | 'shijingshan'
  tag?: TitleTag
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const titleSizeMap: Record<TitleSize, Record<string, string>> = {
  small: {
    '--s-title-font-size': '14px',
    '--s-title-sub-title-font-size': '12px',
    '--s-title-icon-size': '12px',
    '--s-title-bar-height': '14px',
    '--s-title-min-height': '24px',
    '--s-title-gap': '6px',
  },
  default: {
    '--s-title-font-size': '16px',
    '--s-title-sub-title-font-size': '14px',
    '--s-title-icon-size': '14px',
    '--s-title-bar-height': '16px',
    '--s-title-min-height': '28px',
    '--s-title-gap': '8px',
  },
  large: {
    '--s-title-font-size': '18px',
    '--s-title-sub-title-font-size': '14px',
    '--s-title-icon-size': '18px',
    '--s-title-bar-height': '18px',
    '--s-title-min-height': '34px',
    '--s-title-gap': '10px',
  },
}

const props = withDefaults(defineProps<TitleProps>(), {
  title: '',
  extra: '',
  size: 'default',
  // 本地开发. 用来对文件命名. 可以快速定位到文件的名字
  subTitle: '',
  subAttrs: () => ({}),
  inner: false,
  margin: '',
  gap: '',
  t: '',
  b: '',
  l: '',
  tb: undefined,
  height: '',
  type: '',
  theme: 'default',
  tag: 'div',
  level: 3,
})
const mergedProps = useGlobalComponentConfig('title', props)

const formatCssValue = (value?: string | number) => {
  if (value === undefined || value === null || value === '') {
    return ''
  }

  return typeof value === 'number' || !Number.isNaN(Number(value)) ? `${value}px` : String(value)
}

const titleStyle = computed(() => {
  const { size, margin, gap, t, b, l, tb, height } = mergedProps.value
  const style: CSSProperties = {}

  if (margin) {
    style.margin = formatCssValue(margin)
  }
  if (tb) {
    style.marginTop = formatCssValue(tb)
    style.marginBottom = formatCssValue(tb)
  }
  if (t) {
    style.marginTop = formatCssValue(t)
  }
  if (b) {
    style.marginBottom = formatCssValue(b)
  }
  if (l) {
    style.marginLeft = formatCssValue(l)
  }
  if (height) {
    style.height = formatCssValue(height)
  }

  if (size) {
    Object.assign(style, titleSizeMap[size])
  }
  if (gap) {
    style['--s-title-gap'] = formatCssValue(gap)
  }

  return style
})

const parseClass = computed(() => {
  let type = mergedProps.value.type
  if (type === 'simple' || type === 'icon') {
    return 's-title__top-simple-left'
  }
  if (type === 'form') {
    return 's-title__form-left'
  }
  return 's-title__top-left'
})

const titleClass = computed(() => ({
  's-title--chenghua': mergedProps.value.theme === 'chenghua',
  's-title--shijingshan': mergedProps.value.theme === 'shijingshan',
  [`s-title--size-${mergedProps.value.size}`]: !!mergedProps.value.size,
}))
const titleA11yAttrs = computed(() => {
  if (/^h[1-6]$/.test(mergedProps.value.tag)) return {}

  return {
    role: 'heading',
    'aria-level': mergedProps.value.level,
  }
})
const isThemeIcon = computed(() => {
  return ['chenghua', 'shijingshan'].includes(mergedProps.value.theme) && mergedProps.value.type === 'icon'
})
</script>

<style scoped lang="scss">
.s-title {
  position: relative;
  box-sizing: border-box;
  .s-title__main {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    min-width: 0;
  }
  .s-title__text {
    flex: 0 1 auto;
    min-width: 0;
    max-width: 100%;
    margin: 0 var(--s-title-gap, 8px) 0 0;
    overflow: hidden;
    color: inherit;
    font: inherit;
    font-weight: 600;
    letter-spacing: 0;
    line-height: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .s-title__top {
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
    font-size: var(--s-title-font-size, 16px);
    justify-content: space-between;
    .s-title__slot-icon-wrapper {
      margin-right: var(--s-title-gap, 8px);
      width: var(--s-title-icon-size, 14px);
      height: var(--s-title-icon-size, 14px);
      display: flex;
      align-items: center;
      color: currentColor;
    }
    .s-title__default-icon {
      width: var(--s-title-icon-size, 14px);
      height: var(--s-title-icon-size, 14px);
      display: block;
    }
    .s-title__slot-extra-wrapper {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: flex-end;
      min-width: 0;
      text-align: right;
    }
  }

  .s-title__form-left {
    padding: 0 0 8px;
    margin: 0 0 16px;
    font-weight: 800;
    width: 100%;
  }

  .s-title__top-simple-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
  }
  .s-title__top-left {
    width: 100%;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    &::before {
      position: absolute;
      content: '';
      width: 3px;
      left: -8px;
      top: 50%;
      height: var(--s-title-bar-height, 16px);
      bottom: auto;
      letter-spacing: 0;
      background-color: var(--lc, var(--blue)); // 左侧的竖条颜色
      transform: translateY(-50%);
    }
  }
  .s-title__content {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    min-width: 0;
  }
  .s-title__subTitle {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    margin-right: var(--s-title-gap, 8px);
    overflow: hidden;
    font-size: var(--s-title-sub-title-font-size, 14px);
    font-weight: 400;
    color: var(--el-text-color-secondary);
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
