<script setup lang="ts">
import { reactive } from 'vue'

const visible = reactive({
  default: false,
  confirm: false,
  delete: false,
  warning: false,
})
</script>

<template>
  <div class="dialog-variant-demo">
    <el-button @click="visible.default = true">默认弹框</el-button>
    <el-button type="primary" @click="visible.confirm = true">操作确认</el-button>
    <el-button type="danger" @click="visible.delete = true">删除确认</el-button>
    <el-button type="warning" @click="visible.warning = true">警告弹框</el-button>

    <s-dialog v-model="visible.default" variant="default" theme="shijingshan">这是默认语义的弹框。</s-dialog>
    <s-dialog v-model="visible.confirm" variant="confirm" target="机器之心公众号" theme="shijingshan" />
    <s-dialog v-model="visible.delete" variant="delete" target="机器之心公众号" theme="shijingshan"></s-dialog>
    <s-dialog v-model="visible.warning" variant="warning" theme="shijingshan"
      >该操作可能影响现有数据，请确认后继续。</s-dialog
    >
  </div>
</template>

<style scoped>
.dialog-variant-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
