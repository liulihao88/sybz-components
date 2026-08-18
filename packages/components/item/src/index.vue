<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useSlots } from 'vue'
import { processWidth } from '@sybz-components/utils'
defineOptions({ name: 'SItem' })
interface ItemProps {
  title?: string | number
  subTitle?: string | number
  extra?: string | number
  src?: string
  width?: string | number
  height?: string | number
  size?: 'small' | 'default' | 'large' | string | number
  padding?: string | number
  clickable?: boolean
  disabled?: boolean
  theme?: 'default' | 'chenghua' | 'shijingshan'
  labelStyle?: Record<string, any>
  valueStyle?: Record<string, any>
  itemStyle?: Record<string, any>
  imgStyle?: Record<string, any>
  boxStyle?: Record<string, any>
}
const props = withDefaults(defineProps<ItemProps>(), {
  src: '',
  width: '',
  height: '',
  size: 'default',
  padding: undefined,
  clickable: false,
  disabled: false,
  theme: 'default',
  labelStyle: () => ({}),
  valueStyle: () => ({}),
  itemStyle: () => ({}),
  imgStyle: () => ({}),
  boxStyle: () => ({}),
})
const slots = useSlots()
defineEmits<{ click: [event: MouseEvent] }>()
defineSlots<{
  prefix?: () => any
  img?: () => any
  title?: () => any
  subTitle?: () => any
  extra?: () => any
  actions?: () => any
  default?: () => any
}>()
const title = computed(() => props.title ?? '')
const subTitle = computed(() => props.subTitle ?? '')
const titleRef = ref<HTMLElement>()
const subTitleRef = ref<HTMLElement>()
const titleOverflow = ref(false)
const subTitleOverflow = ref(false)
const measureOverflow = () => {
  titleOverflow.value = !!titleRef.value && titleRef.value.scrollWidth > titleRef.value.clientWidth
  subTitleOverflow.value = !!subTitleRef.value && subTitleRef.value.scrollWidth > subTitleRef.value.clientWidth
}
onMounted(() =>
  nextTick(() => {
    measureOverflow()
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(measureOverflow)
      if (titleRef.value) observer.observe(titleRef.value)
      if (subTitleRef.value) observer.observe(subTitleRef.value)
    }
  }),
)
const paddingValue = computed(() => {
  if (props.padding !== undefined) return processWidth(props.padding, true)
  if (props.size === 'small') return '8px'
  if (props.size === 'large') return '24px'
  if (props.size === 'default' || props.size === '') return '16px'
  return processWidth(props.size, true) || '16px'
})
const hasPrefix = computed(() => !!(slots.prefix || slots.img || props.src))
</script>
<template>
  <div
    class="s-item"
    :class="{
      'is-clickable': clickable,
      'is-disabled': disabled,
      's-item--chenghua': theme === 'chenghua',
      's-item--shijingshan': theme === 'shijingshan',
    }"
    :style="{
      padding: paddingValue,
      ...processWidth(width),
      ...(height ? { height: processWidth(height, true) } : {}),
      ...boxStyle,
    }"
    @click="!disabled && $emit('click', $event)"
  >
    <div v-if="hasPrefix" class="s-item__prefix" :style="imgStyle">
      <slot name="prefix">
        <slot name="img"><img v-if="src" :src="src" alt="" /></slot>
      </slot>
    </div>
    <div class="s-item__content" :style="itemStyle">
      <s-tooltip
        v-if="title || $slots.title"
        class="s-item__title"
        :style="labelStyle"
        :disabled="!titleOverflow"
        placement="top-start"
      >
        <template #default>
          <span ref="titleRef">
            <slot name="title">{{ title }}</slot>
          </span>
        </template>
        <template #content>
          <slot name="title">{{ title }}</slot>
        </template>
      </s-tooltip>
      <s-tooltip
        v-if="subTitle || $slots.subTitle"
        class="s-item__subtitle"
        :style="valueStyle"
        :disabled="!subTitleOverflow"
        placement="top-start"
      >
        <template #default>
          <span ref="subTitleRef">
            <slot name="subTitle">{{ subTitle }}</slot>
          </span>
        </template>
        <template #content>
          <slot name="subTitle">{{ subTitle }}</slot>
        </template>
      </s-tooltip>
      <slot></slot>
    </div>
    <div v-if="extra || $slots.extra || $slots.actions" class="s-item__extra">
      <slot name="extra">{{ extra }}</slot>
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.s-item {
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  min-width: 0;
  color: var(--el-text-color-primary);
  background: var(--el-bg-color);
  border-radius: 4px;
}
.s-item.is-clickable {
  cursor: pointer;
  transition:
    background-color 0.2s,
    box-shadow 0.2s;
}
.s-item.is-clickable:hover {
  background: var(--el-fill-color-light);
}
.s-item.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.s-item__prefix {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.s-item__prefix img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.s-item__content {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}
.s-item__title,
.s-item__subtitle {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.s-item__title {
  font-weight: 600;
}
.s-item__subtitle {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.s-item__extra {
  flex: 0 0 auto;
  color: var(--el-text-color-secondary);
}
.s-item--chenghua {
  --s-item-bg: var(--s-ch-card-bg, #fff);
  --s-item-border: var(--s-ch-border-light, rgba(22, 93, 255, 0.14));
  --s-item-primary: var(--s-ch-primary, #165dff);
  --s-item-title: var(--s-ch-text-primary, #000);
  --s-item-subtitle: var(--s-ch-text-secondary, #979797);
  border: 1px solid var(--s-item-border);
  border-radius: var(--s-ch-radius-card, 12px);
  background: var(--s-item-bg);
  font-family: var(--s-ch-font-family, 'PingFang SC', sans-serif);
}
.s-item--chenghua .s-item__title {
  color: var(--s-item-title);
}
.s-item--chenghua.is-clickable:hover {
  border-color: var(--s-item-primary);
  box-shadow: 0 4px 12px rgba(22, 93, 255, 0.12);
}
.s-item--shijingshan {
  --s-item-bg: var(--s-sjs-card-bg, #fff);
  --s-item-border: var(--s-sjs-divider, #e5e7eb);
  --s-item-primary: var(--s-sjs-primary, #2a6df4);
  --s-item-title: var(--s-sjs-text-primary, #1e1e1e);
  --s-item-subtitle: var(--s-sjs-text-secondary, #6b7280);
  border: 1px solid var(--s-item-border);
  border-radius: var(--s-sjs-radius-card, 12px);
  background: var(--s-item-bg);
  font-family: var(--s-sjs-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
}
.s-item--shijingshan .s-item__title {
  color: var(--s-item-title);
}
.s-item--shijingshan .s-item__subtitle {
  color: var(--s-item-subtitle);
}
.s-item--shijingshan.is-clickable:hover {
  border-color: var(--s-item-primary);
  box-shadow: var(--s-sjs-shadow-soft, 0 2px 8px rgba(0, 0, 0, 0.05));
}
</style>
