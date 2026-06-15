<template>
  <div class="s-dialog" :class="componentClass">
    <component
      :is="parseType"
      v-bind="{
        width: '640px',
        bodyClass: drawerBodyClass,
        closeOnClickModal: true,
        destroyOnClose: true,
        draggable: true,
        ...$attrs,
      }"
      @close="handleClose"
    >
      <template #header>
        <div class="s-dialog__header">
          <span v-if="!mergedProps.hideHeaderIcon" class="s-dialog__header-icon-box">
            <slot name="headerIcon">
              <svg
                class="s-dialog__header-icon"
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                focusable="false"
                v-if="mergedProps.theme !== 'chenghua'"
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
      <template #footer v-if="mergedShowFooter">
        <slot name="footer">
          <SButton
            v-if="mergedProps.showCancel"
            class="s-dialog__cancel-button"
            :type="mergedCancelAttrs.type || ''"
            v-bind="mergedCancelAttrs"
            :theme="dialogButtonTheme"
            @click="handleCancelClose"
          >
            {{ mergedProps.cancelText }}
          </SButton>
          <SButton
            v-if="mergedProps.showConfirm"
            class="s-dialog__confirm-button"
            :loading="confirmLoading"
            id="kdDialogConfirmBtn"
            :type="mergedConfirmAttrs.type || 'primary'"
            v-bind="mergedConfirmAttrs"
            :theme="dialogButtonTheme"
            @click="confirm"
          >
            {{ mergedProps.confirmText }}
          </SButton>
        </slot>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, watch, onBeforeUnmount, onMounted } from 'vue'
import { getType } from '@/utils/src/index'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import SButton from '@/components/button/src/index.vue'

defineOptions({
  name: 'SDialog',
})
const attrs = useAttrs()
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  type: {
    type: String, // drawer
    // default: 'drawer',
    default: '',
  },
  title: {
    type: String,
    default: '提示',
  },
  theme: {
    type: String,
    default: '', // 弹框样式: 默认空, norm norm16 simple chenghua
  },
  cancel: {
    type: [Function, String],
    default: '', //
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  // 是否显示底部操作按钮 :footer="null"
  showFooter: {
    type: Boolean,
    default: undefined,
  },
  showCancel: {
    type: Boolean,
    default: true,
  },
  showConfirm: {
    type: Boolean,
    default: true,
  },
  confirmAttrs: {
    type: Object,
    default: () => ({}),
  },
  cancelAttrs: {
    type: Object,
    default: () => ({}),
  },
  enableConfirm: {
    // 是否允许使用enter键, 点击确定按钮
    type: Boolean,
    default: true,
  },
  confirm: {
    type: Function,
  },
  fillSlot: {
    type: Boolean,
    default: false,
  },
  hideHeaderIcon: {
    type: Boolean,
    default: false,
  },
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

const mergedShowFooter = computed(() => {
  return mergedProps.value.showFooter ?? true
})

const dialogButtonTheme = computed(() => {
  return mergedProps.value.theme === 'chenghua' ? 'chenghua' : ''
})

const mergedConfirmAttrs = computed(() => {
  return {
    icon: mergedProps.value.theme === 'chenghua' ? '' : 'el-icon-check',
    ...mergedProps.value.confirmAttrs,
  }
})

const mergedCancelAttrs = computed(() => {
  return {
    icon: mergedProps.value.theme === 'chenghua' ? '' : 'el-icon-close',
    ...mergedProps.value.cancelAttrs,
  }
})

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
async function confirm() {
  if (mergedProps.value.confirm && getType(mergedProps.value.confirm) === 'function') {
    confirmLoading.value = true
    await mergedProps.value.confirm().finally(() => {
      confirmLoading.value = false
    })
  } else if (attrs.onConfirm) {
    attrs.onConfirm()
  } else {
    handleClose()
  }
}
function handleCancelClose() {
  if (attrs.onCancel) {
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
    attrs.modelValue === true &&
    code === 'Enter' &&
    mergedProps.value.enableConfirm &&
    mergedProps.value.confirmAttrs?.loading !== true
  ) {
    confirm()
  }
}

const parseType = computed(() => {
  if (mergedProps.value.type === '') {
    return 'el-dialog'
  } else if (mergedProps.value.type === 'drawer') {
    return 'el-drawer'
  }
})

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

.s-dialog.s-chenghua-dialog {
  :deep(.el-dialog__header),
  :deep(.el-drawer__header) {
    padding: 10px 16px;
    border-bottom: 0px solid var(--line);
    font-weight: 700;
  }
  :deep(.s-dialog__header-content) {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--el-text-color-primary);
  }
  :deep(.el-dialog) {
    border-radius: 16px;
  }
  :deep(.el-dialog__footer) {
    border-top: 0px solid var(--line);
  }
}
</style>
