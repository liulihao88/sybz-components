<template>
  <div
    class="s-input-number"
    v-bind="mergedProps.subAttrs"
    :style="[inputNumberStyle, attrs.style as any, style]"
    :class="inputNumberClass"
  >
    <s-comp-title v-if="mergedProps.title" v-bind="compTitleProps" />
    <div class="s-input-number__main">
      <TopTitleOutline
        v-if="mergedProps.topTitle"
        :title="mergedProps.topTitle"
        :square-left="Boolean(mergedProps.title)"
      />
      <el-input-number class="s-input-number__inner" v-bind="mergedAttrs">
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </el-input-number>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SybzComponentTheme } from '../../../types/component-props'
import { computed, useAttrs } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'
import TopTitleOutline from '../../common/TopTitleOutline.vue'

defineOptions({
  name: 'SInputNumber',
  inheritAttrs: false,
})

const attrs = useAttrs()

interface InputNumberProps {
  title?: string
  /** 嵌在输入框上边框的标题，与左侧前缀 title 区分 */
  topTitle?: string
  compTitleStyle?: Record<string, any>
  width?: string | number
  w?: string | number
  height?: string | number
  h?: string | number
  theme?: SybzComponentTheme
  size?: '' | 'large' | 'default' | 'small'
  subAttrs?: Record<string, any>
}

const props = withDefaults(defineProps<InputNumberProps>(), {
  title: '',
  topTitle: '',
  compTitleStyle: undefined,
  width: '',
  height: '',
  theme: 'default',
  size: '',
  subAttrs: () => ({}),
})
const mergedProps = useGlobalComponentConfig('inputNumber', props)
const { style } = useStyleProps()
const isDisabled = computed(() => (attrs.disabled ?? mergedProps.value.disabled) === true || attrs.disabled === '')

const compTitleProps = computed(() => {
  const titleProps: Record<string, any> = {
    title: mergedProps.value.title,
    size: mergedProps.value.size,
    theme: mergedProps.value.theme,
  }

  if (mergedProps.value.compTitleStyle !== undefined) {
    titleProps.compTitleStyle = mergedProps.value.compTitleStyle
  }

  return titleProps
})

const inputNumberClass = computed(() => [
  attrs.class,
  {
    's-input-number--chenghua': mergedProps.value.theme === 'chenghua',
    's-input-number--shijingshan': mergedProps.value.theme === 'shijingshan',
    's-input-number--sybz': mergedProps.value.theme === 'sybz',
    's-input-number--top-title': Boolean(mergedProps.value.topTitle),
    'has-title': !!mergedProps.value.title,
    'is-disabled': isDisabled.value,
  },
])

const mergedAttrs = computed(() => {
  const baseAttrs = {
    'controls-position': 'right',
    size: mergedProps.value.size || undefined,
    disabled: mergedProps.value.disabled,
  }

  const merged = Object.entries(attrs).reduce((obj, [key, value]) => {
    if (key !== 'class' && key !== 'style') {
      obj[key] = value
    }
    return obj
  }, baseAttrs)

  if (mergedProps.value.topTitle && !merged['aria-label']) {
    merged['aria-label'] = mergedProps.value.topTitle
  }

  return merged
})

const inputNumberStyle = computed(() => {
  const style: Record<string, any> = {}

  if (mergedProps.value.width) {
    style.width = processWidth(mergedProps.value.width, true)
  }

  if (mergedProps.value.height) {
    const inputNumberHeight = processWidth(mergedProps.value.height, true)
    style.height = inputNumberHeight
    style['--s-input-number-height'] = inputNumberHeight
    style['--el-input-height'] = inputNumberHeight
  }

  return style
})
</script>

<style scoped lang="scss">
.s-input-number {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;

  .s-input-number__main {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
  }

  .s-input-number__inner {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
  }

  :deep(.el-input-number .el-input),
  :deep(.el-input-number .el-input__wrapper) {
    height: 100%;
    min-height: var(--s-input-number-height, var(--el-input-height, 32px));
  }

  :deep(.el-input-number.is-controls-right .el-input-number__decrease),
  :deep(.el-input-number.is-controls-right .el-input-number__increase) {
    // 按实际容器高度平分，兼容表单拉伸及百分比高度。
    height: calc(50% - 1px);
    line-height: normal;
  }

  &.has-title :deep(.el-input-number .el-input__wrapper),
  &.has-title :deep(.el-input-number .el-input-number__decrease) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  &.s-input-number--top-title {
    &:hover {
      --s-top-title-border-color: var(--el-border-color-hover);
    }

    &:focus-within {
      --s-top-title-border-color: var(--el-color-primary);
    }

    &.is-disabled,
    &.is-disabled:hover {
      --s-top-title-border-color: var(--el-disabled-border-color);
    }

    // 边框由 TopTitleOutline 绘制，内层输入框不再重复描边，避免 1px 线穿过标题。
    .s-input-number__main :deep(.el-input-number .el-input__wrapper),
    .s-input-number__main :deep(.el-input-number .el-input__wrapper:hover),
    .s-input-number__main :deep(.el-input-number .el-input__wrapper.is-focus),
    .s-input-number__main :deep(.el-input-number .el-input-number__decrease:hover ~ .el-input .el-input__wrapper),
    .s-input-number__main :deep(.el-input-number .el-input-number__increase:hover ~ .el-input .el-input__wrapper) {
      box-shadow: none;
    }
  }
}
</style>
