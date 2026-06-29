<script setup lang="ts">
/** @使用方式
<s-drawer
  v-model="isShow"
  title="测试dialog"
  width="500"
  :closeOnClickModal="true"
></s-drawer>
*/
import { computed, useAttrs } from 'vue'
import type { ButtonProps } from 'element-plus'

defineOptions({
  name: 'SDrawer',
})
const emits = defineEmits(['update:modelValue'])
interface DrawerProps {
  confirmText?: string
  cancelText?: string
  showFooter?: boolean
  showConfirm?: boolean
  showCancel?: boolean
  wrapperClosable?: boolean
  confirmAttrs?: Partial<ButtonProps> & Record<string, any>
  cancelAttrs?: Partial<ButtonProps> & Record<string, any>
  detailAttrs?: Record<string, any>
  type?: 'detail' | ''
}

const props = withDefaults(defineProps<DrawerProps>(), {
  confirmText: '提交',
  cancelText: '取消',
  showFooter: true,
  showConfirm: true,
  showCancel: true,
  wrapperClosable: true,
  confirmAttrs: () => ({}),
  cancelAttrs: () => ({}),
  // 自定义详情属性
  detailAttrs: () => ({}),
  // 可选值: detail, ''
  type: '',
})

const attrs = useAttrs()
const mergeAttrs = computed<{
  size: string | number
  confirmText: string
  showCancel: boolean
  wrapperClosable: boolean
  destroyOnClose: boolean
}>(() => {
  // 如果type不是detail, 走默认的逻辑
  let changeAttrs = {
    size: (attrs.size as string | number | undefined) || 640,
    confirmText: props.confirmText,
    showCancel: props.showCancel,
    wrapperClosable: props.wrapperClosable,
    destroyOnClose: true,
  }
  if (props.type === 'detail') {
    changeAttrs = Object.assign(
      {
        size: 400,
        confirmText: '关闭',
        showCancel: false,
        wrapperClosable: true,
        destroyOnClose: true,
      },
      props.detailAttrs,
    )
  }
  return changeAttrs
})

const mergedConfirmAttrs = computed<Partial<ButtonProps> & Record<string, any>>(() => {
  return {
    icon: props.type === 'detail' ? 'el-icon-close' : 'el-icon-check',
    ...props.confirmAttrs,
  }
})

const mergedCancelAttrs = computed<Partial<ButtonProps> & Record<string, any>>(() => {
  return {
    icon: 'el-icon-close',
    ...props.cancelAttrs,
  }
})

function confirm() {
  if (typeof attrs.onConfirm === 'function') {
    attrs.onConfirm()
  } else {
    _handleClose()
  }
}
function handleClose() {
  if (typeof attrs.onCancel === 'function') {
    attrs.onCancel()
  } else {
    _handleClose()
  }
}

function _handleClose() {
  emits('update:modelValue', false)
}
</script>

<template>
  <div class="s-drawer">
    <el-drawer
      :wrapper-closable="mergeAttrs.wrapperClosable"
      :destroy-on-close="mergeAttrs.wrapperClosable !== false"
      :with-header="true"
      :size="mergeAttrs.size"
      v-bind="$attrs"
      @close="_handleClose"
    >
      <template #header>
        <slot name="header">
          {{ attrs.title }}
        </slot>
      </template>
      <div class="drawer-main">
        <el-scrollbar class="drawer-scrollbar">
          <div class="content">
            <slot></slot>
          </div>
        </el-scrollbar>
      </div>
      <div v-if="showFooter" class="kd-drawer-footer">
        <slot name="footer">
          <el-button
            v-if="showConfirm"
            id="kdDrawerConfirmBtn"
            :type="mergedConfirmAttrs.type || 'primary'"
            v-bind="mergedConfirmAttrs"
            class="s-drawer__confirm"
            @click="confirm"
          >
            {{ mergeAttrs.confirmText }}
          </el-button>
          <el-button
            v-if="mergeAttrs.showCancel"
            :type="mergedCancelAttrs.type || 'info'"
            v-bind="mergedCancelAttrs"
            @click="handleClose"
          >
            {{ cancelText }}
          </el-button>
        </slot>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.s-drawer {
  :deep(.el-drawer__header) {
    margin-bottom: 0;
    color: var(--el-text-color-primary);
    font-weight: 500;
    padding: 12px;
    background-color: var(--el-fill-color-light);
    font-size: 14px;
    border-bottom: 1px solid var(--el-border-color);
    box-sizing: border-box;
    > span {
      font-size: 14px;
      padding-left: 24px;
    }

    > .el-drawer__close-btn {
      font-size: 16px;
      padding-right: 24px;
      display: flex;
      justify-content: flex-end;
    }
  }
  :deep(.el-drawer__body) {
    padding: 0;
  }

  .drawer-main {
    flex: 1;
    height: calc(100% - 50px);
    padding: 24px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .drawer-scrollbar {
      flex: 1;
      height: 100%;

      .el-scrollbar__view {
        width: 100%;
        height: 100%;
      }

      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }

    .content {
      min-height: calc(100vh - 200px) !important;
      overflow-y: auto;
      padding: 24px;
    }
  }

  .kd-drawer-footer {
    height: 50px;
    padding: 0 24px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px solid var(--line);
  }
}

.s-drawer__confirm {
  margin-right: 8px;
}
</style>
