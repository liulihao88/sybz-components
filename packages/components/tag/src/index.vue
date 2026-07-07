<script setup lang="ts">
defineOptions({
  name: 'STag',
})

import { computed } from 'vue'
import { getType, isEmpty } from '@sybz-components/utils'
import { handleWidthHeight } from '@/components/utils/local.ts'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
type TagType = '' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
type TagTheme = 'default' | 'chenghua' | 'shijingshan'
type TagSize = '' | 'small' | 'default' | 'large'
type TagRule = string | number | boolean | any[]

interface TagProps {
  options?: Record<string, any>[]
  value?: string | number
  width?: string | number
  height?: string | number
  primary?: TagRule
  warning?: TagRule
  danger?: TagRule
  info?: TagRule
  other?: TagType
  type?: TagType
  theme?: TagTheme
  size?: TagSize
  config?: Record<string, any>
}

const props = withDefaults(defineProps<TagProps>(), {
  options: () => [],
  value: '',
  width: '',
  height: '',
  primary: false,
  warning: false,
  danger: false,
  info: false,
  other: 'primary',
  type: '',
  theme: 'default',
  size: '',
  config: () => ({}),
})
const mergedProps = useGlobalComponentConfig('tag', props)

const hasValue = computed(() => !isEmpty(mergedProps.value.value, true))
const hasOptions = computed(() => mergedProps.value.options.length > 0)

const optionMatch = computed(() => {
  const { options, config, value } = mergedProps.value

  if (!hasOptions.value || !hasValue.value) {
    return null
  }

  if (!isEmpty(config)) {
    const foundItem = options.find((obj) => value === obj[config.value || 'value'])
    return foundItem
      ? {
          label: foundItem[config.label || 'label'],
        }
      : null
  }

  for (const item of options) {
    for (const [type, items] of Object.entries(item)) {
      if (!Array.isArray(items)) continue
      const foundItem = items.find((obj) => Object.prototype.hasOwnProperty.call(obj, value))
      if (foundItem) {
        return {
          type,
          label: foundItem[value],
        }
      }
    }
  }

  return null
})

const optionsGetName = computed(() => optionMatch.value?.label)

const parseContent = computed(() => {
  if (hasOptions.value && hasValue.value && !isEmpty(optionsGetName.value, true)) {
    return optionsGetName.value
  } else {
    return mergedProps.value.value
  }
})

const getMatchType = (types, type) => {
  const normalizedTypes = Array.isArray(types) ? types : [types]
  if (getType(types) === 'array') {
    return normalizedTypes.includes(mergedProps.value.value) ? type : null
  } else if (getType(types) === 'boolean') {
    return types === true ? type : null
  } else if (types === mergedProps.value.value) {
    return type
  } else {
    return null
  }
}

const parseType = computed(() => {
  const { primary, warning, info, danger, other, type, config } = mergedProps.value

  if (hasOptions.value && hasValue.value) {
    if (!isEmpty(config)) {
      if (optionMatch.value) {
        return (
          getMatchType(primary, 'primary') ||
          getMatchType(info, 'info') ||
          getMatchType(warning, 'warning') ||
          getMatchType(danger, 'danger') ||
          other
        )
      }
      return other
    } else {
      return optionMatch.value?.type || other
    }
  }

  if (type) {
    return type
  }

  return (
    getMatchType(primary, 'primary') ||
    getMatchType(info, 'info') ||
    getMatchType(warning, 'warning') ||
    getMatchType(danger, 'danger') ||
    other // 默认返回值
  )
})

const tagClass = computed(() => ({
  's-tag--chenghua': mergedProps.value.theme === 'chenghua',
  's-tag--shijingshan': mergedProps.value.theme === 'shijingshan',
}))
</script>

<template>
  <el-tag
    v-bind="$attrs"
    :type="parseType"
    :size="mergedProps.size || undefined"
    :class="tagClass"
    :style="{ ...handleWidthHeight(mergedProps.width, mergedProps.height) }"
  >
    <slot>
      {{ parseContent }}
    </slot>
  </el-tag>
</template>
