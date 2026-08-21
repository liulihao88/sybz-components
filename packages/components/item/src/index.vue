<script setup lang="ts">
import { computed, useSlots } from 'vue'
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
  shadow?: 'always' | 'never' | 'hover'
  hoverAnimation?: boolean
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
  shadow: 'never',
  hoverAnimation: false,
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
      's-item--shadow-always': shadow === 'always',
      's-item--shadow-hover': shadow === 'hover',
      's-item--hover-animation': hoverAnimation,
    }"
    :style="{
      padding: paddingValue,
      ...processWidth(width),
      ...(height ? { height: processWidth(height, true) } : {}),
    }"
    @click="!disabled && $emit('click', $event)"
  >
    <div v-if="hasPrefix" class="s-item__prefix">
      <slot name="prefix">
        <slot name="img"><img v-if="src" :src="src" alt="" /></slot>
      </slot>
    </div>
    <div class="s-item__content">
      <div v-if="title || $slots.title || extra || $slots.extra || $slots.actions" class="s-item__header">
        <s-tooltip
          v-if="title && !$slots.title"
          class="s-item__title"
          :content="String(title)"
          width="100%"
          placement="top-start"
        />
        <div v-else-if="$slots.title" class="s-item__title">
          <slot name="title"></slot>
        </div>
        <div v-if="extra || $slots.extra || $slots.actions" class="s-item__extra">
          <slot name="extra">{{ extra }}</slot>
          <slot name="actions"></slot>
        </div>
      </div>
      <s-tooltip
        v-if="subTitle && !$slots.subTitle"
        class="s-item__subtitle"
        :content="String(subTitle)"
        width="100%"
        placement="top-start"
      />
      <div v-else-if="$slots.subTitle" class="s-item__subtitle">
        <slot name="subTitle"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
@import '../../../styles/themes/shared/item.scss';
</style>
