<script setup lang="ts">
import { computed, ref } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SSwitch',
})

interface SwitchProps {
  theme?: '' | 'chenghua' | 'shijingshan'
  beforeChange?: (...args: any[]) => any
  width?: string | number
}

const props = withDefaults(defineProps<SwitchProps>(), {
  theme: '',
  beforeChange: undefined,
  width: '',
})
const mergedProps = useGlobalComponentConfig('switch', props)

const loading = ref(false) // 内部管理 loading 状态
//✅ 封装 beforeChange，自动管理 loadingconst
const beforeChangeHandler = async () => {
  if (!mergedProps.value.beforeChange) return true // 如果没有 beforeChange，直接允许切换
  try {
    loading.value = true
    await mergedProps.value.beforeChange() // 等待 Promise 完成
    return true // 允许切换
  } catch {
    return false // 阻止切换
  } finally {
    loading.value = false // 无论成功失败，都关闭 loading
  }
}

const handleWidth = computed(() => {
  if (!mergedProps.value.width) {
    return 'unset'
  }
  let inputWidth = processWidth(mergedProps.value.width, true)
  return inputWidth
})

const switchClass = computed(() => ({
  's-switch--chenghua': mergedProps.value.theme === 'chenghua',
  's-switch--shijingshan': mergedProps.value.theme === 'shijingshan',
}))
</script>

<template>
  <el-switch
    v-bind="{ 'inline-prompt': true, ...$attrs }"
    class="s-custom-switch"
    :class="switchClass"
    :loading="loading"
    :before-change="beforeChangeHandler"
    :style="{ '--switch-width': handleWidth }"
  />
</template>

<style lang="scss" scoped>
.s-custom-switch {
  flex-direction: row-reverse; /* 反转子元素的顺序 */
  align-items: center;
  margin-right: 8px;
  :deep(.el-switch__label--right) {
    order: 1; /* 将active-text放在左边 */
    margin-right: 8px;
    margin-left: 0;
    font-weight: 900;
  }
  :deep(.el-switch__label--left) {
    margin-left: 8px;
    margin-right: 0;
    font-weight: 900;
  }
  :deep(.el-switch__core) {
    width: var(--switch-width) !important;
  }
}
</style>
