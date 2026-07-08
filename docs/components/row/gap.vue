<script setup lang="ts">
import { computed, ref } from 'vue'

const gapNumber = ref(24)
const gap = computed(() => `${gapNumber.value}px`)
</script>

<template>
  <div class="row-gap-demo">
    <el-slider v-model="gapNumber" :min="0" :max="48" show-input />

    <s-row :col="8" :gap="gap">
      <div class="row-gap-demo__block">gap</div>
      <div class="row-gap-demo__block">支持 px</div>
      <div class="row-gap-demo__block">优先于 gutter</div>
    </s-row>
  </div>
</template>

<style scoped lang="scss">
.row-gap-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row-gap-demo__block {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
