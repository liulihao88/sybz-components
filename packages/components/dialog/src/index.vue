<template>
  <div class="s-dialog" :class="componentClass">
    <component
      :is="panelComponent"
      v-bind="{
        ...defaultPanelAttrs,
        modelValue: mergedProps.modelValue,
        bodyClass: drawerBodyClass,
        closeOnClickModal: true,
        destroyOnClose: true,
        draggable: true,
        ...$attrs,
        class: panelClass,
      }"
      @close="handleClose"
    >
      <template #header>
        <div class="s-dialog__header">
          <span v-if="!mergedProps.hideHeaderIcon" class="s-dialog__header-icon-box">
            <slot name="headerIcon">
              <svg
                v-if="!isBusinessTheme"
                class="s-dialog__header-icon"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M192 160h384c35.36 0 64 28.64 64 64v96h192c35.36 0 64 28.64 64 64v448c0 35.36-28.64 64-64 64H448c-35.36 0-64-28.64-64-64v-96H192c-35.36 0-64-28.64-64-64V224c0-35.36 28.64-64 64-64zm0 64v448h192V384c0-35.36 28.64-64 64-64h128v-96H192zm256 160v448h384V384H448z"
                />
                <path
                  fill="currentColor"
                  d="M544 480h192a32 32 0 1 1 0 64H544a32 32 0 1 1 0-64zm0 128h192a32 32 0 1 1 0 64H544a32 32 0 1 1 0-64z"
                />
              </svg>
            </slot>
          </span>
          <span class="s-dialog__header-content">
            <slot name="header">
              <span class="s-dialog__header-title">
                {{ dialogTitle }}
              </span>
              <span v-if="mergedProps.subTitle" class="s-dialog__header-sub-title">
                {{ mergedProps.subTitle }}
              </span>
            </slot>
          </span>
        </div>
      </template>
      <div :class="slotBoxClass">
        <template v-if="mergedProps.variant === 'delete' && !$slots.default">
          <template v-if="mergedProps.target !== undefined">
            确认要删除
            <s-tag type="danger">
              <slot name="target">{{ mergedProps.target }}</slot>
            </s-tag>
            吗? 删除后不可恢复。
          </template>
          <template v-else>删除后数据将无法恢复，确定继续吗？</template>
        </template>
        <slot v-else></slot>
      </div>
      <template v-if="mergedShowFooter" #footer>
        <slot name="footer">
          <s-button
            v-if="mergedProps.showCancel"
            class="s-dialog__cancel-button"
            v-bind="cancelButtonAttrs"
            :type="cancelButtonType"
            :theme="dialogButtonTheme"
            @click="handleCancelClose"
          >
            {{ mergedProps.cancelText }}
          </s-button>
          <s-button
            v-if="mergedProps.showConfirm"
            id="kdDialogConfirmBtn"
            class="s-dialog__confirm-button"
            :loading="confirmLoading"
            v-bind="confirmButtonAttrs"
            :type="confirmButtonType"
            :theme="dialogButtonTheme"
            @click="confirmHandler"
          >
            {{ dialogConfirmText }}
          </s-button>
        </slot>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, watch, onBeforeUnmount, onMounted } from 'vue'
import { getType, processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import SButton from '@/components/button/src/index.vue'
import STag from '@/components/tag/src/index.vue'

defineOptions({
  name: 'SDialog',
})

type DialogButtonAttrs = Partial<InstanceType<typeof SButton>['$props']> & Record<string, any>
type DialogAction = ((...args: any[]) => any) | string

const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])
interface DialogProps {
  modelValue?: boolean
  mode?: 'dialog' | 'drawer'
  variant?: 'default' | 'delete' | 'warning'
  target?: string
  title?: string
  subTitle?: string
  width?: string | number
  theme?: 'default' | 'norm' | 'norm16' | 'simple' | 'chenghua' | 'shijingshan'
  cancel?: DialogAction
  cancelText?: string
  confirmText?: string
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  confirmAttrs?: DialogButtonAttrs
  cancelAttrs?: DialogButtonAttrs
  enableConfirm?: boolean
  confirm?: (...args: any[]) => any
  fillSlot?: boolean
  maximizeHeight?: boolean
  hideHeaderIcon?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: false,
  mode: 'dialog',
  variant: 'default',
  target: undefined,
  subTitle: '',
  width: '',
  theme: 'default', // 弹框样式: default, norm, norm16, simple, chenghua, shijingshan
  cancel: '',
  cancelText: '取消',
  confirmText: undefined,
  // 是否显示底部操作按钮 :footer="null"
  showFooter: undefined,
  showCancel: true,
  showConfirm: true,
  confirmAttrs: () => ({}),
  cancelAttrs: () => ({}),
  enableConfirm: true,
  confirm: undefined,
  fillSlot: false,
  maximizeHeight: false,
  hideHeaderIcon: false,
})
const mergedProps = useGlobalComponentConfig('dialog', props)
const isBusinessTheme = computed(() => ['chenghua', 'shijingshan'].includes(mergedProps.value.theme))

