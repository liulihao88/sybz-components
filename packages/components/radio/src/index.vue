<template>
  <div class="s-radio-box" :class="radioClass">
    <s-comp-title
      v-if="mergedProps.title"
      v-bind="compTitleProps"
      class="s-radio-box__title"
    ></s-comp-title>
    <el-radio-group v-bind="$attrs">
      <slot>
        <component
          v-for="(item, index) in parseOptions"
          v-bind="item"
          :is="radioType"
          :key="index"
          :label="item[mergedProps.label!]"
          :value="item[mergedProps.value!]"
          :border="mergedProps.border"
          :disabled="mergedProps.itemDisabled(item, index, parseOptions)"
        >
          <slot :name="item.slot" v-bind="item">
            {{ item[mergedProps.label!] }}
          </slot>
        </component>
      </slot>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PropType } from 'vue'
import type { RadioItem } from './radio'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SRadio',
})
const props = defineProps({
  title: {
    type: String,
  },
  boxStyle: {
    type: Object,
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
  type: {
    type: String,
    validator: (value: string) => ['boolean', 'simple', ''].includes(value),
    default: '',
  },
  showType: {
    type: String as PropType<'radio' | 'button'>,
    validator: (value: string) => ['radio', 'button'].includes(value),
    default: 'radio',
  },
  options: {
    type: Array as PropType<RadioItem[]>,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number, Boolean],
    default: 'value',
  },
  label: {
    type: [String, Number, Boolean],
    default: 'label',
  },
  itemDisabled: {
    type: Function,
    default: () => {},
  },
})
const mergedProps = useGlobalComponentConfig('radio', props)
const attrs = useAttrs()
const compTitleProps = computed(() => {
  const titleProps: Record<string, any> = {
    title: mergedProps.value.title,
    theme: mergedProps.value.theme,
  }

  if (mergedProps.value.boxStyle !== undefined) {
    titleProps.boxStyle = mergedProps.value.boxStyle
  }

  return titleProps
})
const radioType = computed(() => {
  const obj = {
    radio: 'el-radio',
    button: 'el-radio-button',
  }
  return obj[mergedProps.value.showType] ?? 'el-radio'
})
const parseOptions = computed(() => {
  if (mergedProps.value.type === 'boolean') {
    return [
      { label: true, value: true },
      { label: false, value: false },
    ]
  }
  if (mergedProps.value.type === 'simple' && mergedProps.value.options.length > 0) {
    return mergedProps.value.options.map((v) => {
      return {
        label: v,
        value: v,
      }
    })
  }
  return mergedProps.value.options
})
const radioClass = computed(() => {
  return {
    's-radio-box--chenghua': mergedProps.value.theme === 'chenghua',
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
