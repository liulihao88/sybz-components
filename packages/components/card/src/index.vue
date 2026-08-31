<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SCard',
})
interface CardProps {
  modelValue?: boolean
  size?: 'default' | 'small' | 'large' | string | number
  height?: string | number
  title?: string
  hoverAnimation?: boolean
  shadow?: 'always' | 'never' | 'hover'
  boxStyle?: Record<string, any>
  headerStyle?: Record<string, any>
  bodyStyle?: Record<string, any>
  footerStyle?: Record<string, any>
  transparent?: boolean
  border?: boolean
  mergeSections?: boolean
  scroll?: boolean
  square?: boolean
  collapsible?: boolean
  collapseTrigger?: 'icon' | 'header'
  theme?: 'default' | 'chenghua' | 'shijingshan'
}

const props = withDefaults(defineProps<CardProps>(), {
  modelValue: false,
  size: 'default', // small large
  height: undefined,
  title: '',
  hoverAnimation: false,
  shadow: 'never',
  boxStyle: () => ({}),
  headerStyle: () => ({}),
  bodyStyle: () => ({}),
  footerStyle: () => ({}),
  transparent: false,
  border: true,
  mergeSections: false,
  scroll: true,
  square: false,
  collapsible: false,
  collapseTrigger: 'header',
  theme: 'default',
})
defineSlots<{
  default?: () => any
  header?: () => any
  footer?: () => any
  icon?: () => any
}>()
const mergedProps = useGlobalComponentConfig('card', props)

const emit = defineEmits(['update:modelValue'])

const boxRef = ref<HTMLDivElement | null>(null)
const headerRef = ref<HTMLDivElement | null>(null)
const isCollapsed = ref(false)

const boxMergedStyle = computed(() => {
  const transparentStyle = mergedProps.value.transparent
    ? {
        borderColor: 'transparent',
        background: 'transparent',
        boxShadow: 'none',
      }
    : {}

  const height = processWidth(mergedProps.value.height, true)

  return {
    ...transparentStyle,
    ...mergedProps.value.boxStyle,
    ...(height
      ? {
          height,
          overflow: 'hidden',
        }
      : {}),
    ...(mergedProps.value.square
      ? {
          display: 'inline-flex',
        }
      : {}),
  }
})

const headerMergedStyle = computed(() => {
  let noBorderStyle = {}
  if (!mergedProps.value.border || mergedProps.value.mergeSections) {
    noBorderStyle = {
      borderBottom: 'none',
      paddingBottom: 0,
    }
  }

  const transparentStyle = mergedProps.value.transparent
    ? {
        borderBottom: 'none',
        background: 'transparent',
      }
    : {}

  return {
    ...transparentStyle,
    ...noBorderStyle,
    ...mergedProps.value.headerStyle,
  }
})

const isHeaderTrigger = computed(() => {
  return mergedProps.value.collapsible && mergedProps.value.collapseTrigger === 'header'
})

const scrollStyle = computed(() => {
  if (mergedProps.value.scroll) {
    return {
      flex: 1,
      overflow: 'auto',
    }
  }
  return {}
})
const squareStyle = computed(() => {
  if (mergedProps.value.square && boxRef.value) {
    const boxWidth = boxRef.value.offsetWidth
    const boxHeight = (boxRef.value.offsetHeight ?? 0) - (headerRef.value?.offsetHeight ?? 0)
    const max = Math.max(boxWidth, boxHeight)

    return {
      width: `${max}px`,
      height: `${max}px`,
      flex: 'unset',
    }
  }

  return {}
})

const bodyMergedStyle = computed(() => {
  const transparentStyle = mergedProps.value.transparent
    ? {
        background: 'transparent',
      }
    : {}

  return {
    ...transparentStyle,
    ...mergedProps.value.bodyStyle,
    ...scrollStyle.value,
    ...squareStyle.value,
  }
})

const footerMergedStyle = computed(() => {
  const mergedSectionStyle = mergedProps.value.mergeSections
    ? {
        borderTop: 'none',
        paddingTop: 0,
      }
    : {}

  const transparentStyle = mergedProps.value.transparent
    ? {
        borderTop: 'none',
        background: 'transparent',
      }
    : {}

  return {
    ...transparentStyle,
    ...mergedSectionStyle,
    ...mergedProps.value.footerStyle,
  }
})

