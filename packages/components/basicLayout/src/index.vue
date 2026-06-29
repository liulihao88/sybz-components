<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SBasicLayout',
})
interface BasicLayoutProps {
  modelValue?: boolean
  size?: 'default' | 'small' | 'large' | string
  title?: string
  boxStyle?: Record<string, any>
  headerStyle?: Record<string, any>
  bodyStyle?: Record<string, any>
  footerStyle?: Record<string, any>
  border?: boolean
  scroll?: boolean
  square?: boolean
  collapsible?: boolean
  collapseTrigger?: 'icon' | 'header'
  theme?: '' | 'chenghua'
}

const props = withDefaults(defineProps<BasicLayoutProps>(), {
  modelValue: false,
  size: 'default', // small large
  title: '',
  boxStyle: () => ({}),
  headerStyle: () => ({}),
  bodyStyle: () => ({}),
  footerStyle: () => ({}),
  border: true,
  scroll: true,
  square: false,
  collapsible: false,
  collapseTrigger: 'header',
  theme: '',
})
defineSlots<{
  default?: () => any
  header?: () => any
  footer?: () => any
  icon?: () => any
}>()
const mergedProps = useGlobalComponentConfig('basicLayout', props)

const emit = defineEmits(['update:modelValue'])

const boxRef = ref<HTMLDivElement | null>(null)
const headerRef = ref<HTMLDivElement | null>(null)
const isCollapsed = ref(false)

const boxMergedStyle = computed(() => {
  return {
    ...mergedProps.value.boxStyle,
    ...(mergedProps.value.square
      ? {
          display: 'inline-flex',
        }
      : {}),
  }
})

const headerMergedStyle = computed(() => {
  let noBorderStyle = {}
  if (!mergedProps.value.border) {
    noBorderStyle = {
      borderBottom: 'none',
      paddingBottom: 0,
    }
  }
  return {
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

const compPadding = computed(() => {
  const { size } = mergedProps.value
  return size === 'default' ? '16px' : size === 'large' ? '24px' : '8px'
})

const layoutClass = computed(() => ({
  's-basic-layout--chenghua': mergedProps.value.theme === 'chenghua',
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
  <div ref="boxRef" class="s-basic-layout" :class="layoutClass" :style="boxMergedStyle">
    <div
      v-if="$slots.header || mergedProps.title"
      ref="headerRef"
      class="s-basic-layout__header"
      :style="headerMergedStyle"
      :class="{ collapsible: isHeaderTrigger }"
      @click="handleHeaderClick"
    >
      <div class="s-basic-layout__header-main">
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
    <div
      v-show="!isCollapsed"
      class="s-basic-layout__body"
      :style="{ ...mergedProps.bodyStyle, ...scrollStyle, ...squareStyle }"
    >
      <slot></slot>
    </div>
    <div v-if="$slots.footer && !isCollapsed" class="s-basic-layout__footer" :style="mergedProps.footerStyle">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-basic-layout {
  background: var(--el-bg-color);
  border: 1px solid var(--line);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: auto;
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

    .s-basic-layout__header-main {
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
