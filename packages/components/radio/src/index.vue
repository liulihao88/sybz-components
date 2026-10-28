<template>
  <div class="s-radio-box" :class="radioClass" :style="style">
    <span v-if="mergedProps.title" class="s-radio-box__title" :style="titleStyle">
      {{ mergedProps.title }}
    </span>
    <el-radio-group v-bind="groupAttrs" :class="{ 's-radio-group--custom-gap': hasCustomGap }" :style="groupStyle">
      <slot>
        <component
          :is="radioType"
          v-for="(item, index) in parseOptions"
          :key="getOptionKey(item, index)"
          :size="mergedProps.size || undefined"
          :label="item[mergedProps.label!]"
          :value="item[mergedProps.value!]"
          :border="mergedProps.border"
          :disabled="getOptionDisabled(item, index)"
          :class="item.class"
          :style="getOptionStyle(item)"
          v-bind="getOptionAttrs(item)"
        >
          <slot :name="'slot' in item ? item.slot : undefined" v-bind="item">
            {{ getOptionLabel(item, index) }}
          </slot>
        </component>
      </slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import type { SybzComponentTheme } from '../../../types/component-props'
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import { processWidth } from '@sybz-components/utils'
import { parseGap, type GapValue } from '@/hooks/parseGap'
import type { RadioItem, RadioOption, RadioOptionValue } from './radio'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'

defineOptions({
  name: 'SRadio',
  inheritAttrs: false,
})
interface RadioProps {
  title?: string
  compTitleStyle?: Record<string, any>
  theme?: SybzComponentTheme
  size?: 'small' | 'default' | 'large'
  type?: 'boolean' | 'simple' | ''
  variant?: 'radio' | 'button'
  options?: RadioOption[]
  border?: boolean
  gap?: string | number | [GapValue, GapValue]
  value?: any
  label?: any
  customLabel?: (context: RadioOptionContext) => any
  customDisabled?: (context: RadioOptionContext) => boolean | null
}

interface RadioOptionContext {
  option: RadioItem
  index: number
  value: unknown
}

const radioTypeColors = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
} as const

const props = withDefaults(defineProps<RadioProps>(), {
  title: undefined,
  compTitleStyle: undefined,
  theme: 'default',
  size: 'default',
  type: '',
  variant: 'radio',
  options: () => [],
  border: false,
  value: 'value',
  label: 'label',
})
const mergedProps = useGlobalComponentConfig('radio', props)
const attrs = useAttrs()
const { style } = useStyleProps()
const titleStyle = computed(() => {
  const style = mergedProps.value.compTitleStyle
  return style?.width ? { ...style, width: processWidth(style.width, true) } : style
})
const groupAttrs = computed(() => ({
  disabled: mergedProps.value.disabled,
  ...attrs,
  size: mergedProps.value.size || undefined,
}))
const defaultRadioGap = 16
const gapValue = computed(() => {
  if (mergedProps.value.variant === 'button') return undefined
  const gap = mergedProps.value.gap
  if (gap !== undefined && gap !== '') return gap
  return defaultRadioGap
})
const hasCustomGap = computed(() => gapValue.value !== undefined && gapValue.value !== '')
const groupStyle = computed<CSSProperties | undefined>(() => {
  if (!hasCustomGap.value) return undefined
  const { x, y } = Array.isArray(gapValue.value)
    ? parseGap(gapValue.value)
    : { x: processWidth(gapValue.value, true), y: processWidth(gapValue.value, true) }
  return { rowGap: y, '--s-radio-gap-x': x } as CSSProperties
})
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[mergedProps.value.variant] ?? 'el-radio'
})
const isBaseOption = (option: RadioOption): option is RadioOptionValue => {
  return ['string', 'number', 'boolean'].includes(typeof option)
}
const normalizeOption = (option: RadioOption): RadioItem => {
  if (isBaseOption(option)) {
    return {
      label: option,
      value: option,
    }
  }

  return option
}
const parseOptions = computed(() => {
  if (mergedProps.value.type === 'boolean') {
    return [
      { label: true, value: true },
      { label: false, value: false },
    ]
  }
  return mergedProps.value.options.map(normalizeOption)
})
const getOptionKey = (option: RadioItem, index: number) => {
  const value = option[mergedProps.value.value as keyof RadioItem]
  return typeof value === 'string' || typeof value === 'number' ? value : index
}
const getOptionAttrs = (option: RadioItem) => {
  const {
    class: _class,
    color: _color,
    disabled: _disabled,
    label: _label,
    slot: _slot,
    style: _style,
    type: _type,
    value: _value,
    ...attrs
  } = option
  return attrs
}
const isDisabled = computed(() => attrs.disabled === '' || Boolean(attrs.disabled ?? mergedProps.value.disabled))
const getOptionDisabled = (option: RadioItem, index: number) => {
  if (isDisabled.value || option.disabled) return true
  if (typeof mergedProps.value.customDisabled !== 'function') return false
  return (
    mergedProps.value.customDisabled({ option, index, value: option[mergedProps.value.value as keyof RadioItem] }) ??
    false
  )
}
const getOptionLabel = (option: RadioItem, index: number) => {
  if (typeof mergedProps.value.customLabel !== 'function') return option[mergedProps.value.label as keyof RadioItem]
  return mergedProps.value.customLabel({
    option,
    index,
    value: option[mergedProps.value.value as keyof RadioItem],
  })
}
const getTypeColors = (type: keyof typeof radioTypeColors) => {
  if (mergedProps.value.theme === 'chenghua') {
    return {
      color: `var(--s-ch-${type})`,
      hoverBg: `rgba(var(--s-ch-${type}-rgb), 0.08)`,
      hoverBorder: `rgba(var(--s-ch-${type}-rgb), 0.42)`,
    }
  }

  if (mergedProps.value.theme === 'shijingshan') {
    return {
      color: `var(--s-sjs-${type})`,
      hoverBg: `rgba(var(--s-sjs-${type}-rgb), 0.08)`,
      hoverBorder: `rgba(var(--s-sjs-${type}-rgb), 0.42)`,
    }
  }
  if (mergedProps.value.theme === 'sybz') {
    return {
      color: `var(--s-sybz-${type})`,
      hoverBg: `rgba(var(--s-sybz-${type}-rgb), 0.08)`,
      hoverBorder: `rgba(var(--s-sybz-${type}-rgb), 0.42)`,
    }
  }

  return {
    color: `var(--el-color-${type})`,
    hoverBg: `var(--el-color-${type}-light-9)`,
    hoverBorder: `var(--el-color-${type}-light-5)`,
  }
}
const getOptionStyle = (option: RadioItem): CSSProperties | undefined => {
  if (mergedProps.value.variant !== 'button') return option.style

  const type = option.type && radioTypeColors[option.type]

  const typeColors = getTypeColors(type || 'primary')

  return {
    '--s-radio-button-color': option.color || typeColors?.color,
    ...(typeColors
      ? {
          '--s-radio-button-hover-bg': typeColors.hoverBg,
          '--s-radio-button-hover-border': typeColors.hoverBorder,
          '--s-radio-button-hover-text': typeColors.color,
        }
      : {}),
    ...option.style,
  } as CSSProperties
}
const radioClass = computed(() => {
  return {
    's-radio-box--chenghua': mergedProps.value.theme === 'chenghua',
    's-radio-box--shijingshan': mergedProps.value.theme === 'shijingshan',
    's-radio-box--sybz': mergedProps.value.theme === 'sybz',
    's-radio-box--button': mergedProps.value.variant === 'button',
    's-radio-box--border': Boolean(attrs.border ?? mergedProps.value.border),
  }
})
</script>

