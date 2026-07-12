<template>
  <div class="s-radio-box" :class="radioClass">
    <s-comp-title v-if="mergedProps.title" v-bind="compTitleProps" class="s-radio-box__title"></s-comp-title>
    <el-radio-group v-bind="groupAttrs">
      <slot>
        <component
          v-bind="item"
          :is="radioType"
          v-for="(item, index) in parseOptions"
          :key="index"
          :size="mergedProps.size || undefined"
          :label="item[mergedProps.label!]"
          :value="item[mergedProps.value!]"
          :border="mergedProps.border"
          :disabled="getOptionDisabled(item, index)"
        >
          <slot :name="'slot' in item ? item.slot : undefined" v-bind="item">
            {{ item[mergedProps.label!] }}
          </slot>
        </component>
      </slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { RadioItem, RadioOption, RadioOptionValue } from './radio'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SRadio',
})
interface RadioProps {
  title?: string
  compTitleStyle?: Record<string, any>
  theme?: 'default' | 'chenghua' | 'shijingshan'
  size?: '' | 'large' | 'default' | 'small'
  type?: 'boolean' | 'simple' | ''
  showType?: 'radio' | 'button'
  options?: RadioOption[]
  border?: boolean
  value?: any
  label?: any
  customDisabled?: (context: RadioOptionContext) => boolean | null
}

interface RadioOptionContext {
  option: RadioItem
  index: number
  value: unknown
}

const props = withDefaults(defineProps<RadioProps>(), {
  title: undefined,
  compTitleStyle: undefined,
  theme: 'default',
  size: '',
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
const getOptionDisabled = (option: RadioItem, index: number) => {
  if (typeof mergedProps.value.customDisabled !== 'function') return false
  return (
    mergedProps.value.customDisabled({ option, index, value: option[mergedProps.value.value as keyof RadioItem] }) ??
    false
  )
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
</style>
