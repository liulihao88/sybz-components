<template>
  <div class="s-dialog" :class="componentClass">
    <component
      :is="parseType"
      v-bind="{
        ...defaultPanelAttrs,
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
                v-if="mergedProps.theme !== 'chenghua'"
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
              {{ mergedProps.title }}
            </slot>
          </span>
        </div>
      </template>
      <div :class="slotBoxClass">
        <slot></slot>
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
            {{ mergedProps.confirmText }}
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

defineOptions({
  name: 'SDialog',
})

type DialogButtonAttrs = Partial<InstanceType<typeof SButton>['$props']> & Record<string, any>
type DialogAction = ((...args: any[]) => any) | string

const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])
interface DialogProps {
  type?: '' | 'drawer'
  title?: string
  width?: string | number
  theme?: '' | 'norm' | 'norm16' | 'simple' | 'chenghua' | string
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
  hideHeaderIcon?: boolean
}

const props = withDefaults(defineProps<DialogProps>(), {
  type: '',
  title: '提示',
  width: '',
  theme: '', // 弹框样式: 默认空, norm norm16 simple chenghua
  cancel: '',
  cancelText: '取消',
  confirmText: '确认',
  // 是否显示底部操作按钮 :footer="null"
  showFooter: undefined,
  showCancel: true,
  showConfirm: true,
  confirmAttrs: () => ({}),
  cancelAttrs: () => ({}),
  enableConfirm: true,
  confirm: undefined,
  fillSlot: false,
  hideHeaderIcon: false,
})
const mergedProps = useGlobalComponentConfig('dialog', props)

const getThemeClass = computed(() => {
  if (mergedProps.value.theme === 'norm') {
    return 's-norm-dialog'
  } else if (mergedProps.value.theme === 'chenghua') {
    return 's-chenghua-dialog'
  } else {
    return ''
  }
})

const componentClass = computed(() => {
  return ['s-dialog__panel', getThemeClass.value].filter(Boolean).join(' ')
})

const isDrawer = computed(() => mergedProps.value.type === 'drawer')
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
    isDrawer.value && mergedProps.value.theme === 'chenghua' ? 's-dialog__drawer--chenghua' : '',
  ].filter(Boolean)
})

const mergedShowFooter = computed(() => {
  return mergedProps.value.showFooter ?? true
})

const dialogButtonTheme = computed(() => {
  return mergedProps.value.theme === 'chenghua' ? 'chenghua' : ''
})

const mergedConfirmAttrs = computed<DialogButtonAttrs>(() => {
  return {
    icon: mergedProps.value.theme === 'chenghua' ? '' : 'el-icon-check',
    ...mergedProps.value.confirmAttrs,
  }
})

const mergedCancelAttrs = computed<DialogButtonAttrs>(() => {
  return {
    icon: mergedProps.value.theme === 'chenghua' ? '' : 'el-icon-close',
    ...mergedProps.value.cancelAttrs,
  }
})

const getButtonType = (type: unknown, defaultType = '') => {
  return typeof type === 'string' && type ? type : defaultType
}

const cancelButtonAttrs = computed(() => {
  const { type: _type, ...buttonAttrs } = mergedCancelAttrs.value
  return buttonAttrs
})
const cancelButtonType = computed(() => getButtonType(mergedCancelAttrs.value.type))

const confirmButtonAttrs = computed(() => {
  const { type: _type, ...buttonAttrs } = mergedConfirmAttrs.value
  return buttonAttrs
})
const confirmButtonType = computed(() => getButtonType(mergedConfirmAttrs.value.type, 'primary'))
const confirmButtonLoading = computed(() => mergedConfirmAttrs.value.loading === true)

const drawerBodyClass = computed(() => {
  return mergedProps.value.type === 'drawer' && mergedProps.value.fillSlot ? 's-dialog__drawer-body--fill' : ''
})

const fullscreenHeight = ref('calc(100vh - 124px)')
const slotBoxClass = computed(() => {
  if (attrs.fullscreen === true || attrs.fullscreen === '') {
    return 'dialog_fullscreen'
  }
  return mergedProps.value.fillSlot ? 'dialog_slot_box dialog_slot_box--fill' : 'dialog_slot_box'
})
watch(
  () => mergedShowFooter.value,
  (val) => {
    if (attrs.fullscreen === true || attrs.fullscreen === '') {
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
    await mergedProps.value.confirm().finally(() => {
      confirmLoading.value = false
    })
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
  if (attrs.modelValue === true && code === 'Enter' && mergedProps.value.enableConfirm && !confirmButtonLoading.value) {
    confirmHandler()
  }
}

const parseType = () => {
  if (mergedProps.value.type === '') {
    return 'el-dialog'
  } else if (mergedProps.value.type === 'drawer') {
    return 'el-drawer'
  }
}

onMounted(() => {
  document.addEventListener('keypress', onkeypress)
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', onkeypress)
})
</script>

<style lang="scss" scoped>
.s-dialog {
  :deep(.el-dialog__header),
  :deep(.el-drawer__header) {
    padding: 10px 16px;
    border-bottom: 1px solid var(--line);
    font-weight: 700;
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
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: var(--el-text-color-primary);
  }

  .s-dialog__header-icon-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
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
  }
}
</style>
