<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const rightCount = ref(3)
const smallCount = ref(1)
</script>

<template>
  <div class="input-number-size-demo">
    <div class="input-number-size-demo__list">
      <s-input-number v-model="smallCount" title="小尺寸" size="small" :min="0" />
      <s-input-number v-model="smallCount" title="默认尺寸" :min="0" />
      <s-input-number v-model="smallCount" title="大尺寸" size="large" :min="0" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-number-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-number-size-demo__list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
