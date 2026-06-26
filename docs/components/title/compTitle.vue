<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
</script>

<template>
  <div>
    <div class="box">
      <s-comp-title title="你好" :box-style="{ width: '160px', fontSize: '20px', color: 'var(--blue)' }"></s-comp-title>
      <el-input-number v-model="cc" />
    </div>

    <div class="m-t-8 box">
      <s-comp-title title="你好" size="large"></s-comp-title>
      <s-input v-model="cc" style="width: 100px" size="large" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  :deep(.el-input__wrapper) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>
