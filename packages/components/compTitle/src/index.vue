<script setup lang="ts">
import type { SybzComponentTheme } from '../../../types/component-props'
import { useAttrs, computed } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'

defineOptions({
  name: 'SCompTitle',
})
const attrs = useAttrs()

interface CompTitleProps {
  title?: string
  required?: boolean
  type?: 'input' | 'label'
  compTitleStyle?: Record<string, any>
  theme?: SybzComponentTheme
}

const props = withDefaults(defineProps<CompTitleProps>(), {
  title: '',
  required: false,
  type: 'input',
  compTitleStyle: undefined,
  theme: 'default',
})
const mergedProps = useGlobalComponentConfig('compTitle', props)
const { style } = useStyleProps()

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
    's-comp-title--label': mergedProps.value.type === 'label',
    's-comp-title--chenghua': mergedProps.value.type === 'input' && mergedProps.value.theme === 'chenghua',
    's-comp-title--shijingshan': mergedProps.value.type === 'input' && mergedProps.value.theme === 'shijingshan',
    's-comp-title--sybz': mergedProps.value.type === 'input' && mergedProps.value.theme === 'sybz',
  },
])
</script>

<template>
  <component
    :is="mergedProps.type === 'label' ? 'span' : 'div'"
    v-if="mergedProps.title"
    class="s-comp-title"
    :class="compTitleClass"
    :style="[{ ...computedBoxStyle }, style]"
    v-bind="$attrs"
  >
    <span v-if="mergedProps.required" class="s-comp-title__required" aria-hidden="true">*</span>
    {{ mergedProps.title }}
  </component>
</template>

<style lang="scss" scoped>
.s-comp-title {
  background: var(--el-fill-color-light);
  vertical-align: middle;
  position: relative;
  border: 1px solid var(--el-border-color);
  box-sizing: border-box !important;
  border-right: 0 none;
  padding: 0 8px;
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
.s-comp-title__required {
  margin-right: 3px;
  color: var(--el-color-danger);
  font-size: 14px;
  line-height: 1;
}
.s-comp-title--label {
  align-self: center;
  flex: none;
  min-height: 0;
  padding: 0;
  margin-right: 12px;
  border: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  font-weight: 500;
  line-height: 1.5 !important;
}
</style>
