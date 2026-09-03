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
import STag from '@/components/tag/src/index.vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'
import { resolveConfirmSemantic } from '@/utils/src/confirmSemantic'
import type { SPopconfirmButtonType } from '@/types/component-props'

const attrs = useAttrs()
const isPopoverVisible = ref(false)
let showTimer: number | undefined

const handleShow = () => {
  window.clearTimeout(showTimer)
  document.removeEventListener('keydown', closePopoverOnEscape)
  document.addEventListener('keydown', closePopoverOnEscape)
  showTimer = window.setTimeout(() => {
    document.removeEventListener('click', closePopoverOnClickOutside)
    document.addEventListener('click', closePopoverOnClickOutside)
  }, 0)
}

const removeDocumentListeners = () => {
  window.clearTimeout(showTimer)
  document.removeEventListener('click', closePopoverOnClickOutside)
  document.removeEventListener('keydown', closePopoverOnEscape)
}

function closePopoverOnEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !isPopoverVisible.value) return

  close()
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
  removeDocumentListeners()
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
  theme?: 'default' | 'chenghua' | 'shijingshan'
  disabled?: boolean
  variant?: 'default' | 'delete' | 'warning'
  target?: string | number
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: SPopconfirmButtonType
  cancelButtonType?: SPopconfirmButtonType
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: undefined,
  width: undefined,
  content: '',
  reConfirm: true,
  dangerouslyUseHTMLString: true,
  theme: 'default',
  disabled: false,
  variant: 'default',
  target: undefined,
  confirmButtonText: undefined,
  cancelButtonText: '取消',
  confirmButtonType: undefined,
  cancelButtonType: 'info',
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
    mergedProps.value.theme === 'shijingshan' ? 's-popconfirm__popper--shijingshan' : '',
    ...confirmSemantic.value.classNames,
    attrPopperClass,
  ]
    .filter(Boolean)
    .join(' ')
})

const popconfirmButtonTheme = computed<'default' | 'chenghua' | 'shijingshan'>(() => {
  return ['chenghua', 'shijingshan'].includes(mergedProps.value.theme) ? mergedProps.value.theme : 'default'
})

const confirmSemantic = computed(() =>
  resolveConfirmSemantic({
    variant: mergedProps.value.variant,
    target: mergedProps.value.target,
    theme: popconfirmButtonTheme.value,
    title: mergedProps.value.title,
    confirmButtonText: mergedProps.value.confirmButtonText,
    confirmButtonType: mergedProps.value.confirmButtonType,
  }),
)

const safeTitle = computed(() => confirmSemantic.value.title)
const safeContent = computed(() => String(mergedProps.value.content ?? ''))
const hasTitle = computed(() => !!safeTitle.value)
const htmlStringEnabled = computed(() => Boolean(mergedProps.value.dangerouslyUseHTMLString))
const isDisabled = computed(() => Boolean(mergedProps.value.disabled))
const showSemanticContent = computed(() => confirmSemantic.value.variant === 'delete' && !mergedProps.value.content)
const cancelButtonIsText = computed(() => mergedProps.value.cancelButtonType === 'text')
const confirmButtonIsText = computed(() => confirmSemantic.value.confirmButtonType === 'text')
const resolvedCancelButtonType = computed(() => (cancelButtonIsText.value ? '' : mergedProps.value.cancelButtonType))
const resolvedConfirmButtonType = computed(() =>
  confirmButtonIsText.value ? '' : confirmSemantic.value.confirmButtonType,
)
const popconfirmWidth = computed(() => {
  if (mergedProps.value.width !== undefined && mergedProps.value.width !== '') return mergedProps.value.width
  return confirmSemantic.value.variant === 'default' ? 200 : 320
})

