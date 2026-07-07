<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import SIcon from '@/components/icon/src/index.vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'

defineOptions({
  name: 'SWarning',
})

interface Props {
  content: string
  title?: string
  theme?: 'default' | 'chenghua' | 'shijingshan'
  type?: 'info' | 'simple' | 'warning' | 'error' | 'icon'
  width?: string | number
  dangerouslyUseHTMLString?: boolean
  icon?: boolean
  size?: 'small' | 'default'
  dotted?: boolean
  customStyle?: Record<string, any>
  iconAttrs?: Record<string, any>
  left?: boolean | number | string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  theme: 'default',
  type: 'info',
  width: '100%',
  dangerouslyUseHTMLString: false,
  icon: true,
  size: 'default',
  dotted: false,
  customStyle: () => ({}),
  iconAttrs: () => ({}),
  left: false,
})
const mergedProps = useGlobalComponentConfig('warning', props)

const attrs = useAttrs()
const htmlStringEnabled = computed(() => Boolean(mergedProps.value.dangerouslyUseHTMLString))

const mergedStyle = computed(() => {
  let obj: Record<string, any> = {}
  if (mergedProps.value.size === 'small') {
    obj.paddingTop = 0
    obj.paddingBottom = 0
  }
  if (mergedProps.value.dotted) {
    obj['border-style'] = 'dotted'
  }
  if (mergedProps.value.left) {
    if (typeof mergedProps.value.left === 'boolean') {
      obj.marginLeft = '8px'
    } else {
      obj.marginLeft = processWidth(mergedProps.value.left, true)
    }
  }
  let res = { ...obj, ...mergedProps.value.customStyle }
  return res
})

const infoIconColor = computed(() => {
  if (mergedProps.value.theme === 'chenghua') return 'var(--s-ch-primary)'
  if (mergedProps.value.theme === 'shijingshan') return 'var(--s-sjs-primary)'
  return 'var(--45)'
})

const errorIconColor = computed(() => {
  if (mergedProps.value.theme === 'chenghua') return 'var(--s-ch-danger)'
  if (mergedProps.value.theme === 'shijingshan') return 'var(--s-sjs-danger)'
  return 'var(--el-color-danger)'
})

function parseClass(): string {
  let type = mergedProps.value.type
  const themeClass = ['chenghua', 'shijingshan'].includes(mergedProps.value.theme)
    ? ` s-warning-box--${mergedProps.value.theme}`
    : ''
  return `s-warning__${type}${themeClass}`
}
</script>

<template>
  <div
    :class="parseClass()"
    class="s-warning-box"
    :style="{ ...processWidth(mergedProps.width), ...mergedStyle }"
    v-bind="attrs"
  >
    <img v-if="mergedProps.type === 'warning' && mergedProps.icon" src="../notic.png" class="s-warning-box__img" />
    <s-icon
      v-else-if="mergedProps.type === 'error' && mergedProps.icon"
      name="circle-close"
      :color="errorIconColor"
      v-bind="mergedProps.iconAttrs"
      class="s-warning-box__icon"
      size="16"
    />
    <s-icon
      v-else-if="mergedProps.type !== 'warning' && mergedProps.icon"
      name="warning"
      :color="infoIconColor"
      v-bind="mergedProps.iconAttrs"
      class="s-warning-box__icon"
      size="16"
    />
    <div class="s-warning-box__container">
      <div
        v-if="$slots.title || mergedProps.title"
        class="s-warning-box__title"
        :class="`s-warning-box__title--${mergedProps.type}`"
      >
        <slot name="title">
          {{ mergedProps.title }}
        </slot>
      </div>
      <slot name="content">
        <SafeHtml
          v-if="htmlStringEnabled"
          class="s-warning-box__content"
          :class="{ 's-warning-box__content--muted': mergedProps.type === 'icon' }"
          :html="mergedProps.content"
        />
        <span
          v-else
          class="s-warning-box__content"
          :class="{ 's-warning-box__content--muted': mergedProps.type === 'icon' }"
          v-text="mergedProps.content"
        />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-warning-box {
  display: flex;
  align-items: baseline;
  padding: 8px 8px;
  border: 1px solid var(--el-color-warning-light-5);
  border-radius: 4px;

  .s-warning-box__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;

    &.s-warning-box__title--info {
      color: var(--el-color-primary);
    }

    &.s-warning-box__title--warning {
      color: var(--el-color-warning);
    }

    &.s-warning-box__title--error {
      color: var(--el-color-danger);
    }

    &.s-warning-box__title--simple {
      color: var(--45);
    }
  }

  .s-warning-box__content {
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-primary);
    overflow: auto;
  }
  .s-warning-box__content--muted {
    color: var(--45);
    font-size: 14px;
  }
  .s-warning-box__icon {
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  .s-warning-box__img {
    position: relative;
    top: 2px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  :deep(code) {
    padding: 3px 6px;
    border-radius: 4px;
    background-color: var(--el-fill-color-light);
    transition:
      color 0.25s,
      background-color 0.25s;
  }
  :deep(blue) {
    margin: 0;
    padding: 3px 6px;
    border-radius: 4px;
    background-color: var(--el-fill-color-light);
    color: var(--el-color-primary);
    border-radius: 4px;
    padding: 0.15rem 0.5rem;
    font-family: var(--code-font-family);
    font-size: var(--vp-code-font-size);
    line-height: var(--code-line-height);
    transition:
      color 0.25s,
      background-color 0.25s;
  }
}

.s-warning__info {
  border: 1px solid var(--line);
  background: var(--el-color-primary-light-9);
  border-left: 5px solid var(--el-color-primary);
  :deep(code) {
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary-dark-2);
  }
}
.s-warning__simple {
  .s-warning-box__content {
    color: var(--45);
  }
  border: unset;
  padding: 0;
}
.s-warning__warning {
  background: var(--el-color-warning-light-9);
  border: 1px solid var(--el-color-warning-light-5);
  border-left: 5px solid var(--el-color-warning);
  :deep(code) {
    background-color: var(--el-color-warning-light-8);
    color: var(--el-color-warning-dark-2);
  }
}
.s-warning__error {
  background: var(--el-color-danger-light-9);
  border: 1px solid var(--el-color-danger-light-5);
  border-left: 5px solid var(--el-color-danger);
  :deep(code) {
    background-color: var(--el-color-danger-light-8);
    color: var(--el-color-danger-dark-2);
  }
}
</style>
