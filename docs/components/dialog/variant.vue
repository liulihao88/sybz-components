<script setup lang="ts">
import { reactive } from 'vue'

const visible = reactive({
  default: false,
  delete: false,
  warning: false,
})
const target = '4a731a90594a4af544c0c25941171jpeg.jpeg、小米汽车.png'
</script>

<template>
  <div class="dialog-variant-demo">
    <el-button @click="visible.default = true">默认弹框</el-button>
    <el-button type="danger" @click="visible.delete = true">删除确认</el-button>
    <el-button type="warning" @click="visible.warning = true">警告弹框</el-button>

    <s-dialog v-model="visible.default" variant="default" theme="shijingshan">这是默认语义的弹框。</s-dialog>
    <s-dialog v-model="visible.delete" variant="delete" theme="shijingshan" :target="target"></s-dialog>
    <s-dialog v-model="visible.warning" variant="warning" theme="shijingshan">
      该操作可能影响现有数据，请确认后继续。
    </s-dialog>
  </div>
</template>

<style scoped>
.dialog-variant-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