onBeforeUnmount(() => {
  removeDocumentListeners()
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
    :width="popconfirmWidth"
    :disabled="isDisabled"
    :popper-class="popperClass"
    @show="handleShow"
    @hide="removeDocumentListeners"
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
      <div v-else-if="showSemanticContent" class="s-popconfirm__content">
        <template v-if="confirmSemantic.hasTarget">
          确认要删除
          <STag class="s-popconfirm__target" type="danger" :theme="popconfirmButtonTheme">
            <slot name="target">{{ confirmSemantic.target }}</slot>
          </STag>
          吗？删除后不可恢复。
        </template>
        <template v-else>{{ confirmSemantic.defaultMessage }}</template>
      </div>
    </slot>
    <slot name="footer">
      <div class="s-popconfirm__footer">
        <SButton
          class="s-popconfirm__cancel-button"
          size="small"
          height="36"
          :type="resolvedCancelButtonType"
          :text="cancelButtonIsText"
          :theme="popconfirmButtonTheme"
          @click="cancel"
        >
          {{ mergedProps.cancelButtonText }}
        </SButton>
        <SButton
          class="s-popconfirm__confirm-button"
          size="small"
          height="36"
          :type="resolvedConfirmButtonType"
          :text="confirmButtonIsText"
          :theme="popconfirmButtonTheme"
          @click="confirm"
        >
          {{ confirmSemantic.confirmButtonText }}
        </SButton>
      </div>
    </slot>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
  <span
    v-else
    class="s-popconfirm__simple_box"
    :class="{
      's-popconfirm__simple_box--chenghua': mergedProps.theme === 'chenghua',
      's-popconfirm__simple_box--shijingshan': mergedProps.theme === 'shijingshan',
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

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning) {
  box-sizing: border-box;
  max-width: calc(100vw - 32px);
  padding: 0 !important;
  overflow: visible;
  border: 1px solid var(--el-border-color-lighter) !important;
  border-radius: 8px !important;
  box-shadow: var(--el-box-shadow-light) !important;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__title),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__title) {
  box-sizing: border-box;
  min-height: 52px;
  padding: 14px 20px !important;
  margin: 0 !important;
  border-radius: 7px 7px 0 0;
  background: var(--s-confirm-semantic-color) !important;
  color: #fff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  line-height: 24px !important;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__content),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__content) {
  padding: 20px 20px 12px !important;
  color: var(--el-text-color-regular) !important;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow-wrap: anywhere;
  word-break: normal;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__footer),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__footer) {
  padding: 8px 20px 20px !important;
  margin-top: 0;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__confirm-button),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__cancel-button),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__confirm-button),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__cancel-button) {
  min-width: 76px;
  height: 36px !important;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 14px;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__confirm-button),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__confirm-button) {
  --el-button-bg-color: var(--s-confirm-semantic-color);
  --el-button-border-color: var(--s-confirm-semantic-color);
  --el-button-text-color: #fff;
  --el-button-hover-bg-color: var(--s-confirm-semantic-hover-color);
  --el-button-hover-border-color: var(--s-confirm-semantic-hover-color);
  --el-button-hover-text-color: #fff;
  --el-button-active-bg-color: var(--s-confirm-semantic-active-color);
  --el-button-active-border-color: var(--s-confirm-semantic-active-color);
  --el-button-active-text-color: #fff;
}

:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--delete .s-popconfirm__cancel-button),
:global(.s-popconfirm__popper.s-confirm-semantic.s-confirm-semantic--warning .s-popconfirm__cancel-button) {
  --el-button-bg-color: transparent;
  --el-button-border-color: var(--s-confirm-semantic-cancel-border-color);
  --el-button-text-color: var(--s-confirm-semantic-cancel-text-color);
  --el-button-hover-bg-color: var(--el-fill-color-light);
  --el-button-hover-border-color: var(--s-confirm-semantic-cancel-border-color);
  --el-button-hover-text-color: var(--s-confirm-semantic-cancel-text-color);
  --el-button-active-bg-color: var(--el-fill-color);
  --el-button-active-border-color: var(--s-confirm-semantic-cancel-border-color);
  --el-button-active-text-color: var(--s-confirm-semantic-cancel-text-color);

  border-color: var(--s-confirm-semantic-cancel-border-color) !important;
}

:global(.s-popconfirm__target) {
  display: inline-flex;
  max-width: calc(100% - 8px);
  height: auto;
  min-height: 22px;
  padding: 0 6px;
  margin: 0 3px;
  font-family: 'Roboto Mono', 'PingFang SC', monospace;
  font-weight: 600;
  vertical-align: middle;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: keep-all;
}
</style>
