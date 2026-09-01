<script setup lang="ts">
/**
 <s-capacity-progress :total="row.totalSpace" :used="row.usedSpace">
    {{ proxy.formatBytes(row.usedSpace) }} / {{ proxy.formatBytes(row.totalSpace) }}
  </s-capacity-progress>
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { delay, formatBytes, getType } from '@sybz-components/utils'
import useCommonProps from '@/hooks/useCommonProps'
import type { SCommonProps } from '@/types/component-props'

defineOptions({
  name: 'SCapacityProgress',
})

const progressBoxRef = ref(null)
const percentageRef = ref(null)
const showRight = ref(true)
interface CapacityProgressProps extends SCommonProps {
  total: string | number
  used: string | number
  iconAttrs?: Record<string, any>
  options?: Record<string, any[]>[]
  warning?: string | number | any[]
  primary?: string | number | any[]
  danger?: string | number | any[]
  info?: string | number | any[]
  value?: string | number
  content: string | number
  other?: string
  type?: string
  customColor?: boolean
}

const props = withDefaults(defineProps<CapacityProgressProps>(), {
  iconAttrs: () => ({}),
  width: undefined,
  height: undefined,
  color: '',
  hoverAnimation: false,
  options: () => [],
  warning: undefined,
  primary: undefined,
  danger: undefined,
  info: undefined,
  value: undefined,
  other: 'primary',
  type: undefined,
  customColor: false,
})
const { commonClass, commonStyle } = useCommonProps(props)
function format() {
  if (percentage.value < 0) {
    return '?%'
  }
  return `${percentage.value}%`
}
function parseSpace(space) {
  if (!space) {
    return '0.00B'
  }
  if (space < 0) {
    return '?'
  }
  return formatBytes(space ?? 0)
}
const percentage = computed(() => {
  const used = Number(props.used) || 0
  const total = Number(props.total) || 0
  let divideNum = (used / total) * 100 || 0
  if (isNaN(divideNum)) {
    return 0
  }
  let percentRes = Number(divideNum.toFixed(2))
  return percentRes
})

const optionsGetName = ref()
const changeGetName = (foundItem) => {
  optionsGetName.value = foundItem[props.value]
}

const parseType = computed(() => {
  if (props.options.length > 0 && props.value) {
    for (const item of props.options) {
      // 遍历 item 的所有键值对（而不是只取第一个）
      for (const [type, items] of Object.entries(item)) {
        const foundItem = items.find((obj) => props.value in obj)
        if (foundItem) {
          changeGetName(foundItem)
          return type
        } else {
          return null
        }
      }
    }
    return null
  }

  const { primary, warning, info, danger, content, other, type } = props
  if (type) {
    return type
  }

  // 先检查是否是数组，确保统一处理
  const getMatchType = (types, type) => {
    const normalizedTypes = Array.isArray(types) ? types : [types]
    if (getType(types) === 'array') {
      return normalizedTypes.includes(content || props.value) ? type : null
    } else if (getType(types) === 'boolean') {
      return types === true ? type : null
    } else {
      return null
    }
  }

  return (
    getMatchType(primary, 'primary') ||
    getMatchType(info, 'info') ||
    getMatchType(warning, 'warning') ||
    getMatchType(danger, 'danger') ||
    other // 默认返回值
  )
})

const setColorByType = (pType) => {
  if (pType === 'primary') {
    return 'var(--s-capacity-progress-fill)'
  } else if (pType === 'info') {
    return 'var(--el-color-info)'
  } else if (pType === 'warning') {
    return 'var(--el-color-warning)'
  } else if (pType === 'danger') {
    return 'var(--s-capacity-progress-overflow-fill)'
  } else {
    return 'var(--s-capacity-progress-fill)'
  }
}
function formatColor(value) {
  if (value < 100) {
    if (props.customColor) {
      return setColorByType(parseType.value)
    }
    return 'var(--s-capacity-progress-fill)'
  } else {
    return 'var(--s-capacity-progress-overflow-fill)'
  }
}

const adaptiveWidth = async () => {
  await delay()
  if (!progressBoxRef.value?.$el?.offsetWidth) {
    showRight.value = true
  }
  if (progressBoxRef.value.$el.offsetWidth > 174) {
    showRight.value = true
  } else {
    showRight.value = false
  }
  if (progressBoxRef.value && progressBoxRef.value?.$el?.offsetWidth) {
    let width = `${progressBoxRef.value.$el.offsetWidth - 16}px`
    percentageRef.value.style.width = width
    return { width: width }
  } else {
    return { width: '200px' }
  }
}

const handleTooltip = computed(() => {
  if (!showRight.value) {
    return `${format()} ${parseSpace(props.used)}/${parseSpace(props.total)}`
  } else {
    return ''
  }
})

onMounted(() => {
  window.addEventListener('resize', adaptiveWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', adaptiveWidth)
})
</script>

<template>
  <div class="s-capacity-progress" :class="commonClass" :style="commonStyle">
    <s-progress
      ref="progressBoxRef"
      class="progress-box"
      :class="{ 'prgress-less-zero': Number(used) < 0 }"
      :percentage="percentage"
      type="line"
      :stroke-width="20"
      text-inside
      :format="format"
      :color="formatColor"
      v-bind="$attrs"
    >
      <template #default>
        <el-tooltip :content="handleTooltip" :disabled="showRight">
          <div ref="percentageRef" class="s-capacity-progress__value-row" :style="{ ...adaptiveWidth() }">
            <div class="percentage-value s-capacity-progress__percentage">{{ format() }}</div>
            <div class="">
              <slot>
                <span v-if="showRight">{{ parseSpace(props.used) }}/{{ parseSpace(props.total) }}</span>
              </slot>
            </div>
          </div>
        </el-tooltip>
      </template>
    </s-progress>
    <s-icon
      v-if="percentage > 100"
      icon="warning"
      content="已用容量远超总容量, 请扩容 "
      class="s-capacity-progress__warning"
      v-bind="iconAttrs"
    />
  </div>
</template>

<style lang="scss" scoped>
.s-capacity-progress {
  display: flex;
  align-items: center;
  width: 100%;
}

.s-capacity-progress__value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.s-capacity-progress__percentage {
  margin-right: 8px;
}

.s-capacity-progress__warning {
  margin-left: 8px;
}

.progress-box :deep(.el-progress-bar__outer) {
  width: 100%;
  background: var(--s-capacity-progress-track-bg);
}
.progress-box.prgress-less-zero :deep(.el-progress-bar__outer) {
  width: 100%;
  background: var(--s-capacity-progress-track-bg-negative);
}
</style>
