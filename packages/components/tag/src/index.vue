<script setup lang="ts">
defineOptions({
  name: 'STag',
})

import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { getType, isEmpty } from '@sybz-components/utils'
import { handleWidthHeight } from '@/components/utils/local.ts'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { SybzComponentSize, SybzComponentTheme, SWidthHeightProps } from '@/types/component-props'
type TagType = '' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
type TagRule = string | number | boolean | any[]

interface TagProps extends SWidthHeightProps {
  options?: Record<string, any>[]
  value?: string | number
  primary?: TagRule
  warning?: TagRule
  danger?: TagRule
  info?: TagRule
  other?: TagType
  type?: TagType
  theme?: SybzComponentTheme
  size?: SybzComponentSize
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
  size: 'default',
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
  's-tag': true,
  's-tag--chenghua': mergedProps.value.theme === 'chenghua',
  's-tag--shijingshan': mergedProps.value.theme === 'shijingshan',
}))

const textRef = ref<HTMLElement>()
const tooltipContent = ref('')
const isOverflow = ref(false)

const updateOverflow = () => {
  const text = textRef.value
  if (!text) return

  tooltipContent.value = text.textContent?.trim() ?? ''
  isOverflow.value = Boolean(tooltipContent.value) && text.scrollWidth > text.clientWidth
}

let resizeObserver: ResizeObserver | undefined

onMounted(() => {
  nextTick(() => {
    updateOverflow()
    if (typeof ResizeObserver === 'undefined' || !textRef.value) return
    resizeObserver = new ResizeObserver(updateOverflow)
    resizeObserver.observe(textRef.value)
  })
})
onUpdated(() => nextTick(updateOverflow))
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<template>
  <el-tag
    v-bind="$attrs"
    :type="parseType"
    :size="mergedProps.size || undefined"
    :class="tagClass"
    :style="handleWidthHeight(mergedProps)"
  >
    <s-tooltip :content="tooltipContent" :disabled="!isOverflow" :show-slot="false" placement="top">
      <template #trigger>
        <span ref="textRef" class="s-tag__text" @mouseenter="updateOverflow">
          <slot>
            {{ parseContent }}
          </slot>
        </span>
      </template>
    </s-tooltip>
  </el-tag>
</template>

<style scoped lang="scss">
.s-tag {
  max-width: 100%;
}

.s-tag :deep(.el-tag__content) {
  min-width: 0;
  overflow: hidden;
}

.s-tag__text {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
