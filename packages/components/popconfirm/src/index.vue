<script setup lang="ts">
/**
 * <g-popover @confirm="confirm" trigger="click"></g-popover>
 */

defineOptions({
  name: 'SPopconfirm',
})
import { ref, onMounted } from 'vue'
const isPopoverVisible = ref(false)
const handleShow = () => {
  onMounted(() => {
    document.addEventListener('click', closePopoverOnClickOutside)
  })
}

const closePopoverOnClickOutside = (event) => {
  if (!document.querySelector('.el-popover').contains(event.target)) {
    close()
  }
}
const emits = defineEmits(['confirm', 'cancel'])
function confirm() {
  close()
  emits('confirm')
}
function close() {
  isPopoverVisible.value = false
}
function cancel() {
  close()
  emits('cancel')
}
const props = defineProps({
  title: {
    type: String,
    default: '确定删除吗?',
  },
  width: {
    type: [String, Number],
    default: 200,
  },
  content: {
    type: String,
  },
  reConfirm: {
    type: Boolean,
    default: true,
  },
})

defineExpose({
  close,
})
</script>

<template>
  <el-popover
    v-if="props.reConfirm"
    class="s-popconfirm__box"
    :title="props.title"
    :width="props.width"
    v-bind="$attrs"
    @show="handleShow"
    v-model:visible="isPopoverVisible"
  >
    <slot name="content">
      <div class="s-popconfirm__content">{{ props.content }}</div>
    </slot>
    <div class="s-popconfirm__footer">
      <slot name="footer">
        <el-button size="small" type="info" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确定</el-button>
      </slot>
    </div>
    <template v-slot:reference>
      <slot></slot>
    </template>
  </el-popover>
  <span class="s-popconfirm__simple_box" v-else @click="confirm">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.s-popconfirm__footer {
  text-align: right;
  margin: 0;
  margin-top: 16px;
}

.s-popconfirm__simple_box:has(.el-button) + :deep(.el-button),
.el-button + .s-popconfirm__simple_box :deep(.el-button),
.s-popconfirm__simple_box:has(.el-button) + .s-popconfirm__simple_box:has(.el-button) {
  margin-left: 12px !important;
}
</style>
