<template>
  <div :class="$attrs.class" :style="containerStyle">
    <el-config-provider v-bind="elementProps">
      <template #default="{ config }">
        <slot :config="config" />
      </template>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  provide,
  unref,
  useAttrs,
  type ComputedRef,
  type PropType,
  type StyleValue,
} from 'vue'
import { ElConfigProvider, configProviderProps } from 'element-plus'
import type { SybzComponentTheme } from '../../../types/component-props'
import { componentKeys, componentProps } from './props'
import { useStyleProps } from '@/hooks/useStyleProps'
import { GLOBAL_COMPONENT_COMMON_PROPS_KEY, GLOBAL_COMPONENT_CONFIG_KEY } from '@/hooks/useGlobalComponentConfig'

defineOptions({ name: 'SConfigProvider', inheritAttrs: false })

const props = defineProps({
  ...configProviderProps,
  ...componentProps,
  theme: { type: String as PropType<SybzComponentTheme> },
  clearable: { type: Boolean, default: undefined },
  disabled: { type: Boolean, default: undefined },
})

const instance = getCurrentInstance()
const attrs = useAttrs()
const { style } = useStyleProps()
const containerStyle = computed<StyleValue>(() => [attrs.style as StyleValue, style.value])
const parent = inject<Record<string, Record<string, unknown>> | ComputedRef<Record<string, Record<string, unknown>>>>(
  GLOBAL_COMPONENT_CONFIG_KEY,
  {},
)
const elementProps = computed(() =>
  Object.fromEntries(
    Object.keys(configProviderProps).map((key) => [key, props[key as keyof typeof configProviderProps]]),
  ),
)
const scopedConfig = computed(() => {
  const inherited = unref(parent)
  const raw = instance?.vnode.props ?? {}
  const result = { ...inherited }
  const commonProps = { ...inherited[GLOBAL_COMPONENT_COMMON_PROPS_KEY] }

  for (const key of ['size', 'theme', 'clearable', 'disabled'] as const) {
    if (Object.prototype.hasOwnProperty.call(raw, key)) commonProps[key] = props[key]
  }
  if (Object.keys(commonProps).length) result[GLOBAL_COMPONENT_COMMON_PROPS_KEY] = commonProps

  for (const key of componentKeys) {
    const local = props[key] as Record<string, unknown> | undefined
    if (local) result[key] = { ...inherited[key], ...local }
  }
  return result
})

provide(GLOBAL_COMPONENT_CONFIG_KEY, scopedConfig)
</script>