const getThemeClass = computed(() => {
  if (mergedProps.value.theme === 'norm') {
    return 's-norm-dialog'
  } else if (mergedProps.value.theme === 'chenghua') {
    return 's-chenghua-dialog'
  } else if (mergedProps.value.theme === 'shijingshan') {
    return 's-shijingshan-dialog'
  } else {
    return ''
  }
})

const componentClass = computed(() => {
  return ['s-dialog__panel', getThemeClass.value, `s-dialog--${mergedProps.value.variant}`].filter(Boolean).join(' ')
})

const isDrawer = computed(() => mergedProps.value.mode === 'drawer')
const dialogTitle = computed(() => {
  if (mergedProps.value.title !== undefined) return mergedProps.value.title
  if (mergedProps.value.variant === 'delete') return '删除确认'
  if (mergedProps.value.variant === 'warning') return '警告'
  return '提示'
})
const dialogConfirmText = computed(() => {
  if (mergedProps.value.confirmText !== undefined) return mergedProps.value.confirmText
  return mergedProps.value.variant === 'delete' ? '删除' : '确认'
})
const isFullscreen = computed(() => attrs.fullscreen === true || attrs.fullscreen === '')
const panelWidth = computed(() => processWidth(mergedProps.value.width, true))

const defaultPanelAttrs = computed(() => {
  return isDrawer.value
    ? {
        size: panelWidth.value || 'min(480px, calc(100vw - 32px))',
      }
    : {
        width: panelWidth.value || '640px',
      }
})

const panelClass = computed(() => {
  return [
    attrs.class,
    isDrawer.value ? 's-dialog__drawer' : '',
    !isDrawer.value && !isFullscreen.value && mergedProps.value.maximizeHeight ? 's-dialog__maximize-height' : '',
    isDrawer.value && mergedProps.value.theme === 'chenghua' ? 's-dialog__drawer--chenghua' : '',
    isDrawer.value && mergedProps.value.theme === 'shijingshan' ? 's-dialog__drawer--shijingshan' : '',
  ].filter(Boolean)
})

const mergedShowFooter = computed(() => {
  return mergedProps.value.showFooter ?? true
})

const dialogButtonTheme = computed<'default' | 'chenghua' | 'shijingshan'>(() => {
  if (mergedProps.value.theme === 'chenghua' || mergedProps.value.theme === 'shijingshan') {
    return mergedProps.value.theme
  }

  return 'default'
})

const mergedConfirmAttrs = computed<DialogButtonAttrs>(() => {
  return {
    icon: isBusinessTheme.value ? '' : 'el-icon-check',
    ...mergedProps.value.confirmAttrs,
  }
})

const mergedCancelAttrs = computed<DialogButtonAttrs>(() => {
  const cancelAttrs = mergedProps.value.cancelAttrs ?? {}
  return {
    icon: isBusinessTheme.value ? '' : 'el-icon-close',
    ...cancelAttrs,
    style:
      mergedProps.value.variant === 'delete' || mergedProps.value.variant === 'warning'
        ? [
            {
              '--el-button-bg-color': 'transparent',
              '--el-button-border-color': 'var(--s-dialog-semantic-cancel-border-color)',
              '--el-button-text-color': 'var(--s-dialog-semantic-cancel-text-color)',
              '--el-button-hover-bg-color': 'var(--el-fill-color-light)',
              '--el-button-hover-border-color': 'var(--s-dialog-semantic-cancel-border-color)',
              '--el-button-hover-text-color': 'var(--s-dialog-semantic-cancel-text-color)',
              '--el-button-active-bg-color': 'var(--el-fill-color)',
              '--el-button-active-border-color': 'var(--s-dialog-semantic-cancel-border-color)',
              '--el-button-active-text-color': 'var(--s-dialog-semantic-cancel-text-color)',
            },
            cancelAttrs.style,
          ]
        : cancelAttrs.style,
  }
})