<style lang="scss" scoped>
.s-radio-box {
  display: flex;

  .s-radio-box__title {
    display: inline-flex;
    align-items: center;
    align-self: center;
    flex: none;
    margin-right: 12px;
    color: inherit;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    white-space: nowrap;
  }
}

.s-radio-box--button {
  align-items: center;
  min-width: 0;

  :deep(.el-radio-group) {
    min-width: 0;
    max-width: 100%;
    padding: 1px;
    border-radius: var(--s-radio-scroll-radius, var(--el-border-radius-base));
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  :deep(.el-radio-group::-webkit-scrollbar) {
    display: none;
  }

  :deep(.el-radio-button) {
    flex: none;
  }

  :deep(.el-radio-button:not(.is-disabled, .is-active) .el-radio-button__inner:hover) {
    border-color: var(--s-radio-button-hover-border, var(--el-color-primary-light-5));
    outline-color: var(--s-radio-button-hover-border, var(--el-color-primary-light-5));
    background-color: var(--s-radio-button-hover-bg, var(--el-color-primary-light-9));
    color: var(--s-radio-button-hover-text, var(--el-color-primary));
  }

  :deep(.el-radio-button.is-active .el-radio-button__inner) {
    border-color: var(--s-radio-button-color, var(--el-color-primary));
    outline-color: var(--s-radio-button-color, var(--el-color-primary));
    background-color: var(--s-radio-button-color, var(--el-color-primary));
    box-shadow: -1px 0 0 0 var(--s-radio-button-color, var(--el-color-primary));
  }
}

.s-radio-box--button.s-radio-box--chenghua {
  --s-radio-scroll-radius: var(--s-ch-radius);
}

.s-radio-box--button.s-radio-box--shijingshan {
  --s-radio-scroll-radius: var(--s-sjs-radius);
}

.s-radio-box--button.s-radio-box--sybz {
  --s-radio-scroll-radius: var(--s-sybz-radius);
}

.s-radio-box--button:is(.s-radio-box--sybz, .s-radio-box--shijingshan) {
  :deep(.el-radio-button.is-active.is-disabled .el-radio-button__inner) {
    color: var(--el-color-white);
  }
}

:deep(.s-radio-group--custom-gap) {
  flex-wrap: wrap;

  > .el-radio:not(:last-child) {
    margin-right: var(--s-radio-gap-x);
  }
}
</style>
