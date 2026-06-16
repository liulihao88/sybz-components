<script setup lang="ts">
defineOptions({
  name: 'STag',
})

import { ref, computed } from 'vue'
import { getType, isEmpty } from '@sybz-components/utils'
import { handleWidthHeight } from '@/components/utils/local.ts'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [String, Number],
  },
  width: {
    type: [String, Number],
  },
  height: {
    type: [String, Number],
  },
  primary: {
    type: [String, Number, Boolean, Array],
  },
  warning: {
    type: [String, Number, Boolean, Array],
  },
  danger: {
    type: [String, Number, Boolean, Array],
  },
  info: {
    type: [String, Number, Boolean, Array],
  },

  other: {
    type: String,
    default: 'primary',
  },
  type: {
    type: String,
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
  size: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'small', 'default', 'large'].includes(value),
  },
  config: {
    type: Object,
    default: () => ({}),
  },
})
const mergedProps = useGlobalComponentConfig('tag', props)

const hasValue = computed(() => !isEmpty(mergedProps.value.value, true))
const hasOptions = computed(() => mergedProps.value.options.length > 0)

const parseContent = computed(() => {
  if (hasOptions.value && hasValue.value && !isEmpty(optionsGetName.value, true)) {
    return optionsGetName.value
  } else {
    return mergedProps.value.value
  }
})

const optionsGetName = ref()

const changeGetName = (foundItem, key = mergedProps.value.value) => {
  optionsGetName.value = foundItem?.[key]
}

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
  const { primary, warning, info, danger, other, type, options, config, value } = mergedProps.value
  optionsGetName.value = undefined

  if (hasOptions.value && hasValue.value) {
    if (!isEmpty(config)) {
      const foundItem = options.find((obj) => value === obj[config.value || 'value'])
      if (foundItem) {
        optionsGetName.value = foundItem[config.label || 'label']
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
      for (const item of options) {
        for (const [type, items] of Object.entries(item)) {
          if (!Array.isArray(items)) continue
          const foundItem = items.find((obj) => Object.prototype.hasOwnProperty.call(obj, value))
          if (foundItem) {
            changeGetName(foundItem, value)
            return type
          }
        }
      }
      return other
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