const getButtonType = (type: unknown, defaultType = '') => {
  return typeof type === 'string' && type ? type : defaultType
}

const cancelButtonAttrs = computed(() => {
  const { type: _type, ...buttonAttrs } = mergedCancelAttrs.value
  return buttonAttrs
})
const cancelButtonType = computed(() => {
  return getButtonType(mergedCancelAttrs.value.type)
})

const confirmButtonAttrs = computed(() => {
  const { type: _type, ...buttonAttrs } = mergedConfirmAttrs.value
  return buttonAttrs
})
const confirmButtonType = computed(() => {
  const variantType =
    mergedProps.value.variant === 'delete' ? 'danger' : mergedProps.value.variant === 'warning' ? 'warning' : 'primary'
  return getButtonType(mergedConfirmAttrs.value.type, variantType)
})
const confirmButtonLoading = computed(() => mergedConfirmAttrs.value.loading === true)

const drawerBodyClass = computed(() => {
  return mergedProps.value.mode === 'drawer' && mergedProps.value.fillSlot ? 's-dialog__drawer-body--fill' : ''
})

const fullscreenHeight = ref('calc(100vh - 124px)')
const slotBoxClass = computed(() => {
  if (isFullscreen.value) {
    return 'dialog_fullscreen'
  }
  return mergedProps.value.fillSlot ? 'dialog_slot_box dialog_slot_box--fill' : 'dialog_slot_box'
})
watch(
  () => mergedShowFooter.value,
  (val) => {
    if (isFullscreen.value) {
      if (val === false) {
        fullscreenHeight.value = 'calc(100vh - 74px)'
      } else {
        fullscreenHeight.value = 'calc(100vh - 124px)'
      }
    }
  },
  {
    immediate: true,
  },
)

const confirmLoading = ref(false)
async function confirmHandler() {
  if (mergedProps.value.confirm && getType(mergedProps.value.confirm) === 'function') {
    confirmLoading.value = true
    try {
      await Promise.resolve(mergedProps.value.confirm())
    } finally {
      confirmLoading.value = false
    }
  } else if (typeof attrs.onConfirm === 'function') {
    attrs.onConfirm()
  } else {
    handleClose()
  }
}
function handleCancelClose() {
  if (typeof attrs.onCancel === 'function') {
    attrs.onCancel()
  } else {
    emits('update:modelValue', false)
  }
}

function handleClose() {
  emits('update:modelValue', false)
}

// 只有当弹框的时候, 且按的是回车键, 才走confirm
function onkeypress({ code }: KeyboardEvent) {
  if (
    mergedProps.value.modelValue === true &&
    code === 'Enter' &&
    mergedProps.value.enableConfirm &&
    !confirmButtonLoading.value
  ) {
    confirmHandler()
  }
}

const panelComponent = computed(() => (isDrawer.value ? 'el-drawer' : 'el-dialog'))

onMounted(() => {
  document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', onkeypress)
})
</script>

