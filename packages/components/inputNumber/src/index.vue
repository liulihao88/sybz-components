<template>
  <div class="s-input-number" v-bind="mergedProps.subAttrs" :style="[inputNumberStyle, attrs.style]" :class="inputNumberClass">
    <s-comp-title
      v-if="mergedProps.title"
      :title="mergedProps.title"
      :size="mergedProps.size"
      :boxStyle="mergedProps.boxStyle"
      :theme="mergedProps.theme"
    />
    <el-input-number class="s-input-number__inner" v-bind="mergedAttrs">
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </el-input-number>
  </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SInputNumber',
  inheritAttrs: false,
})

const attrs = useAttrs()

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: Object,
    default: () => ({}),
  },
  width: {
    type: [String, Number],
    default: '',
  },
  height: {
    type: [String, Number],
    default: '',
  },
  theme: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'chenghua'].includes(value),
  },
  size: {
    type: String,
    default: '',
    validator: (value: string) => ['', 'large', 'default', 'small'].includes(value),
  },
  subAttrs: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
const mergedProps = useGlobalComponentConfig('inputNumber', props)

const inputNumberClass = computed(() => [
  attrs.class,
  {
    's-input-number--chenghua': mergedProps.value.theme === 'chenghua',
    'has-title': !!mergedProps.value.title,
  },
])

const mergedAttrs = computed(() => {
  const baseAttrs = {
    'controls-position': 'right',
    size: mergedProps.value.size || undefined,
  }

  return Object.entries(attrs).reduce((obj, [key, value]) => {
    if (key !== 'class' && key !== 'style') {
      obj[key] = value
    }
    return obj
  }, baseAttrs)
})

const inputNumberStyle = computed(() => {
  const style: Record<string, any> = {}

  if (mergedProps.value.width) {
    style.width = processWidth(mergedProps.value.width, true)
  }

  if (mergedProps.value.height) {
    const inputNumberHeight = processWidth(mergedProps.value.height, true)
    style.height = inputNumberHeight
    style['--s-input-number-height'] = inputNumberHeight
    style['--s-input-number-controls-height'] = `calc((${inputNumberHeight} - 2px) / 2)`
    style['--el-input-height'] = inputNumberHeight
  }

  return style
})
</script>

<style scoped lang="scss">
.s-input-number {
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;

  .s-input-number__inner {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
  }

  :deep(.el-input-number .el-input),
  :deep(.el-input-number .el-input__wrapper) {
    height: 100%;
    min-height: var(--s-input-number-height, var(--el-input-height, 32px));
  }

  :deep(.el-input-number.is-controls-right .el-input-number__decrease),
  :deep(.el-input-number.is-controls-right .el-input-number__increase) {
    height: var(--s-input-number-controls-height, var(--el-input-number-controls-height));
    line-height: var(--s-input-number-controls-height, var(--el-input-number-controls-height));
  }

  .s-comp-title + :deep(.el-input-number .el-input__wrapper),
  .s-comp-title + :deep(.el-input-number .el-input-number__decrease) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
