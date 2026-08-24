<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { processWidth } from '@sybz-components/utils'
import group_null from '@/assets/images/group_null.png'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SEmpty',
  inheritAttrs: false,
})
const props = withDefaults(
  defineProps<{
    title?: string
    subTitle?: string
    theme?: 'default' | 'chenghua' | 'shijingshan'
    width?: string | number
    height?: string | number
    imgAttrs?: Record<string, any>
    src?: string
  }>(),
  {
    title: '暂无数据',
    subTitle: undefined,
    theme: 'default',
    width: 60,
    height: undefined,
    imgAttrs: () => ({}),
    src: group_null,
  },
)
const attrs = useAttrs()
const mergedProps = useGlobalComponentConfig('empty', props)
const emptyBindProps = computed(() => {
  const {
    description: _description,
    title: _title,
    subTitle: _subTitle,
    theme: _theme,
    width: _width,
    height: _height,
    imgAttrs: _imgAttrs,
    src: _src,
    ...globalProps
  } = mergedProps.value as typeof mergedProps.value & { description?: unknown }
  const { description: _attrDescription, ...forwardedAttrs } = attrs
  return { ...forwardedAttrs, ...globalProps }
})
const emptyClass = computed(() => ({
  's-empty--chenghua': mergedProps.value.theme === 'chenghua',
  's-empty--shijingshan': mergedProps.value.theme === 'shijingshan',
}))
/** @使用方式
<s-empty title="您没有消费订单" sub-title="请调整筛选条件后重试" width="48"></s-empty>
<s-empty class="w-block" src="https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg" width="200" ></s-empty>
*/
</script>

<template>
  <el-empty v-bind="emptyBindProps" class="s-empty" :class="emptyClass">
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
      <div class="s-empty__content">
        <div v-if="$slots.title || mergedProps.title" class="s-empty__title">
          <slot name="title">{{ mergedProps.title }}</slot>
        </div>
        <div v-if="$slots['sub-title'] || mergedProps.subTitle" class="s-empty__sub-title">
          <slot name="sub-title">{{ mergedProps.subTitle }}</slot>
        </div>
        <div v-if="$slots.default" class="s-empty__default">
          <slot></slot>
        </div>
      </div>
    </template>
  </el-empty>
</template>

<style scoped lang="scss">
:deep(.el-empty) {
  height: 100%;
}
:deep(.el-empty__description) {
  color: var(--65);
  width: 100%;
  text-align: center;
}
:deep(.el-empty__image) {
  width: unset;
}
.s-empty__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 12px;
  text-align: center;
}
.s-empty__title,
.s-empty__sub-title,
.s-empty__default {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
}
.s-empty__title {
  color: var(--85);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
}
.s-empty__sub-title {
  color: var(--65);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}
</style>
