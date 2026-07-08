<script setup lang="ts">
import { ref } from 'vue'

const gutter = ref(16)
</script>

<template>
  <div class="row-gutter-demo">
    <el-slider v-model="gutter" :min="0" :max="48" show-input />

    <s-row :col="8" :gutter="gutter">
      <div class="row-gutter-demo__block">1</div>
      <div class="row-gutter-demo__block">2</div>
      <div class="row-gutter-demo__block">3</div>
    </s-row>
  </div>
</template>

<style scoped lang="scss">
.row-gutter-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row-gutter-demo__block {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
}
</style>
