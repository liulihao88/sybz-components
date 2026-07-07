<script setup lang="ts">
/**
 * <g-popover @confirm="confirm" trigger="click"></g-popover>
 */

defineOptions({
  name: 'SPopconfirm',
})
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import SButton from '@/components/button/src/index.vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'

const attrs = useAttrs()
const isPopoverVisible = ref(false)
let showTimer: number | undefined

const handleShow = () => {
  window.clearTimeout(showTimer)
  showTimer = window.setTimeout(() => {
    document.removeEventListener('click', closePopoverOnClickOutside)
    document.addEventListener('click', closePopoverOnClickOutside)
  }, 0)
}

const removeClickOutsideListener = () => {
  window.clearTimeout(showTimer)
  document.removeEventListener('click', closePopoverOnClickOutside)
}

const closePopoverOnClickOutside = (event: MouseEvent) => {
  const popover = document.querySelector('.el-popover')

  if (!popover || !popover.contains(event.target as Node)) {
    close()
  }
}
const emits = defineEmits(['confirm', 'cancel'])
function confirm() {
  if (isDisabled.value) return

  close()
  emits('confirm')
}
function close() {
  isPopoverVisible.value = false
  removeClickOutsideListener()
}
function cancel() {
  close()
  emits('cancel')
}
interface PopconfirmProps {
  title?: string
  width?: string | number
  content?: string
  reConfirm?: boolean
  dangerouslyUseHTMLString?: boolean
  theme?: '' | 'chenghua'
  disabled?: boolean
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '确定删除吗?',
  width: 200,
  content: '',
  reConfirm: true,
  dangerouslyUseHTMLString: true,
  theme: '',
  disabled: false,
})

const mergedProps = useGlobalComponentConfig('popconfirm', props)

const normalizeClassValue = (value: unknown) => {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ')

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, active]) => active)
      .map(([className]) => className)
      .join(' ')
  }

  return value ? String(value) : ''
}

const popperClass = computed(() => {
  const attrPopperClass = normalizeClassValue(attrs['popper-class'] || attrs.popperClass)

  return [
    's-popconfirm__popper',
    mergedProps.value.theme === 'chenghua' ? 's-popconfirm__popper--chenghua' : '',
    attrPopperClass,
  ]
    .filter(Boolean)
    .join(' ')
})

const popconfirmButtonTheme = computed(() => {
  return mergedProps.value.theme === 'chenghua' ? 'chenghua' : ''
})

const safeTitle = computed(() => String(mergedProps.value.title ?? ''))
const safeContent = computed(() => String(mergedProps.value.content ?? ''))
const hasTitle = computed(() => !!safeTitle.value)
const htmlStringEnabled = computed(() => Boolean(mergedProps.value.dangerouslyUseHTMLString))
const isDisabled = computed(() => Boolean(mergedProps.value.disabled))

onBeforeUnmount(() => {
  removeClickOutsideListener()
})

defineExpose({
  close,
})
</script>

<template>
  <el-popover
    v-if="mergedProps.reConfirm"
    v-bind="$attrs"
    v-model:visible="isPopoverVisible"
    class="s-popconfirm__box"
    :width="mergedProps.width"
    :disabled="isDisabled"
    :popper-class="popperClass"
    @show="handleShow"
  >
    <slot name="title">
      <template v-if="hasTitle">
        <SafeHtml v-if="htmlStringEnabled" tag="div" class="s-popconfirm__title" :html="safeTitle" />
        <div v-else class="s-popconfirm__title" v-text="safeTitle"></div>
      </template>
    </slot>
    <slot name="content">
      <template v-if="mergedProps.content">
        <SafeHtml v-if="htmlStringEnabled" tag="div" class="s-popconfirm__content" :html="safeContent" />
        <div v-else class="s-popconfirm__content" v-text="safeContent"></div>
      </template>
    </slot>
    <div class="s-popconfirm__footer">
      <slot name="footer">
        <SButton size="small" type="info" :theme="popconfirmButtonTheme" @click="cancel">取消</SButton>
        <SButton size="small" type="primary" :theme="popconfirmButtonTheme" @click="confirm">确定</SButton>
      </slot>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
  <span
    v-else
    class="s-popconfirm__simple_box"
    :class="{
      's-popconfirm__simple_box--chenghua': mergedProps.theme === 'chenghua',
      'is-disabled': isDisabled,
    }"
    @click="confirm"
  >
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.s-popconfirm__title {
  margin: 0 0 8px;
  color: var(--el-text-color-primary);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
}

.s-popconfirm__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  text-align: right;
  margin: 0;
  margin-top: 16px;
}

.s-popconfirm__content {
  color: var(--el-text-color-regular);
  line-height: 1.6;
}

.s-popconfirm__simple_box:has(.el-button) + :deep(.el-button),
.el-button + .s-popconfirm__simple_box :deep(.el-button),
.s-popconfirm__simple_box:has(.el-button) + .s-popconfirm__simple_box:has(.el-button) {
  margin-left: 12px !important;
}

.s-popconfirm__simple_box.is-disabled {
  cursor: not-allowed;
}

:global(.s-popconfirm__popper .s-popconfirm__content code),
:global(.s-popconfirm__popper .s-popconfirm__title code) {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  padding: 0 5px;
  border: 1px solid var(--s-code-border-color);
  margin: 0 2px;
  border-radius: 4px;
  background: var(--s-code-bg-color);
  color: var(--s-code-color);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 12px;
  line-height: 18px;
  vertical-align: baseline;
}
</style>
