<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({ name: 'SItem' })

type ItemAlign = 'start' | 'center' | 'end' | 'stretch'
type ItemExtraPlacement = 'header' | 'side' | 'bottom'
type ItemStyleKey =
  | 'root'
  | 'row'
  | 'main'
  | 'prefix'
  | 'content'
  | 'header'
  | 'title'
  | 'subTitle'
  | 'body'
  | 'extra'
  | 'actions'

interface ItemProps {
  title?: string | number
  subTitle?: string | number
  extra?: string | number
  src?: string
  width?: string | number
  height?: string | number
  size?: 'small' | 'default' | 'large' | string | number
  padding?: string | number
  gap?: string | number
  contentGap?: string | number
  align?: ItemAlign
  /** CSS background，支持纯色、渐变及其他合法背景值 */
  background?: string
  hoverBackground?: string
  border?: boolean | string
  borderRadius?: string | number
  divider?: boolean
  titleLines?: number
  subTitleLines?: number
  extraPlacement?: ItemExtraPlacement
  extraAlign?: ItemAlign
  styles?: Partial<Record<ItemStyleKey, CSSProperties>>
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
  gap: 12,
  contentGap: 4,
  align: 'center',
  background: '',
  hoverBackground: '',
  border: true,
  borderRadius: '',
  divider: false,
  titleLines: 1,
  subTitleLines: 1,
  extraPlacement: 'header',
  extraAlign: 'center',
  styles: undefined,
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

const hasValue = (value: unknown) => value !== undefined && value !== null && value !== ''
const normalizeLines = (value: number) => {
  const lines = Number(value)
  if (!Number.isFinite(lines)) return 1
  return Math.max(0, Math.floor(lines))
}
const cssSize = (value: string | number | undefined) => {
  if (value === undefined || value === '') return ''
  if (typeof value === 'number' || !Number.isNaN(Number(value))) return `${value}px`
  return String(value)
}
const alignValue = (value: ItemAlign) => {
  if (value === 'start') return 'flex-start'
  if (value === 'end') return 'flex-end'
  return value
}

const title = computed(() => props.title ?? '')
const subTitle = computed(() => props.subTitle ?? '')
const normalizedTitleLines = computed(() => normalizeLines(props.titleLines))
const normalizedSubTitleLines = computed(() => normalizeLines(props.subTitleLines))
const hasPrefix = computed(() => !!(slots.prefix || slots.img || props.src))
const hasTitle = computed(() => !!slots.title || hasValue(props.title))
const hasSubTitle = computed(() => !!slots.subTitle || hasValue(props.subTitle))
const hasExtra = computed(() => !!slots.extra || !!slots.actions || hasValue(props.extra))
const hasHeader = computed(() => hasTitle.value || (props.extraPlacement === 'header' && hasExtra.value))
const hasMainContent = computed(
  () => hasTitle.value || hasSubTitle.value || !!slots.default || props.extraPlacement === 'header',
)

const paddingValue = computed(() => {
  if (props.padding !== undefined) return cssSize(props.padding)
  if (props.size === 'small') return '8px'
  if (props.size === 'large') return '24px'
  if (props.size === 'default' || props.size === '') return '16px'
  return cssSize(props.size) || '16px'
})

const rootStyle = computed<CSSProperties>(() => {
  const style: CSSProperties & Record<string, string | number | undefined> = {
    width: props.width ? cssSize(props.width) : undefined,
    height: props.height ? cssSize(props.height) : undefined,
    background: props.background || undefined,
    borderRadius: props.borderRadius ? cssSize(props.borderRadius) : undefined,
    '--s-item-padding': paddingValue.value,
    '--s-item-gap': cssSize(props.gap),
    '--s-item-content-gap': cssSize(props.contentGap),
    '--s-item-align': alignValue(props.align),
    '--s-item-extra-align': alignValue(props.extraAlign),
    '--s-item-hover-background': props.hoverBackground || props.background || undefined,
  }

  if (props.border === true) {
    style.border = '1px solid var(--s-item-border, var(--el-border-color-light))'
  } else if (props.border === false) style.border = 'none'
  else if (typeof props.border === 'string') style.border = props.border

  return { ...style, ...props.styles?.root }
})

const handleDisabledClick = (event: MouseEvent) => {
  if (!props.disabled) return
  event.preventDefault()
  event.stopPropagation()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || event.target !== event.currentTarget) return
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  const element = event.currentTarget as HTMLElement
  element.click()
}
</script>