<style lang="scss" scoped>
.s-dialog {
  --s-dialog-variant-delete-color: var(--el-color-danger);
  --s-dialog-variant-warning-color: var(--el-color-warning);
  --s-dialog-semantic-cancel-border-color: var(--el-border-color);
  --s-dialog-semantic-cancel-text-color: var(--el-text-color-regular);

  &.s-chenghua-dialog {
    --s-dialog-variant-delete-color: var(--s-ch-danger);
    --s-dialog-variant-warning-color: var(--s-ch-warning);
    --s-dialog-semantic-cancel-border-color: var(--s-ch-divider);
    --s-dialog-semantic-cancel-text-color: var(--s-ch-text-regular);
  }

  &.s-shijingshan-dialog {
    --s-dialog-variant-delete-color: var(--s-sjs-danger);
    --s-dialog-variant-warning-color: #f59e0b;
    --s-dialog-semantic-cancel-border-color: var(--s-sjs-divider);
    --s-dialog-semantic-cancel-text-color: var(--s-sjs-text-regular);
  }

  &.s-shijingshan-dialog.s-dialog--warning {
    :deep(.s-dialog__confirm-button) {
      --s-sjs-button-type-color: #f59e0b;
    }
  }

  &.s-dialog--delete {
    :deep(.el-dialog__header),
    :deep(.el-drawer__header) {
      background: var(--s-dialog-variant-delete-color) !important;
      border-bottom-color: var(--s-dialog-variant-delete-color) !important;
    }
  }

  &.s-dialog--warning {
    :deep(.el-dialog__header),
    :deep(.el-drawer__header) {
      background: var(--s-dialog-variant-warning-color) !important;
      border-bottom-color: var(--s-dialog-variant-warning-color) !important;
    }
  }

  &.s-dialog--delete,
  &.s-dialog--warning {
    .s-dialog__header,
    .s-dialog__header-sub-title,
    :deep(.el-dialog__close),
    :deep(.el-drawer__close-btn) {
      color: #fff !important;
    }
  }

  :deep(.el-dialog__header),
  :deep(.el-drawer__header) {
    padding: 10px 16px;
    border-bottom: 1px solid var(--line);
    font-weight: 700;
  }

  :deep(.el-dialog__header) {
    padding-right: 40px;
  }

  :deep(.el-drawer__header) {
    margin-bottom: 0;
  }
  :deep(.s-dialog__drawer) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    box-shadow: -16px 0 42px rgb(15 23 42 / 16%);
  }
  :deep(.s-dialog__drawer .el-drawer__header) {
    flex: 0 0 auto;
    min-height: 56px;
    padding: 14px 20px;
    border-bottom: 1px solid var(--line);
  }
  :deep(.s-dialog__drawer .el-drawer__body) {
    flex: 1 1 auto;
    min-height: 0;
    padding: 20px;
    overflow-y: auto;
  }
  :deep(.s-dialog__drawer .el-drawer__footer) {
    flex: 0 0 auto;
    min-height: 56px;
    padding: 10px 20px;
    border-top: 1px solid var(--line);
    background: var(--el-fill-color-extra-light);
  }
  :deep(.s-dialog__drawer .el-drawer__close-btn) {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    color: var(--el-text-color-secondary);
  }
  :deep(.s-dialog__drawer .el-drawer__close-btn .el-icon) {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  :deep(.s-dialog__drawer .el-drawer__close-btn:hover) {
    color: var(--el-color-primary);
    background: var(--el-color-primary-light-9);
  }
  :deep(.el-dialog) {
    padding: 0 !important;
  }
  :deep(.s-dialog__maximize-height) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 32px);
    height: calc(100dvh - 32px);
    max-height: calc(100vh - 32px);
    max-height: calc(100dvh - 32px);
    margin-top: 16px;
    margin-bottom: 16px;
    overflow: hidden;
  }
  :deep(.s-dialog__maximize-height .el-dialog__header),
  :deep(.s-dialog__maximize-height .el-dialog__footer) {
    flex: 0 0 auto;
  }
  :deep(.s-dialog__maximize-height .el-dialog__body) {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }
  :deep(.s-dialog__maximize-height .el-dialog__body .dialog_slot_box) {
    flex: 1 1 auto;
    min-height: 0;
    max-height: none;
    overflow-y: auto;
  }
  :deep(.s-dialog__maximize-height .el-dialog__body .dialog_slot_box--fill) {
    height: auto;
  }
  :deep(.el-dialog__body) {
    padding: 16px;
    .dialog_slot_box {
      min-height: 20px;
      max-height: calc(100vh - 30vh - 92px);
      overflow-y: auto;
    }
    .dialog_slot_box--fill {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 30vh - 92px);
      min-height: 20px;
      overflow: hidden;
    }
    .dialog_fullscreen {
      height: v-bind(fullscreenHeight);
      overflow-y: auto;
    }
  }
  :deep(.s-dialog__drawer-body--fill) {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    .dialog_slot_box {
      min-height: 20px;
      overflow-y: auto;
    }
    .dialog_slot_box--fill {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-height: 0;
      overflow: hidden;
    }
    .dialog_fullscreen {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
  }
  :deep(.el-dialog__footer),
  :deep(.el-drawer__footer) {
    border-top: 1px solid var(--line);
    padding: 10px 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  :deep(.el-drawer__footer) {
    justify-content: start;
    flex-direction: row-reverse;
    .el-button {
      margin-left: 0px;
      margin-right: 12px;
    }
  }
  :deep(.el-dialog__headerbtn) {
    width: 45px;
    height: 45px;
  }
  .s-dialog__header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }

  .s-dialog__header-icon-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    height: 22px;
  }

  .s-dialog__header-icon {
    display: block;
    width: 16px;
    height: 16px;
    color: currentColor;
  }

  .s-dialog__header-content {
    min-width: 0;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .s-dialog__header-title {
    line-height: 22px;
  }

  .s-dialog__header-sub-title {
    color: var(--el-text-color-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
