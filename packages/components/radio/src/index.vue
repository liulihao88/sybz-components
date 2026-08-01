<template>
  <div class="s-radio-box" :class="radioClass">
    <s-comp-title v-if="mergedProps.title" v-bind="compTitleProps" class="s-radio-box__title"></s-comp-title>
    <el-radio-group v-bind="groupAttrs">
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
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import type { RadioItem, RadioOption, RadioOptionValue } from './radio'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SRadio',
  inheritAttrs: false,
})
interface RadioProps {
  title?: string
  compTitleStyle?: Record<string, any>
  theme?: 'default' | 'chenghua' | 'shijingshan'
  size?: 'small' | 'default' | 'large'
  type?: 'boolean' | 'simple' | ''
  showType?: 'radio' | 'button'
  options?: RadioOption[]
  border?: boolean
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
  showType: 'radio',
  options: () => [],
  border: false,
  value: 'value',
  label: 'label',
})
const mergedProps = useGlobalComponentConfig('radio', props)
const attrs = useAttrs()
const compTitleProps = computed(() => {
  const titleProps: Record<string, any> = {
    title: mergedProps.value.title,
    theme: mergedProps.value.theme,
    size: mergedProps.value.size,
  }

  if (mergedProps.value.compTitleStyle !== undefined) {
    titleProps.compTitleStyle = mergedProps.value.compTitleStyle
  }

  return titleProps
})
const groupAttrs = computed(() => ({
  ...attrs,
  size: mergedProps.value.size || undefined,
}))
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[mergedProps.value.showType] ?? 'el-radio'
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
const isDisabled = computed(() => attrs.disabled === '' || Boolean(attrs.disabled))
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

  return {
    color: `var(--el-color-${type})`,
    hoverBg: `var(--el-color-${type}-light-9)`,
    hoverBorder: `var(--el-color-${type}-light-5)`,
  }
}
const getOptionStyle = (option: RadioItem): CSSProperties | undefined => {
  if (mergedProps.value.showType !== 'button') return option.style

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
    's-radio-box--button': mergedProps.value.showType === 'button',
    's-radio-box--border': Boolean(attrs.border ?? mergedProps.value.border),
  }
})
</script>

<style lang="scss" scoped>
.s-radio-box {
  display: flex;
  .s-radio-box__title {
    margin-right: 8px;
  }
  .s-comp-title {
    border-right: 1px solid var(--el-border-color);
  }
}

.s-radio-box--button {
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
</style>
