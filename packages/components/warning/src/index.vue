<script setup lang="ts">
import { getCurrentInstance, computed, useAttrs } from 'vue'
import SIcon from '@/components/icon/src/index.vue'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'SWarning',
})

interface Props {
  content: string
  title?: string
  type?: 'info' | 'simple' | 'warning' | 'error'
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
  type: 'info',
  width: '100%',
  dangerouslyUseHTMLString: true,
  icon: true,
  size: 'default',
  dotted: false,
  customStyle: () => ({}),
  iconAttrs: () => ({}),
  left: false,
})

const attrs = useAttrs()

const bindProps = computed(() => {
  return props.dangerouslyUseHTMLString ? { innerHTML: props.content } : { textContent: props.content }
})

const mergedStyle = computed(() => {
  let obj: Record<string, any> = {}
  if (props.size === 'small') {
    obj.paddingTop = 0
    obj.paddingBottom = 0
  }
  if (props.dotted) {
    obj['border-style'] = 'dotted'
  }
  if (props.left) {
    if (typeof props.left === 'boolean') {
      obj.marginLeft = '8px'
    } else {
      obj.marginLeft = processWidth(props.left, true)
    }
  }
  let res = { ...obj, ...props.customStyle }
  return res
})

function parseClass(): string {
  let type = props.type
  return `s-warning__${type}`
}
</script>

<template>
  <div
    :class="parseClass()"
    class="s-warning-box"
    :style="{ ...processWidth(props.width), ...mergedStyle }"
    v-bind="attrs"
  >
    <img v-if="type === 'warning' && props.icon" src="../notic.png" class="s-warning-box__img" />
    <s-icon
      v-else-if="type === 'error' && props.icon"
      name="circle-close"
      :color="'var(--el-color-danger)'"
      v-bind="iconAttrs"
      class="s-warning-box__icon"
      size="16"
    />
    <s-icon
      v-else-if="type !== 'warning' && props.icon"
      name="warning"
      :color="'var(--45)'"
      v-bind="iconAttrs"
      class="s-warning-box__icon"
      size="16"
    />
    <div class="s-warning-box__container">
      <div v-if="$slots.title || title" class="s-warning-box__title" :class="`s-warning-box__title--${type}`">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <slot name="content">
        <span
          class="s-warning-box__content"
          :class="{ 's-warning-box__content--muted': type === 'icon' }"
          v-bind="bindProps"
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