<template>
  <div
    class="s-item"
    :class="{
      'is-clickable': clickable,
      'is-disabled': disabled,
      'has-divider': divider,
      's-item--chenghua': theme === 'chenghua',
      's-item--shijingshan': theme === 'shijingshan',
      's-item--shadow-always': shadow === 'always',
      's-item--shadow-hover': shadow === 'hover',
      's-item--hover-animation': hoverAnimation,
    }"
    :style="rootStyle"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable && !disabled ? 0 : undefined"
    :aria-disabled="disabled || undefined"
    @click.capture="handleDisabledClick"
    @click="!disabled && $emit('click', $event)"
    @keydown="handleKeydown"
  >
    <div class="s-item__row" :style="styles?.row">
      <div class="s-item__main" :style="styles?.main">
        <div v-if="hasPrefix" class="s-item__prefix" :style="styles?.prefix">
          <slot name="prefix">
            <slot name="img"><img v-if="src" :src="src" alt="" /></slot>
          </slot>
        </div>

        <div v-if="hasMainContent" class="s-item__content" :style="styles?.content">
          <div v-if="hasHeader" class="s-item__header" :style="styles?.header">
            <s-tooltip
              v-if="hasValue(title) && !$slots.title && normalizedTitleLines > 0"
              class="s-item__title"
              :style="styles?.title"
              :content="String(title)"
              :line-clamp="normalizedTitleLines"
              width="100%"
              placement="top-start"
            />
            <div
              v-else-if="$slots.title || hasValue(title)"
              class="s-item__title"
              :class="{ 'is-clamped': normalizedTitleLines > 0 }"
              :style="[{ '--s-item-line-clamp': normalizedTitleLines } as any, styles?.title]"
            >
              <slot name="title">{{ title }}</slot>
            </div>

            <div
              v-if="extraPlacement === 'header' && hasExtra"
              class="s-item__extra s-item__extra--header"
              :style="styles?.extra"
            >
              <slot name="extra">{{ extra }}</slot>
              <div v-if="$slots.actions" class="s-item__actions" :style="styles?.actions">
                <slot name="actions"></slot>
              </div>
            </div>
          </div>

          <s-tooltip
            v-if="hasValue(subTitle) && !$slots.subTitle && normalizedSubTitleLines > 0"
            class="s-item__subtitle"
            :style="styles?.subTitle"
            :content="String(subTitle)"
            :line-clamp="normalizedSubTitleLines"
            width="100%"
            placement="top-start"
          />
          <div
            v-else-if="$slots.subTitle || hasValue(subTitle)"
            class="s-item__subtitle"
            :class="{ 'is-clamped': normalizedSubTitleLines > 0 }"
            :style="[{ '--s-item-line-clamp': normalizedSubTitleLines } as any, styles?.subTitle]"
          >
            <slot name="subTitle">{{ subTitle }}</slot>
          </div>

          <div v-if="$slots.default" class="s-item__body" :style="styles?.body">
            <slot></slot>
          </div>
        </div>
      </div>

      <div
        v-if="extraPlacement === 'side' && hasExtra"
        class="s-item__extra s-item__extra--side"
        :style="styles?.extra"
      >
        <slot name="extra">{{ extra }}</slot>
        <div v-if="$slots.actions" class="s-item__actions" :style="styles?.actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <div
      v-if="extraPlacement === 'bottom' && hasExtra"
      class="s-item__extra s-item__extra--bottom"
      :style="styles?.extra"
    >
      <slot name="extra">{{ extra }}</slot>
      <div v-if="$slots.actions" class="s-item__actions" :style="styles?.actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../styles/themes/shared/item.scss';
</style>
