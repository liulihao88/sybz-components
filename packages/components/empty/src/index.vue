<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { processWidth } from '@sybz-components/utils'
import group_null from '@/assets/images/group_null.png'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SEmpty',
})
// const props = defineProps({
//   description: {
//     type: String,
//     default: '暂无数据',
//   },
//   width: {
//     type: [String, Number],
//     default: 60,
//   },
//   height: {
//     type: [String, Number],
//   },
//   imgAttrs: {
//     type: Object,
//     default: () => {},
//   },
//   src: {
//     type: String,
//     default: () => {
//       return group_null
//     },
//   },
// })

const props = withDefaults(
  defineProps<{
    description?: string
    theme?: '' | 'chenghua'
    width?: string | number
    height?: string | number
    imgAttrs?: Record<string, any>
    src?: string
  }>(),
  {
    description: '暂无数据',
    theme: '',
    width: 60,
    src: group_null,
  },
)
const mergedProps = useGlobalComponentConfig('empty', props)
const emptyBindProps = computed(() => {
  const { theme: _theme, ...rest } = mergedProps.value
  return rest
})
const emptyClass = computed(() => ({
  's-empty--chenghua': mergedProps.value.theme === 'chenghua',
}))
/** @使用方式
<s-empty description="您没有消费订单" width="48"></s-empty>
<s-empty class="w-block" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" width="200" ></s-empty>
*/
</script>

<template>
  <el-empty v-bind="{ ...$attrs, ...emptyBindProps }" class="s-empty" :class="emptyClass">
    <template #image>
      <slot name="image">
        <img
          :src="mergedProps.src"
          :style="{
            width: processWidth(mergedProps.width, true),
            height: processWidth(mergedProps.height, true),
            ...mergedProps.imgAttrs,
          }"
        />
      </slot>
    </template>
    <template #description>
      <slot name="description">
        {{ mergedProps.description }}
      </slot>
    </template>
    <slot></slot>
  </el-empty>
</template>

<style scoped lang="scss">
:deep(.el-empty) {
  height: 100%;
}
:deep(.el-empty__description) {
  color: var(--65);
}
:deep(.el-empty__image) {
  width: unset;
}
</style>