const compPadding = computed(() => {
  const { size } = mergedProps.value
  if (size === 'large') return '24px'
  if (size === 'small') return '8px'
  if (size === 'default' || size === '') return '16px'
  return processWidth(size, true) || '16px'
})

const cardClass = computed(() => ({
  's-card--chenghua': mergedProps.value.theme === 'chenghua',
  's-card--shijingshan': mergedProps.value.theme === 'shijingshan',
  's-card--transparent': mergedProps.value.transparent,
  's-card--hover-animation': mergedProps.value.hoverAnimation,
  's-card--shadow-always': mergedProps.value.shadow === 'always',
  's-card--shadow-hover': mergedProps.value.shadow === 'hover',
  'is-collapsed': isCollapsed.value,
  'is-collapsible': mergedProps.value.collapsible,
}))

watch(
  () => props.modelValue,
  (value) => {
    isCollapsed.value = value
  },
  {
    immediate: true,
  },
)

const toggleCollapse = () => {
  if (!mergedProps.value.collapsible) {
    return
  }

  const nextValue = !isCollapsed.value
  isCollapsed.value = nextValue
  emit('update:modelValue', nextValue)
}

const handleHeaderClick = () => {
  if (isHeaderTrigger.value) {
    toggleCollapse()
  }
}

const handleIconClick = (event) => {
  event.stopPropagation()
  toggleCollapse()
}
</script>

<template>
  <div ref="boxRef" class="s-card" :class="cardClass" :style="boxMergedStyle">
    <div
      v-if="$slots.header || mergedProps.title"
      ref="headerRef"
      class="s-card__header"
      :style="headerMergedStyle"
      :class="{ collapsible: isHeaderTrigger }"
      @click="handleHeaderClick"
    >
      <div class="s-card__header-main">
        <slot name="header">
          <s-title
            :title="mergedProps.title"
            :theme="mergedProps.theme"
            :style="{ ...mergedProps.headerStyle }"
          ></s-title>
        </slot>
      </div>
      <span
        v-if="mergedProps.collapsible"
        class="collapse-arrow"
        :class="{ collapsed: isCollapsed }"
        @click="handleIconClick"
      >
        <slot name="icon">
          <s-icon name="arrow-down"></s-icon>
        </slot>
      </span>
    </div>
    <div v-show="!isCollapsed" class="s-card__body" :style="bodyMergedStyle">
      <slot></slot>
    </div>
    <div v-if="$slots.footer && !isCollapsed" class="s-card__footer" :style="footerMergedStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-card {
  position: relative;
  top: 0;
  background: var(--el-bg-color);
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.2s ease,
    top 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &--shadow-always {
    box-shadow: var(--s-card-shadow, var(--el-box-shadow-light));
  }

  &--shadow-hover:hover {
    box-shadow: var(--s-card-shadow, var(--el-box-shadow-light));
  }

  &--hover-animation:hover {
    top: -2px;
  }

  &--transparent {
    border-color: transparent;
    background: transparent;
    box-shadow: none;

    > .s-card__header,
    > .s-card__body,
    > .s-card__footer {
      background: transparent;
    }

    > .s-card__header {
      border-bottom-color: transparent;
    }

    > .s-card__footer {
      border-top-color: transparent;
    }
  }

  &__header {
    padding: v-bind(compPadding);
    border-bottom: v-bind("isCollapsed ? 'none' : '1px solid var(--line)'");
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    cursor: default;

    &.collapsible {
      cursor: pointer;
      user-select: none;
    }

    .s-card__header-main {
      width: 100%;
      min-width: 0;
      flex: 1 1 auto;
    }

    .collapse-arrow {
      transition: transform 0.3s ease;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      cursor: pointer;
      &.collapsed {
        transform: rotate(-90deg);
      }
    }
  }
  &__body {
    padding: v-bind(compPadding);
  }
  &__footer {
    border-top: 1px solid var(--line);
    padding: v-bind(compPadding);
  }
}
</style>
