<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const stock = ref(36)
</script>

<template>
  <div class="input-number-height-demo">
    <div class="demo-list">
      <s-input-number v-model="count" title="数量" width="220" height="40" :min="0" />
      <s-input-number v-model="stock" title="库存上限" width="260" height="48" :min="0" :step="2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-number-height-demo {
  display: grid;
  gap: 16px;
}

.demo-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
