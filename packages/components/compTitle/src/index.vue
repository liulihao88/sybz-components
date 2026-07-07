<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SCompTitle',
})
const attrs = useAttrs()

interface CompTitleProps {
  title?: string
  compTitleStyle?: Record<string, any>
  theme?: '' | 'chenghua' | 'shijingshan'
}

const props = withDefaults(defineProps<CompTitleProps>(), {
  title: '',
  compTitleStyle: undefined,
  theme: '',
})
const mergedProps = useGlobalComponentConfig('compTitle', props)

const resolvedCompTitleStyle = computed(() => mergedProps.value.compTitleStyle ?? {})

const computedBoxStyle = computed(() => {
  if (resolvedCompTitleStyle.value.width) {
    return {
      ...resolvedCompTitleStyle.value,
      width: processWidth(resolvedCompTitleStyle.value.width, true),
    }
  } else {
    return resolvedCompTitleStyle.value
  }
})

const sizeClass = computed(() => {
  return attrs.size ? `el-input--${attrs.size}` : 's-comp-title__base-size'
})
const compTitleClass = computed(() => [
  sizeClass.value,
  {
    's-comp-title--chenghua': mergedProps.value.theme === 'chenghua',
    's-comp-title--shijingshan': mergedProps.value.theme === 'shijingshan',
  },
])
</script>

<template>
  <div
    v-if="mergedProps.title"
    class="s-comp-title"
    :class="compTitleClass"
    :style="{ ...computedBoxStyle }"
    v-bind="$attrs"
  >
    {{ mergedProps.title }}
  </div>
</template>

<style lang="scss" scoped>
.s-comp-title {
  background: var(--el-fill-color-light);
  vertical-align: middle;
  position: relative;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box !important;
  border-right: 0 none;
  padding: 0 4px;
  white-space: nowrap;
  border-radius: 2px 0 0 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--el-input-height, 32px);
  line-height: 100% !important;
  color: var(--el-color-info);
  font-size: 14px;
}
.s-comp-title + :deep(.el-input__wrapper) {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.s-comp-title__base-size {
  font-size: 14px;
}
</style>
